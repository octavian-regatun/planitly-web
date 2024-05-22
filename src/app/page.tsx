import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  const getStartedButtonHref = session?.user ? "/app/calendar" : "/api/auth/signin";

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="flex max-w-screen-lg flex-col items-center justify-center gap-8">
        <p className="rounded-full border px-4 py-2 text-neutral-500">
          Still work in progress!
        </p>
        <h1 className="text-center text-6xl font-bold">PlanITLY</h1>
        <h2 className="text-center text-5xl font-bold">
          Organize and plan meetings and trips with ease
        </h2>
        <h3 className="text-center text-2xl text-neutral-500">
          Find common available dates, choose the best locations, manage
          budgets, and track expenses all in one place. Simplify group decisions
          and ensure everyone stays in the loop. Start planning your next event
          effortlessly with PlanITLY!
        </h3>
        <div className="flex gap-4">
          <Button asChild>
            <Link href={getStartedButtonHref}>Get started</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.friendships.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
