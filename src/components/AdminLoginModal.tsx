import { useState, FormEvent } from "react";
import { Lock, User, KeyRound, X, ShieldCheck } from "lucide-react";
import { saveCollection } from "@/lib/supabaseContent";

type AdminLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const validUsername = username.trim().toLowerCase() === "admin@kaniya.com" || username.trim().toLowerCase() === "admin";
    const validPassword = password.trim() === "admin123";

    if (validUsername && validPassword) {
      const session = { authenticated: true, user: "admin", loggedInAt: new Date().toISOString() };
      await saveCollection("admin_session", session);
      onSuccess();
      onClose();
    } else {
      setError("Invalid username or password. Please use the predefined credentials.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-elevated">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Admin Portal</h2>
            <p className="text-xs text-muted-foreground">Sign in to access admin management</p>
          </div>
        </div>

        {/* Predefined credentials helper callout */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" /> Predefined Admin Credentials
          </div>
          <div className="mt-2 space-y-1 font-mono text-foreground/80">
            <p><span className="text-muted-foreground">Username:</span> admin@kaniya.com <span className="text-muted-foreground">(or admin)</span></p>
            <p><span className="text-muted-foreground">Password:</span> admin123</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Username or Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@kaniya.com"
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {error && <p className="text-xs font-medium text-destructive">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-warm transition-smooth hover:opacity-90"
          >
            Log In as Admin
          </button>
        </form>
      </div>
    </div>
  );
}
