'use client';

import { useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { parseFaqItems, parseStringList, type FaqItem } from '@/lib/content-shared';
import { Plus, Trash2 } from 'lucide-react';

interface Field {
  key: string;
  label: string;
  multiline?: boolean;
}

interface Group {
  title: string;
  fields: Field[];
}

const groups: Group[] = [
  {
    title: 'Homepage — Hero',
    fields: [
      { key: 'home.hero.eyebrow', label: 'Eyebrow' },
      { key: 'home.hero.title', label: 'Headline', multiline: true },
      { key: 'home.hero.whoiam_label', label: '"Who I Am" label' },
      { key: 'home.hero.whoiam', label: '"Who I Am" text', multiline: true },
      { key: 'home.hero.whatido_label', label: '"What I Do" label' },
      { key: 'home.hero.whatido', label: '"What I Do" text', multiline: true },
      { key: 'home.hero.cta_primary', label: 'Primary button' },
      { key: 'home.hero.cta_secondary', label: 'Secondary button' },
    ],
  },
  {
    title: 'Homepage — Services',
    fields: [
      { key: 'home.services.eyebrow', label: 'Eyebrow' },
      { key: 'home.services.title', label: 'Headline' },
      { key: 'home.services.1.title', label: 'Service 1 — title' },
      { key: 'home.services.1.text', label: 'Service 1 — text', multiline: true },
      { key: 'home.services.2.title', label: 'Service 2 — title' },
      { key: 'home.services.2.text', label: 'Service 2 — text', multiline: true },
      { key: 'home.services.3.title', label: 'Service 3 — title' },
      { key: 'home.services.3.text', label: 'Service 3 — text', multiline: true },
      { key: 'home.services.note', label: 'Note under services' },
    ],
  },
  {
    title: 'Homepage — Portfolio',
    fields: [
      { key: 'home.portfolio.eyebrow', label: 'Eyebrow' },
      { key: 'home.portfolio.title', label: 'Headline' },
    ],
  },
  {
    title: 'Homepage — Course Callout',
    fields: [
      { key: 'home.course.eyebrow', label: 'Eyebrow' },
      { key: 'home.course.title', label: 'Headline' },
      { key: 'home.course.text', label: 'Text', multiline: true },
      { key: 'home.course.cta', label: 'Button' },
    ],
  },
  {
    title: 'Homepage — Contact',
    fields: [
      { key: 'home.contact.eyebrow', label: 'Eyebrow' },
      { key: 'home.contact.title', label: 'Headline' },
      { key: 'home.contact.text', label: 'Text', multiline: true },
      { key: 'home.contact.cta', label: 'Button' },
      { key: 'contact.email', label: 'Contact email address' },
    ],
  },
  {
    title: 'Courses Page',
    fields: [
      { key: 'courses.eyebrow', label: 'Eyebrow' },
      { key: 'courses.title', label: 'Headline' },
      { key: 'courses.text', label: 'Text', multiline: true },
      { key: 'courses.empty', label: 'Empty-state message' },
    ],
  },
  {
    title: 'About Page',
    fields: [
      { key: 'about.eyebrow', label: 'Eyebrow' },
      { key: 'about.title', label: 'Headline' },
      { key: 'about.body', label: 'Body (blank line = new paragraph)', multiline: true },
      { key: 'about.cta.title', label: 'CTA headline' },
      { key: 'about.cta.text', label: 'CTA text' },
      { key: 'about.cta.button', label: 'CTA button' },
    ],
  },
  {
    title: 'Before & After (course page)',
    fields: [
      { key: 'ba.eyebrow', label: 'Eyebrow' },
      { key: 'ba.title', label: 'Headline' },
      { key: 'ba.text', label: 'Text', multiline: true },
      { key: 'ba.1.label', label: 'Example 1 — label' },
      { key: 'ba.1.change', label: 'Example 1 — change' },
      { key: 'ba.2.label', label: 'Example 2 — label' },
      { key: 'ba.2.change', label: 'Example 2 — change' },
      { key: 'ba.3.label', label: 'Example 3 — label' },
      { key: 'ba.3.change', label: 'Example 3 — change' },
      { key: 'ba.4.label', label: 'Example 4 — label' },
      { key: 'ba.4.change', label: 'Example 4 — change' },
    ],
  },
  {
    title: 'Pricing (course page)',
    fields: [
      { key: 'pricing.eyebrow', label: 'Eyebrow' },
      { key: 'pricing.title', label: 'Headline' },
      { key: 'pricing.text', label: 'Text' },
      { key: 'pricing.footnote', label: 'Footnote under button' },
    ],
  },
  {
    title: 'FAQ',
    fields: [
      { key: 'faq.eyebrow', label: 'Eyebrow' },
      { key: 'faq.title', label: 'Headline' },
    ],
  },
  {
    title: 'Footer',
    fields: [{ key: 'footer.tagline', label: 'Tagline', multiline: true }],
  },
];

export default function SiteContentEditor({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(() => parseFaqItems(initial['faq.items']));
  const [features, setFeatures] = useState<string[]>(() =>
    parseStringList(initial['pricing.features'], 'pricing.features')
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const composed = useMemo(
    () => ({
      ...values,
      'faq.items': JSON.stringify(faqItems),
      'pricing.features': JSON.stringify(features),
    }),
    [values, faqItems, features]
  );

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    const changed = Object.entries(composed).filter(([key, value]) => value !== initial[key]);
    if (changed.length === 0) {
      setMessage('Nothing to save — no changes.');
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from('site_content')
      .upsert(changed.map(([key, value]) => ({ key, value })));

    setMessage(error ? `Save failed: ${error.message}` : `Saved ${changed.length} change(s).`);
    setSaving(false);
  }

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const inputClass = 'w-full border border-stone-300 px-3 py-2 text-sm bg-white';

  return (
    <div className="max-w-3xl">
      {groups.map((group) => (
        <section key={group.title} className="bg-white border border-stone-200 p-6 mb-6">
          <h2 className="text-sm font-medium text-stone-900 mb-5">{group.title}</h2>
          <div className="space-y-4">
            {group.fields.map(({ key, label, multiline }) => (
              <div key={key}>
                <label className="text-xs uppercase tracking-wider text-stone-500 block mb-1">
                  {label}
                </label>
                {multiline ? (
                  <textarea
                    value={values[key] ?? ''}
                    onChange={(e) => setValue(key, e.target.value)}
                    rows={key === 'about.body' ? 12 : 3}
                    className={inputClass}
                  />
                ) : (
                  <input
                    value={values[key] ?? ''}
                    onChange={(e) => setValue(key, e.target.value)}
                    className={inputClass}
                  />
                )}
              </div>
            ))}

            {group.title === 'FAQ' && (
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">Questions</p>
                <div className="space-y-3">
                  {faqItems.map((item, i) => (
                    <div key={i} className="border border-stone-200 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <input
                            value={item.q}
                            onChange={(e) =>
                              setFaqItems((prev) =>
                                prev.map((it, j) => (j === i ? { ...it, q: e.target.value } : it))
                              )
                            }
                            placeholder="Question"
                            className={inputClass}
                          />
                          <textarea
                            value={item.a}
                            onChange={(e) =>
                              setFaqItems((prev) =>
                                prev.map((it, j) => (j === i ? { ...it, a: e.target.value } : it))
                              )
                            }
                            placeholder="Answer"
                            rows={2}
                            className={inputClass}
                          />
                        </div>
                        <button
                          onClick={() => setFaqItems((prev) => prev.filter((_, j) => j !== i))}
                          className="text-stone-400 hover:text-error p-1"
                          aria-label="Remove question"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setFaqItems((prev) => [...prev, { q: '', a: '' }])}
                  className="btn-secondary text-xs mt-3 flex items-center gap-2 py-2 px-4"
                >
                  <Plus size={13} /> Add question
                </button>
              </div>
            )}

            {group.title === 'Pricing (course page)' && (
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">Feature list</p>
                <div className="space-y-2">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input
                        value={f}
                        onChange={(e) =>
                          setFeatures((prev) => prev.map((it, j) => (j === i ? e.target.value : it)))
                        }
                        className={inputClass}
                      />
                      <button
                        onClick={() => setFeatures((prev) => prev.filter((_, j) => j !== i))}
                        className="text-stone-400 hover:text-error p-1"
                        aria-label="Remove feature"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setFeatures((prev) => [...prev, ''])}
                  className="btn-secondary text-xs mt-3 flex items-center gap-2 py-2 px-4"
                >
                  <Plus size={13} /> Add feature
                </button>
              </div>
            )}
          </div>
        </section>
      ))}

      <div className="sticky bottom-0 bg-stone-50 border-t border-stone-200 py-4 flex items-center gap-4">
        <button onClick={handleSave} disabled={saving} className="btn-primary text-xs py-3 px-8">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        {message && <p className="text-sm text-stone-500">{message}</p>}
      </div>
    </div>
  );
}
