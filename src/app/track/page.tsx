import type { Metadata } from 'next';
import TrackClient from './client';

export const metadata: Metadata = {
  title: 'Track your delivery',
  alternates: { canonical: '/track' },
  description: 'Follow every Kumove delivery handoff from collection to arrival.',
};

export default function TrackPage() {
  return <TrackClient />;
}
