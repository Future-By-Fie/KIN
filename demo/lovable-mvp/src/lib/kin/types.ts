export interface User { id: string; name: string; initials: string; bio: string; synthetic: true }
export interface RelationshipSignal { id: string; label: string; description: string; synthetic: true }
export interface KinMatch { id: string; relationship: string; distance: string; confidence: number; signals: RelationshipSignal[]; synthetic: true }
export interface ConnectionRequest { id: string; matchId: string; requesterConsent: boolean; recipientConsent: boolean; status: 'pending' | 'accepted'; }
export interface RevealedConnection { match: KinMatch; user: User; request: ConnectionRequest }
export interface Message { id: string; matchId: string; text: string; sender: 'you' | 'kin'; createdAt: number }