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

// ─── Footer ────────────────────────────────────────────────────
export async function getFooter(): Promise<{ footerText?: string; linkedIn?: string; gitHub?: string } | null> {
  const entries = await client.getEntries({
    content_type: 'footer',
    limit: 1,
  });

  const item = entries.items[0] as any;
  if (!item) return null;

  return {
    footerText: item.fields?.footerText as string | undefined,
    linkedIn: item.fields?.linkedIn as string | undefined,
    gitHub: item.fields?.github as string | undefined,
  };
}
// ─── Navbar ────────────────────────────────────────────────────
export interface NavItem {
  title: string;
  navLink: string;
  openInNewTab: boolean;
}

export async function getNavbar(): Promise<NavItem[]> {
  const entries = await client.getEntries({
    content_type: 'navbar',
    limit: 1,
    include: 2,
  });

  const item = entries.items[0] as any;
  if (!item) return [];

  const navItems = item.fields?.navItems ?? [];

  return navItems.map((navItem: any) => ({
    title: navItem.fields.title as string,
    navLink: navItem.fields.navLink as string,
    openInNewTab: (navItem.fields.openInNewTab as boolean) ?? false,
  }));
}

export async function getResume(): Promise<string | null> {
  const entries = await client.getEntries({
    content_type: 'resume',
    limit: 1,
  });

  const item = entries.items[0] as any;
  const url = item?.fields?.resumePdf?.fields?.file?.url as string | undefined;
  return url ? `https:${url}` : null;
}