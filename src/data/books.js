const raw = [
  ["The Glass Meridian", "Elara Voss", "Fiction", 18.99, 4.7],
  ["Orbits of Quiet Light", "Dr. Mina Okafor", "Science", 24.5, 4.8],
  ["The Weight of Small Things", "Jonas Hale", "Psychology", 16, 4.6],
  ["Empires of Salt", "Rafael Duarte", "History", 27, 4.5],
  ["Letters to a Restless Mind", "Iris Calder", "Philosophy", 15.5, 4.9],
  ["Machines That Dream", "Priya Nair", "Technology", 29.99, 4.4],
  ["A Garden for the Drowned", "Silas Wren", "Literature", 19, 4.7],
  ["The Last Cartographer", "Noor Haddad", "Fiction", 17.5, 4.6],
  ["Deep Time, Thin Air", "Prof. Anika Lund", "Science", 26, 4.5],
  ["Why We Remember Wrongly", "Tomás Reyes", "Psychology", 18, 4.8],
  ["The Silk Ledger", "Mei-Lin Zhou", "History", 22.5, 4.3],
  ["Clean Systems, Calm Minds", "Owen Blake", "Technology", 32, 4.6],
  ["On Being Briefly Infinite", "Sofia Marchetti", "Philosophy", 14.99, 4.7],
  ["Salt & Sonnets", "Idris Okoye", "Literature", 13.5, 4.4],
];
export const chapters = [
  "The Threshold",
  "What the Pages Remember",
  "A Quiet Revolution",
  "Where the Map Ends",
];
const S = [
  "The first thing you notice is how little this book asks of you; it simply waits, patient as a lit window.",
  "Every chapter opens with a question and refuses to hurry toward the answer.",
  "Evidence is gathered slowly, the way a river gathers stones.",
  "By the time the idea arrives, you feel you have always known it.",
  "There is a particular quiet that settles over a room when someone reads well.",
  "Notice how the argument turns: not with force, but with a change of light.",
  "Nothing here is wasted; even the pauses are load-bearing.",
  "Close the book and the questions follow you into the evening, unhurried and kind.",
];
export const books = raw.map(([title, author, cat, price, rating], i) => ({
  id: i + 1,
  title,
  author,
  cat,
  price,
  rating,
  hue: (i * 37 + 200) % 360,
  h: (i * 7) % 5,
  t: (i * 3) % 4,
  desc: `${title} by ${author} is a luminous ${cat.toLowerCase()} title that rewards slow, attentive reading.`,
  pages: Array.from({ length: 8 }, (_, p) => ({
    h: p % 2 === 0 ? chapters[p / 2] : null,
    text: [0, 1, 2, 3].map((j) => S[(p * 2 + j + i) % 8]).join(" "),
  })),
}));
export const cats = ["All", ...new Set(raw.map((r) => r[2]))];
