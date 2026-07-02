// app/[slug]/page.tsx
import { getPage, AnyBlock } from '@/lib/contentful';
import BlockRenderer from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  if (!page) notFound();

  const { blocks } = page.fields;

  return (
    <main className='bg-white'>
      {blocks?.map((block) => (
        <BlockRenderer
          key={block?.sys.contentType.sys.id}
          block={block as AnyBlock}
        />
      ))}
    </main>
  );
}