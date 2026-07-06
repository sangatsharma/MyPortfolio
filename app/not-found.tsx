import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-sm text-accent-strong">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          This page shipped to the wrong environment.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          The route you&apos;re looking for doesn&apos;t exist — or never made it past code review.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-base transition-opacity hover:opacity-85"
        >
          <ArrowLeft size={15} /> Back home
        </Link>
      </div>
    </section>
  );
}
