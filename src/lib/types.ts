import type { User as FirebaseUser } from "firebase/auth";

export interface User extends FirebaseUser {
  // Add any custom user properties here
}

export interface Post {
  id: string;
  content: string;
  topic: string;
  tone: string;
  createdAt: Date;
  scheduledAt?: Date;
  status: 'draft' | 'scheduled' | 'published';
}
