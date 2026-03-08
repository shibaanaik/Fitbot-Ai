import "@/index.css";

export const metadata = {
  title: "FitBot AI",
  description: "Your personal AI fitness coach powered by RAG",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}