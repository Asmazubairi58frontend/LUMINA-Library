const cover = (id) => `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
export async function searchOpenLibrary(query) {
  const r = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`,
  );
  if (!r.ok) throw new Error("Book discovery is temporarily unavailable.");
  const data = await r.json();
  return (data.docs || [])
    .filter((x) => x.title)
    .map((x, i) => ({
      id: x.key || `${x.title}-${i}`,
      title: x.title,
      author: x.author_name?.[0] || "Unknown author",
      genre: x.subject?.[0] || "Literature",
      year: x.first_publish_year || "—",
      description: `Discover ${x.title}${x.author_name?.[0] ? ` by ${x.author_name[0]}` : ""}. Explore its catalog record and available editions.`,
      cover: x.cover_i ? cover(x.cover_i) : "",
      rating: null,
      openLibraryKey: x.key,
    }));
}
export async function getPublicDomainText(id) {
  const r = await fetch(`https://gutendex.com/books/${id}`);
  if (!r.ok) throw new Error("This text is not available right now.");
  const b = await r.json();
  return {
    title: b.title,
    authors: b.authors?.map((a) => a.name).join(", "),
    formats: b.formats,
    html: b.formats?.["text/html"] || b.formats?.["text/html; charset=utf-8"],
    plain:
      b.formats?.["text/plain; charset=utf-8"] || b.formats?.["text/plain"],
  };
}
export async function searchPublicDomain(query) {
  const r = await fetch(
    `https://gutendex.com/books/?search=${encodeURIComponent(query)}`,
  );
  if (!r.ok)
    throw new Error("Public-domain search is temporarily unavailable.");
  const d = await r.json();
  return d.results || [];
}
