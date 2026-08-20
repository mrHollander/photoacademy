import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Use service role for webhook — no user context
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const courseId = session.metadata?.course_id;
    let userId = session.metadata?.user_id;
    const customerEmail = session.customer_details?.email || session.customer_email;

    if (!courseId) {
      console.error('No course_id in session metadata');
      return NextResponse.json({ error: 'Missing course_id' }, { status: 400 });
    }

    // If no user_id, try to find or create user by email
    if (!userId && customerEmail) {
      // Check if profile exists with this email
      const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .single();

      if (existingProfile) {
        userId = existingProfile.id;
      } else {
        // Create auth user
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: customerEmail,
          email_confirm: true,
          user_metadata: { full_name: '' },
        });

        if (createError) {
          console.error('Failed to create user:', createError);
        } else if (newUser.user) {
          userId = newUser.user.id;
        }
      }
    }

    // Create order
    await supabaseAdmin.from('orders').insert({
      user_id: userId || null,
      course_id: courseId,
      stripe_session_id: session.id,
      stripe_payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      customer_email: customerEmail,
      amount: session.amount_total || 0,
      currency: session.currency || 'eur',
      status: 'completed',
    });

    // Grant enrollment
    if (userId) {
      const { error: enrollError } = await supabaseAdmin.from('enrollments').upsert(
        {
          user_id: userId,
          course_id: courseId,
          stripe_payment_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        },
        { onConflict: 'user_id,course_id' }
      );

      if (enrollError) {
        console.error('Failed to create enrollment:', enrollError);
      }
    }

    // TODO: Send purchase confirmation email via Resend
    // TODO: Send welcome email

    console.log(`Order completed: course=${courseId}, user=${userId}, email=${customerEmail}`);
  }

  return NextResponse.json({ received: true });
}
