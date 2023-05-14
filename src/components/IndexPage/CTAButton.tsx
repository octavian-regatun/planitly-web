"use client";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  isLoggedIn: boolean;
}

export function CTAButton({ isLoggedIn }: Props) {
  const router = useRouter();
  return (
    <button
      className="flex items-center gap-4 self-start rounded-md bg-gradient-to-r from-neutral-950 to-neutral-700 p-4 font-bold text-white"
      onClick={() => (isLoggedIn ? router.push("/calendar") : void signIn())}
    >
      {isLoggedIn ? "Go to App" : "Get Started"}
      <ChevronDoubleRightIcon className="mr-2 inline-block h-6 w-6" />
    </button>
  );
}
