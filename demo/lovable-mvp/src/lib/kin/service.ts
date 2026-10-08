import { currentUser, syntheticMatches, syntheticUsers } from './mock-data';
import type { ConnectionRequest, Message, RevealedConnection } from './types';

// In-memory, synthetic demo adapter. Replace this module with an API adapter later.
// Mutations are called only from browser interactions; no data is persisted or collected.
const requests = new Map<string, ConnectionRequest>();
const messages = new Map<string, Message[]>();
export async function getCurrentUser() { return { ...currentUser }; }
export async function getNearbyKin() { return syntheticMatches.map(match => ({ ...match })); }
export async function getKinMatch(id: string) {
  const match = syntheticMatches.find(item => item.id === id);
  if (!match) throw new Error('This demo connection is unavailable.');
  return { ...match };
}
export async function requestConnection(id: string): Promise<ConnectionRequest> {
  await getKinMatch(id);
  const existing = requests.get(id);
  if (existing) return { ...existing };
  const request: ConnectionRequest = { id: `request-${id}`, matchId: id, requesterConsent: true, recipientConsent: false, status: 'pending' };
  requests.set(id, request);
  return { ...request };
}
export async function acceptConnection(id: string): Promise<RevealedConnection> {
  const request = requests.get(id);
  if (!request?.requesterConsent) throw new Error('Both sides must opt in before an identity is revealed.');
  const accepted: ConnectionRequest = { ...request, recipientConsent: true, status: 'accepted' };
  requests.set(id, accepted);
  const user = syntheticUsers[id];
  if (!user) throw new Error('This demo profile is unavailable.');
  return { match: await getKinMatch(id), user: { ...user }, request: { ...accepted } };
}
export async function getRevealedConnection(id: string): Promise<RevealedConnection | null> {
  const request = requests.get(id);
  const user = syntheticUsers[id];
  if (!user || !request?.requesterConsent || !request.recipientConsent || request.status !== 'accepted') return null;
  return { match: await getKinMatch(id), user: { ...user }, request: { ...request } };
}
export async function getConnections(): Promise<RevealedConnection[]> {
  const all = await Promise.all([...requests.keys()].map(getRevealedConnection));
  return all.filter((item): item is RevealedConnection => item !== null);
}
export async function cancelConnection(id: string) { requests.delete(id); messages.delete(id); }
export async function getMessages(id: string) { return [...(messages.get(id) ?? [])]; }
export async function sendMessage(matchId: string, text: string, sender: 'you' | 'kin' = 'you'): Promise<Message> {
  if (!await getRevealedConnection(matchId)) throw new Error('Connect mutually before sending a message.');
  if (!text.trim()) throw new Error('Write a message first.');
  const message: Message = { id: crypto.randomUUID(), matchId, text: text.trim(), sender, createdAt: Date.now() };
  messages.set(matchId, [...(messages.get(matchId) ?? []), message]);
  return message;
}
export function resetDemo() { requests.clear(); messages.clear(); }