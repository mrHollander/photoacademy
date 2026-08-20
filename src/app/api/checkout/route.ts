import { NextResponse, type NextRequest } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { courseSlug } = await request.json();
    const supabase = await createServerSupabaseClient();

    // Get course details
    const { data: course } = await supabase
      .from('courses')
      .select('id, title, price, currency, slug')
      .eq('slug', courseSlug)
      .eq('status', 'published')
      .single();

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();

    // Check existing enrollment
    if (user) {
      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .single();

      if (enrollment) {
        return NextResponse.json({ error: 'Already enrolled', redirect: '/dashboard' }, { status: 400 });
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'ideal'],
      line_items: [
        {
          price_data: {
            currency: course.currency,
            product_data: {
              name: course.title,
              description: 'Lifetime access to all lessons and future updates.',
            },
            unit_amount: course.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      customer_email: user?.email || undefined,
      metadata: {
        course_id: course.id,
        course_slug: course.slug,
        user_id: user?.id || '',
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
