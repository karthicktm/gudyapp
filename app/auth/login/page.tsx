import { redirect } from 'next/navigation';

export default function LoginPage() {
  // For now, this redirects back to the main auth page
  // Later you can implement the actual login form here
  redirect('/');
}