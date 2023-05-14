"use client";
import Button from "../UI/Button";

export default function ProfileButtons() {
  return (
    <div className="mt-6 flex w-full justify-between px-8">
      <Button variant="outlined" onClick={() => {}}>
        Edit Profile
      </Button>
      <Button variant="outlined" onClick={() => {}}>
        Share Profile
      </Button>
    </div>
  );
}
