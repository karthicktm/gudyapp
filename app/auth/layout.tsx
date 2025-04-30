export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </div>
    );
  }