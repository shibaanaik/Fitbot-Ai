export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground text-lg">Page not found</p>
      <a
        href="/"
        className="mt-6 text-primary underline hover:opacity-80 transition-opacity"
      >
        ← Back to FitBot
      </a>
    </div>
  );
}