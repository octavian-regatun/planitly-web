"use client";
import { signOut } from "next-auth/react";
import Button from "../UI/Button";

export default function Buttons() {
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => void signOut()}>Sign Out</Button>
    </div>
  );
}
