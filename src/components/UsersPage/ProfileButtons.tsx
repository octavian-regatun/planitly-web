"use client";
import { toast } from "react-toastify";
import Button from "../UI/Button";

export default function ProfileButtons() {
  return (
    <div className="mt-6 flex w-full justify-between px-8">
      <Button variant="outlined" onClick={() => {}}>
        Edit Profile
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigator.clipboard.writeText(location.href);
          toast.success("Copied profile link to clipboard");
        }}
      >
        Share Profile
      </Button>
    </div>
  );
}
