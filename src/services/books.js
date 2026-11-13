const API = "https://openlibrary.org";
export async function searchBooks(query) {
  const response = await fetch(`${API}/search.json?q=${encodeURIComponent(query)}&limit=18`);
  if (!response.ok) throw new Error("The book catalogue is temporarily unavailable.");
  const data = await response.json();
  return (data.docs || []).filter(book => book.title && book.author_name?.length).map(book => ({
    id: book.key, title: book.title, author: book.author_name[0],
    year: book.first_publish_year || "—",
    cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "",
    key: book.key
  }));
}
export async function getBookDetails(key) {
  const response = await fetch(`${API}${key}.json`);
  if (!response.ok) throw new Error("Book details could not be loaded.");
  return response.json();
}