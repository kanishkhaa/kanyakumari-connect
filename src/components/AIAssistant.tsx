import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nContext";
import { askGeminiChatbot } from "@/lib/gemini";

type Msg = { role: "bot" | "user"; text: string; links?: { label: string; to: string }[] };

export default function AIAssistant() {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greetingText = lang === "ta"
      ? "வணக்கம்! 🌅 நான் உங்கள் கன்னியாகுமரி AI உதவியாளர். இடங்கள், உணவு, தங்குமிடங்கள் அல்லது பயண திட்டங்கள் பற்றி என்னிடம் கேளுங்கள்."
      : "Vanakkam! 🌅 I'm your  AI Kanyakumari assistant. Ask me about places, food, weather, or custom trip plans.";
    setMsgs([{ role: "bot", text: greetingText }]);
  }, [lang]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await askGeminiChatbot(text, lang);
      setMsgs((m) => [...m, { role: "bot", text: aiReply }]);
    } catch (err) {
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text: lang === "ta"
            ? "மன்னிக்கும், தற்சமயம் பதில் தர இயலவில்லை. மீண்டும் முயற்சிக்கவும்."
            : "Sorry, I could not generate a response right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        aria-label="Open assistant"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full gradient-sunset shadow-warm flex items-center justify-center text-primary-foreground hover:scale-110 transition-bounce ${open ? "opacity-0 pointer-events-none" : ""}`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
          <div className="absolute inset-0 bg-background/40 backdrop-blur-sm pointer-events-auto" onClick={() => setOpen(false)} />
          <div className="relative pointer-events-auto w-full max-w-sm h-[550px] max-h-[80vh] bg-card rounded-2xl shadow-elevated border border-border flex flex-col overflow-hidden animate-fade-in-up">
            <div className="px-4 py-3 gradient-sunset text-primary-foreground flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <div>
                  <p className="font-semibold leading-tight">{t("ai_assistant_title")}</p>
                  <p className="text-[11px] opacity-90">{lang === "ta" ? "AI மூலம் இயங்குகிறது" : "Powered by AI"}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-background/20 rounded">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                    m.role === "user" ? "gradient-sunset text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm whitespace-pre-wrap"
                  }`}>
                    <p className="leading-relaxed">{m.text}</p>
                    {m.links && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.links.map((l) => (
                          <Link
                            key={l.to}
                            to={l.to}
                            onClick={() => setOpen(false)}
                            className="text-xs px-2 py-1 rounded-full bg-background text-primary font-medium hover:bg-background/80"
                          >
                            {l.label} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-xs text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {lang === "ta" ? "AI சிந்திக்கிறது..." : "AI is thinking..."}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("ai_assistant_placeholder")}
                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={send}
                disabled={loading}
                className="h-9 w-9 rounded-lg gradient-sunset text-primary-foreground flex items-center justify-center hover:scale-105 transition-smooth disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
