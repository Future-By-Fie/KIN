import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDemo } from "@/components/kin/demo-context";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Fingerprint, ShieldCheck, MessageCircle, Ban, Flag } from "lucide-react";
import { AppShell, DemoNote } from "@/components/kin/shell";
import { Button } from "@/components/ui/button";
import {
  getRevealedConnection,
  getMessages,
  sendMessage,
  blockMatch,
  reportMatch,
  MAX_MESSAGE_LENGTH,
} from "@/lib/kin/service";
import { pageHead } from "@/lib/kin/queries";
import type { Message, RevealedConnection } from "@/lib/kin/types";
import majaPortrait from "@/assets/maja.jpg";
export const Route = createFileRoute("/chat/$id")({
  head: () =>
    pageHead(
      "Say hello",
      "Start a conversation with your mutually accepted, fictional KIN connection.",
    ),
  component: Chat,
});
function Chat() {
  const { id } = Route.useParams();
  const [connection, setConnection] = useState<RevealedConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scroll = useRef<HTMLDivElement>(null);
  const active = useRef(true);
  const sentCount = useRef(0);
  const [reported, setReported] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateConnections } = useDemo();
  async function block() {
    await blockMatch(id);
    await queryClient.invalidateQueries({ queryKey: ["nearby-kin"] });
    queryClient.removeQueries({ queryKey: ["kin-match", id] });
    updateConnections();
    void navigate({ to: "/discover" });
  }
  async function report() {
    await reportMatch(id);
    setReported(true);
  }
  useEffect(() => {
    active.current = true;
    Promise.all([getRevealedConnection(id), getMessages(id)]).then(([result, history]) => {
      if (active.current) {
        setConnection(result);
        setMessages(history);
        sentCount.current = history.filter((m) => m.sender === "kin").length;
        setLoaded(true);
      }
    });
    return () => {
      active.current = false;
    };
  }, [id]);
  useEffect(() => {
    scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: "auto" });
  }, [messages, sending]);
  async function send(text: string) {
    if (!text.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const message = await sendMessage(id, text);
      setMessages((old) => [...old, message]);
      setDraft("");
      await new Promise((resolve) => setTimeout(resolve, 1100));
      if (!active.current) return;
      const isFirst = sentCount.current === 0;
      sentCount.current += 1;
      const reply = await sendMessage(
        id,
        isFirst
          ? "Wait, what? 😂 This is such a small world. Hey, I’m glad you connected!"
          : "I’m curious too! Maybe we should compare our family stories over coffee? ☕",
        "kin",
      );
      if (active.current) setMessages((old) => [...old, reply]);
    } catch (err) {
      if (active.current) setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      if (active.current) setSending(false);
    }
  }
  if (!loaded)
    return (
      <AppShell back title="Say hello">
        <p className="text-muted-foreground text-sm text-center mt-20">Opening your connection…</p>
      </AppShell>
    );
  if (!connection)
    return (
      <AppShell back title="Say hello">
        <div className="narrow-page text-center">
          <ShieldCheck size={42} className="mx-auto text-primary" />
          <h1 className="font-display text-3xl mt-6">Still private.</h1>
          <p className="text-sm text-muted-foreground mt-4">
            You both need to choose to connect first.
          </p>
          <Button asChild variant="kin" size="cta" className="mt-7">
            <Link to="/match/$id" params={{ id }}>
              Explore connection
            </Link>
          </Button>
        </div>
      </AppShell>
    );
  return (
    <AppShell back title="Say hello">
      <div className="narrow-page">
        <div className="grid grid-cols-[48px_minmax(0,1fr)_auto] gap-3 items-center border-b border-border pb-5">
          {id === "maja" ? (
            <img
              src={majaPortrait}
              alt="Synthetic Maja profile"
              width={48}
              height={48}
              loading="lazy"
              className="size-12 object-cover rounded-full"
            />
          ) : (
            <div className="size-12 bg-secondary rounded-full grid place-items-center text-sm">
              {connection.user.initials}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="font-display text-xl font-medium">{connection.user.name}</h1>
            <p className="text-[11px] text-muted-foreground mt-1">
              Possible {connection.match.relationship}
            </p>
          </div>
          <span className="text-[9px] text-primary border border-primary/20 bg-primary/5 rounded-full p-2 flex gap-1 items-center">
            <Fingerprint size={11} aria-hidden />
            Demo connection
          </span>
        </div>
        <div className="flex gap-2 justify-end pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={report}
            disabled={reported}
          >
            <Flag />
            {reported ? "Reported (demo)" : "Report"}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Ban />
                Block
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Block {connection.user.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This hides the connection and clears messages in this browser tab only. It is a
                  local demo action, not enforced by any server, and resets when you reload.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => void block()}>Block locally</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {reported && (
          <p role="status" className="text-[10px] text-muted-foreground text-right">
            Flagged in this tab only. Nothing was sent to anyone.
          </p>
        )}
        <div
          className="chat-scroll"
          ref={scroll}
          role="log"
          aria-live="polite"
          aria-label="Demo conversation"
        >
          {messages.length === 0 && (
            <div className="text-center my-auto">
              <MessageCircle
                size={30}
                strokeWidth={1.3}
                className="mx-auto text-muted-foreground"
              />
              <h2 className="font-display text-xl mt-5">Every story starts with hello.</h2>
              <p className="text-[11px] text-muted-foreground mt-3">
                A possible connection. A real conversation starter.
              </p>
              <Button
                variant="glass"
                className="mt-6 h-auto py-4 px-4 whitespace-normal text-xs max-w-full"
                onClick={() => send("Hey — apparently we might be family 👋")}
              >
                Hey — apparently we might be family 👋
              </Button>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${message.sender === "you" ? "sent" : ""}`}
            >
              {message.text}
            </div>
          ))}
          {sending && (
            <p className="text-xs text-muted-foreground">
              {connection.user.name} is typing… <span className="text-[9px]">(demo)</span>
            </p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap pb-4">
          {["Wait, what?", "No way 😂", "Tell me more"].map((reply) => (
            <Button
              key={reply}
              variant="glass"
              size="sm"
              onClick={() => send(reply)}
              disabled={sending}
            >
              {reply}
            </Button>
          ))}
        </div>
        <form
          className="grid grid-cols-[minmax(0,1fr)_44px] items-center gap-2 border border-border bg-card rounded-full p-2"
          onSubmit={(event) => {
            event.preventDefault();
            void send(draft);
          }}
        >
          <input
            aria-label="Your message"
            placeholder="Say something…"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="min-w-0 w-full bg-transparent outline-none px-3 text-sm placeholder:text-muted-foreground"
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <Button
            type="submit"
            variant="kin"
            size="icon"
            className="size-11"
            disabled={sending || !draft.trim()}
            aria-label="Send message"
          >
            <ArrowUp size={20} />
          </Button>
        </form>
        {error && (
          <p role="alert" className="text-xs text-primary mt-3">
            {error}
          </p>
        )}
        <div className="mt-5">
          <DemoNote />
          <p className="text-[9px] text-center text-muted-foreground mt-1">
            Messages and replies are simulated and stay in this demo session.
          </p>
        </div>
      </div>
    </AppShell>
  );
}