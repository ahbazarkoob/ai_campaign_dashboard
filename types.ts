export interface Campaign {
    id: string;
    name: string;
    type: 'call' | 'sms' | 'email';
    startDate: string; // ISO string, e.g., "2025-06-27T10:00:00Z"
    message: string;
    status: 'scheduled' | 'running' | 'completed';
  }