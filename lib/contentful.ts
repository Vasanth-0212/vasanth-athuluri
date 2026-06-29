// lib/contentful.ts
import { createClient, EntrySkeletonType, Entry, EntryFieldTypes } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// ─── Page Skeleton ─────────────────────────────────────────────
export type PageSkeleton = EntrySkeletonType<
  {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    blocks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
  },
  'pageType'
>;

export type PageEntry = Entry<PageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

// ─── Generic Block — no predefined types ──────────────────────
export type AnyBlock = Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

// ─── Fetch Functions ───────────────────────────────────────────
export async function getPage(slug: string): Promise<PageEntry | null> {
  const entries = await client.getEntries<PageSkeleton, string>({
    content_type: 'pageType',
    'fields.slug': slug,
    include: 10,
  });

  return (entries.items[0] as PageEntry) ?? null;
}

export async function getAllPages(): Promise<PageEntry[]> {
  const entries = await client.getEntries<PageSkeleton, string>({
    content_type: 'pageType',
    include: 10,
  });

  return entries.items as PageEntry[];
}

// ─── Resume ────────────────────────────────────────────────────
export async function getResume(): Promise<string | null> {
  const entries = await client.getEntries({
    content_type: 'resume',
    limit: 1,
  });

  const item = entries.items[0] as any;
  const url = item?.fields?.resumePdf?.fields?.file?.url as string | undefined;
  return url ? `https:${url}` : null;
}