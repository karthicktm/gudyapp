// app/cake-designer/layout.tsx
import ResponsiveLayout from '@/components/responsive-layout';

export default function CakeDesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ResponsiveLayout>{children}</ResponsiveLayout>;
}