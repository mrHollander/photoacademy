import SiteContentEditor from '@/components/admin/SiteContentEditor';
import { getSiteContent } from '@/lib/content';

export const metadata = { title: 'Site Text — Admin' };

export default async function AdminContentPage() {
  const content = await getSiteContent();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-stone-900">Site Text</h1>
        <p className="text-sm text-stone-500 mt-1">
          Edit the text shown across the site. Changes go live as soon as you save.
        </p>
      </div>
      <SiteContentEditor initial={content} />
    </div>
  );
}
