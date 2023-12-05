import { Vector3 } from '@react-three/fiber';

interface ScenZBackground {
  unlockIds: string[];
  slug?: string;
  name: string;
  thumbnail?: string;
  custom?: boolean;
  url?: string;
  author?: string;
  modifiedDate?: string;
  modifiedAuthor?: string;
  modifiedUrl?: string;
  defaultPosition?: Vector3;
}
