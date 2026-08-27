import SitePhotosEditor from '@/components/admin/SitePhotosEditor';
import { getSiteImages } from '@/lib/content';

export const metadata = { title: 'Photos — Admin' };

export default async function AdminPhotosPage() {
  const images = await getSiteImages();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-stone-900">Photos</h1>
        <p className="text-sm text-stone-500 mt-1">
          Upload replacements for the photos shown on the site. Course and lesson images are managed
          in each course&apos;s editor.
        </p>
      </div>
      <SitePhotosEditor images={images} />
    </div>
  );
}
