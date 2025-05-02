// app/customize/layout.tsx
import ResponsiveLayout from '@/components/responsive-layout';

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResponsiveLayout>{children}</ResponsiveLayout>;
}