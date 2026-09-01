import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'The Kumove route',
  alternates: { canonical: '/about' },
  description: 'Learn how Kumove and Kunemi are building a postcode-native delivery network for Nigeria.',
};

export default function AboutPage() {
  return <AboutClient />;
}
