export interface Collaboration {
  brand: string;
  email: string;
  budget: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'success' | 'rejected';
  token: string;
  processedAt?: string;
}

class CollaborationStore {
  private static instance: CollaborationStore;
  private collaborations: Map<string, Collaboration>;

  private constructor() {
    this.collaborations = new Map();
  }

  public static getInstance(): CollaborationStore {
    if (!CollaborationStore.instance) {
      CollaborationStore.instance = new CollaborationStore();
    }
    return CollaborationStore.instance;
  }

  public addCollaboration(collaboration: Collaboration): void {
    this.collaborations.set(collaboration.token, collaboration);
  }

  public getCollaboration(token: string): Collaboration | undefined {
    return this.collaborations.get(token);
  }

  public updateCollaboration(token: string, updates: Partial<Collaboration>): boolean {
    const collaboration = this.collaborations.get(token);
    if (collaboration) {
      this.collaborations.set(token, { ...collaboration, ...updates });
      return true;
    }
    return false;
  }

  public getAllCollaborations(): Collaboration[] {
    return Array.from(this.collaborations.values())
      .sort((a, b) => {
        if (!a.processedAt) return 1;
        if (!b.processedAt) return -1;
        return new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime();
      });
  }

  public deleteCollaboration(token: string): boolean {
    return this.collaborations.delete(token);
  }

  public exists(token: string): boolean {
    return this.collaborations.has(token);
  }

  public getCounts() {
    const all = Array.from(this.collaborations.values());
    return {
      total: all.length,
      pending: all.filter(c => c.status === 'pending').length,
      success: all.filter(c => c.status === 'success').length,
      rejected: all.filter(c => c.status === 'rejected').length
    };
  }
}

export const collaborationStore = CollaborationStore.getInstance(); 