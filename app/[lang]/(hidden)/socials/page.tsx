import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import InstagramPost from "../../_components/social-preview/instagram-post";
import FacebookPost from "../../_components/social-preview/facebook-post";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type SocialsPost = {
  id: string;
  images: string[];
  media?: { type?: string; slides?: number };
  captions: {
    instagram?: string;
    facebook?: string;
  };
};

const MEDIA_RANK: Record<string, number> = {
  "data-carousel": 0,
  carousel: 1,
};

function byMediaThenId(a: SocialsPost, b: SocialsPost): number {
  const ra = MEDIA_RANK[a.media?.type ?? ""] ?? 2;
  const rb = MEDIA_RANK[b.media?.type ?? ""] ?? 2;
  return ra !== rb ? ra - rb : a.id.localeCompare(b.id);
}

export default async function Page({ params }: PageProps<"/[lang]/socials">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const name = dict.metadata?.name || "Business";
  const handle = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  const socials = dict.socials;

  if (!socials || !Array.isArray(socials.posts) || socials.posts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
          <p className="text-sm text-zinc-500">{socials?.subtitle ?? ""}</p>
        </main>
      </div>
    );
  }

  const posts = [...(socials.posts as SocialsPost[])].sort(byMediaThenId);
  const carouselLabels = {
    previous: socials.ui.carouselPrevious,
    next: socials.ui.carouselNext,
    goTo: socials.ui.carouselGoTo,
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto w-full max-w-7xl overflow-hidden px-6 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          {socials.title}
        </h1>
        <p className="mt-3 text-base text-zinc-600">{socials.subtitle}</p>
      </header>

      <div className="grid gap-12 lg:grid-cols-2">
        <section className="flex flex-col gap-8">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-zinc-400">
            {socials.labels.instagram}
          </h2>
          {posts.map((post) =>
            post.captions?.instagram ? (
              <InstagramPost
                key={post.id}
                handle={handle}
                images={post.images}
                caption={post.captions.instagram}
                carouselLabels={carouselLabels}
              />
            ) : null,
          )}
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-zinc-400">
            {socials.labels.facebook}
          </h2>
          {posts.map((post) =>
            post.captions?.facebook ? (
              <FacebookPost
                key={post.id}
                name={name}
                subtitle={socials.ui.facebookSubtitle}
                images={post.images}
                caption={post.captions.facebook}
                carouselLabels={carouselLabels}
              />
            ) : null,
          )}
        </section>
      </div>
      </main>
    </div>
  );
}
