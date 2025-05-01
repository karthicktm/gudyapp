import ResponsiveLayout from '@/components/responsive-layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResponsiveLayout>{children}</ResponsiveLayout>;
}