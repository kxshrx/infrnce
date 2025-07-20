import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <p className="text-sm text-muted-foreground">© 2025 Infrnce</p>
        <Link
          href="https://github.com/kxshrx/log-classification"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          GitHub Repository
        </Link>
      </div>
    </footer>
  );
}
