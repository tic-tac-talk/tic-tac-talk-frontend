import { atom } from 'jotai';
import type { UserProfile } from '@/types/api';

export const userAtom = atom<UserProfile | null>(null);
