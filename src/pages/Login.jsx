import { useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, Sparkles } from "lucide-react";
export default function Login({ onLogin }) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [show, setShow] = useState(false),
    [mode, setMode] = useState("login");
  function submit(e) {
    e.preventDefault();
    const user = {
      name: name.trim() || email.split("@")[0] || "Reader",
      email,
    };
    localStorage.setItem("lm-user", JSON.stringify(user));
    onLogin(user);
  }
  return (
    <main className="auth-screen">
      <div className="auth-glow glow-a" />
      <div className="auth-glow glow-b" />
      <section className="auth-card glass">
        <div className="auth-art">
          <div className="auth-orbit orbit-one" />
          <div className="auth-orbit orbit-two" />
          <div className="auth-book">
            <BookOpen size={58} />
          </div>
          <span className="auth-spark s1">✦</span>
          <span className="auth-spark s2">✧</span>
          <div className="auth-art-copy">
            <small>YOUR PRIVATE READING UNIVERSE</small>
            <h2>
              Somewhere between
              <br />
              silence and discovery.
            </h2>
            <p>A library that remembers where your curiosity left off.</p>
          </div>
        </div>
        <div className="auth-form">
          <LinkMark />
          <span className="eyebrow">
            <Sparkles size={13} /> WELCOME TO LUMINA
          </span>
          <h1>{mode === "login" ? "Good to see you." : "Begin your story."}</h1>
          <p className="muted">
            {mode === "login"
              ? "Sign in to return to your reading world."
              : "Create a reader profile and make this space yours."}
          </p>
          <form onSubmit={submit}>
            {mode === "signup" && (
              <label>
                Your name
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="How should we call you?"
                />
              </label>
            )}
            <label>
              Email address
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@example.com"
              />
            </label>
            <label>
              Password
              <div className="password-wrap">
                <input
                  required
                  minLength="4"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label="Show password"
                >
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>
            <button className="btn-gold auth-submit">
              {mode === "login" ? "Enter the library" : "Create my space"}{" "}
              <ArrowRight size={17} />
            </button>
          </form>
          <div className="auth-switch">
            {mode === "login"
              ? "New to LUMINA?"
              : "Already have a reader profile?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </div>
          <small className="auth-note">
            Demo sign-in · Your profile is saved on this device only.
          </small>
        </div>
      </section>
      <footer className="auth-footer">
        LUMINA <span>·</span> A universe between every page
      </footer>
    </main>
  );
}
function LinkMark() {
  return (
    <div className="auth-logo">
      LUMINA<span>®</span>
    </div>
  );
}
