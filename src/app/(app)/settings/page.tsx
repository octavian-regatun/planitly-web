"use client";
import Button from "@/components/UI/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";

export default function SettingsPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 px-4 pt-4">
        <p className="text-2xl">Settings</p>
        <div className="flex flex-col gap-4">
          <Button onClick={() => void signOut()}>Sign Out</Button>
          <Link
            href="/availability"
            className="rounded border border-teal-500 bg-teal-500 px-4 py-2 text-white transition-colors hover:bg-white hover:text-teal-500"
          >
            Set Availability
          </Link>
        </div>
      </div>
    </>
  );
}
