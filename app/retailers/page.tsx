import { redirect } from 'next/navigation';

// /retailers was an alias for /business in the old Wouter router
export default function RetailersRedirect() {
  redirect('/business');
}
