import ResponsiveLayout from '@/components/responsive-layout';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResponsiveLayout>{children}</ResponsiveLayout>;
}