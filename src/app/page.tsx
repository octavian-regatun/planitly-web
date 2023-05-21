import { CTAButton } from "@/components/IndexPage/CTAButton";
import Navbar from "@/components/IndexPage/Navbar";
import Calendar3D from "@/components/Spline/Calendar3D";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      {/* @ts-expect-error */}
      <Navbar />
      <main className="flex h-screen flex-col items-center gap-8 px-8 pt-28">
        <p className="bg-gradient-to-r from-teal-600 to-green-400 bg-clip-text text-center text-5xl/tight font-bold text-transparent">
          The App that Takes the Hassle Out of Group Planning
        </p>
        <div className="min-h-[512px]">
          <Calendar3D />
        </div>
        <CTAButton isLoggedIn={!!session} />
        <p className="text-lg text-zinc-500">
          With various features it enables people to easily find common
          available dates for groups of people, help them take a common
          advantageous decision about the location, place to stay, time-frame,
          budget and easily share and keep track of the money spent and other
          various aspects of related to the trip.
        </p>
      </main>
    </>
  );
}
