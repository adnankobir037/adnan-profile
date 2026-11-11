export default function Footer({ data }) {
  const social = data.social || {};
  const links = Object.entries(social).filter(
    ([, url]) => typeof url === "string" && url.trim(),
  );
  if (!data.meta?.siteTitle && links.length === 0) return null;

  return (
    <footer className="relative z-10 border-t border-white/5 bg-navy/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-7 text-sm sm:flex-row sm:px-8">
        {data.meta?.siteTitle && (
          <p className="text-slate-500">{data.meta.siteTitle}</p>
        )}
        {links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-5">
            {links.map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition hover:text-amber-300"
              >
                {name}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
