import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Maximize2,
  BookOpen,
  Headphones,
  Volume2,
} from "lucide-react";
import { seedBooks } from "../data/books";
import { getPublicDomainText } from "../services/bookService";
import { useApp } from "../context/AppContext";
const samplePages = [
  [
    "A ROOM OF ONE’S OWN",
    "There is a particular kind of stillness that arrives when the world narrows to a sentence, a thought, a page. The noise does not disappear; it simply finds its proper distance.",
  ],
  [
    "THE FIRST THRESHOLD",
    "A book asks for something rare: not our agreement, but our attention. It opens a door and waits, without hurry, for us to decide whether to enter.",
  ],
  [
    "ON NOTICING",
    "To read is to practise noticing. A small detail gathers meaning; a passing thought becomes a question. Slowly, the ordinary world grows larger.",
  ],
  [
    "A QUIETER KIND OF DISCOVERY",
    "Perhaps the best journeys do not take us away from ourselves. Perhaps they return us with better questions, and a little more room for wonder.",
  ],
];
export default function Reader() {
  const { progress, setProgress } = useApp();
  const [book, setBook] = useState(
    () =>
      JSON.parse(sessionStorage.getItem("lumora-current-book") || "null") ||
      seedBooks[0],
  );
  const [page, setPage] = useState(1);
  const [font, setFont] = useState(18);
  const [text, setText] = useState(null);
  const [notice, setNotice] = useState("");
  const [music, setMusic] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    setPage(progress[book.id] || 1);
  }, [book, progress]);
  useEffect(() => {
    let live = true;
    if (book.gutenbergId)
      getPublicDomainText(book.gutenbergId)
        .then((t) => {
          if (live) setText(t);
        })
        .catch(() => setText(null));
    else setText(null);
    return () => {
      live = false;
    };
  }, [book]);
  function change(n) {
    const p = Math.max(1, Math.min(4, n));
    setPage(p);
    setProgress((old) => ({ ...old, [book.id]: p }));
  }
  return; //(

  // );
}
