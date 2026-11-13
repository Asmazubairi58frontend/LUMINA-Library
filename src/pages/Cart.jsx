import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, BookOpen } from "lucide-react";
import { books } from "../data/books";
import CartItem from "../components/CartItem";
import { useStore } from "../context/Store";

export default function Cart() {
  const { cart, setCart } = useStore();
  const [s, setS] = useState("idle");
  const items = cart.map((c) => ({
    ...books.find((b) => b.id === c.id),
    qty: c.qty,
  }));
  const sub = items.reduce((a, b) => a + b.price * b.qty, 0),
    tax = sub * 0.07;
  const pay = () => {
    setS("busy");
    setTimeout(() => {
      setS("done");
      setCart([]);
    }, 1600);
  };

  if (s === "done")
    return (
      <section className="sec text-center">
        <div className="okc">
          <Check size={48} />
        </div>
        <h2>Order Confirmed</h2>
        <p>Your books are now in your reading space.</p>
        <Link to="/my-space" className="btn-gold">
          Go to My Space
        </Link>
      </section>
    );
  if (!items.length)
    return (
      <section className="sec text-center">
        <BookOpen size={64} className="gold" />
        <h2>Your cart is empty</h2>
        <p>The shelves are waiting.</p>
        <Link to="/library" className="btn-gold">
          Browse the Library
        </Link>
      </section>
    );
  return (
    <section className="sec cart-page">
      <span className="eyebrow">A FEW GOOD STORIES, READY TO GO</span>
      <h2>Your Cart</h2>
      <p className="cart-intro">Your next reading moments are gathered here.</p>
      <div className="row g-4">
        <div className="col-lg-8 d-grid gap-3">
          {items.map((b) => (
            <CartItem key={b.id} b={b} />
          ))}
        </div>
        <div className="col-lg-4">
          <div className="glass sum">
            <span className="eyebrow">ORDER SUMMARY</span>
            <h4 className="mt-2">Your selection</h4>
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <b>${sub.toFixed(2)}</b>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax (7%)</span>
              <b>${tax.toFixed(2)}</b>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-5">
              <span>Total</span>
              <b className="gold">${(sub + tax).toFixed(2)}</b>
            </div>
            <button
              className="btn-gold w-100 mt-3"
              disabled={s === "busy"}
              onClick={pay}
            >
              {s === "busy" ? "Processing…" : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
