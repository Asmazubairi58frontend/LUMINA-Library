import { Heart, ShoppingBag, Star } from "lucide-react";
import Book3D from "./Book3D";
import { useStore } from "../context/Store";
export default function BookCard({ b }) {
  const { add, toggleFav, favs } = useStore();
  return (
    <div className="card3d">
      <div className="stage">
        <Book3D b={b} rot={-20} />
      </div>
      <h5>{b.title}</h5>
      <p>{b.author}</p>
      <div className="d-flex justify-content-between align-items-center">
        <span>
          <Star size={14} className="gold" /> {b.rating} · ${b.price.toFixed(2)}
        </span>
        <span className="d-flex gap-2">
          <button
            className="ibtn"
            aria-label="Favorite"
            onClick={() => toggleFav(b.id)}
          >
            <Heart
              size={16}
              fill={favs.includes(b.id) ? "currentColor" : "none"}
            />
          </button>
          <button
            className="ibtn"
            aria-label="Add to cart"
            onClick={() => add(b.id)}
          >
            <ShoppingBag size={16} />
          </button>
        </span>
      </div>
    </div>
  );
}
