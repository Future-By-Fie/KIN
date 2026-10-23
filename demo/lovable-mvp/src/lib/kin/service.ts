import { currentUser, syntheticMatches, syntheticUsers } from "./mock-data";
import type { ConnectionRequest, Message, RevealedConnection } from "./types";

// In-memory, synthetic demo adapter. Replace this module with an API adapter later.
// Mutations are called only from browser interactions; nothing is persisted, sent to a
// server, or collected. Block/report state lives in this browser tab only and is NOT
// enforced by any server.
export const MAX_MESSAGE_LENGTH = 500;
const ID_PATTERN = /^[a-z0-9-]{1,32}$/;

const requests = new Map<string, ConnectionRequest>();
const messages = new Map<string, Message[]>();
const blocked = new Set<string>();
const reports = new Set<string>();

export class DemoNotFoundError extends Error {}

function assertValidId(id: string) {
  if (typeof id !== "string" || !ID_PATTERN.test(id)) {
    throw new DemoNotFoundError("This demo connection is unavailable.");
  }
}

export async function getCurrentUser() {
  return { ...currentUser };
}
export async function getNearbyKin() {
  return syntheticMatches.filter((match) => !blocked.has(match.id)).map((match) => ({ ...match }));
}
export async function getKinMatch(id: string) {
  assertValidId(id);
  const match = syntheticMatches.find((item) => item.id === id);
  if (!match || blocked.has(id))
    throw new DemoNotFoundError("This demo connection is unavailable.");
  return { ...match };
}
export async function requestConnection(id: string): Promise<ConnectionRequest> {
  await getKinMatch(id);
  const existing = requests.get(id);
  if (existing) return { ...existing };
  const request: ConnectionRequest = {
    id: `request-${id}`,
    matchId: id,
    requesterConsent: true,
    recipientConsent: false,
    status: "pending",
  };
  requests.set(id, request);
  return { ...request };
}
/** Simulates the other person's consent. Only valid after the user has asked to connect. */
export async function acceptConnection(id: string): Promise<RevealedConnection> {
  const request = requests.get(id);
  if (!request?.requesterConsent || blocked.has(id))
    throw new Error("Both sides must opt in before an identity is revealed.");
  const accepted: ConnectionRequest = { ...request, recipientConsent: true, status: "accepted" };
  requests.set(id, accepted);
  const user = syntheticUsers[id];
  if (!user) throw new Error("This demo profile is unavailable.");
  return { match: await getKinMatch(id), user: { ...user }, request: { ...accepted } };
}
export async function getRevealedConnection(id: string): Promise<RevealedConnection | null> {
  if (!ID_PATTERN.test(id) || blocked.has(id)) return null;
  const request = requests.get(id);
  const user = syntheticUsers[id];
  if (
    !user ||
    !request?.requesterConsent ||
    !request.recipientConsent ||
    request.status !== "accepted"
  )
    return null;
  return { match: await getKinMatch(id), user: { ...user }, request: { ...request } };
}
export async function getConnections(): Promise<RevealedConnection[]> {
  const all = await Promise.all([...requests.keys()].map(getRevealedConnection));
  return all.filter((item): item is RevealedConnection => item !== null);
}
export async function cancelConnection(id: string) {
  requests.delete(id);
  messages.delete(id);
}
export async function getMessages(id: string) {
  if (!(await getRevealedConnection(id)))
    throw new Error("Connect mutually before reading messages.");
  return (messages.get(id) ?? []).map((message) => ({ ...message }));
}
export async function sendMessage(
  matchId: string,
  text: string,
  sender: "you" | "kin" = "you",
): Promise<Message> {
  if (!(await getRevealedConnection(matchId)))
    throw new Error("Connect mutually before sending a message.");
  const clean = typeof text === "string" ? text.trim() : "";
  if (!clean) throw new Error("Write a message first.");
  if (clean.length > MAX_MESSAGE_LENGTH)
    throw new Error(`Keep messages under ${MAX_MESSAGE_LENGTH} characters.`);
  const message: Message = {
    id: crypto.randomUUID(),
    matchId,
    text: clean,
    sender,
    createdAt: Date.now(),
  };
  messages.set(matchId, [...(messages.get(matchId) ?? []), message]);
  return message;
}
/** Local-only block: hides the match, removes the connection and messages in this tab. */
export async function blockMatch(id: string) {
  assertValidId(id);
  blocked.add(id);
  await cancelConnection(id);
}
/** Local-only report flag. Nothing is sent anywhere in this prototype. */
export async function reportMatch(id: string) {
  assertValidId(id);
  reports.add(id);
  return { id, deliveredToServer: false as const };
}
export function isBlocked(id: string) {
  return blocked.has(id);
}
export function resetDemo() {
  requests.clear();
  messages.clear();
  blocked.clear();
  reports.clear();
}