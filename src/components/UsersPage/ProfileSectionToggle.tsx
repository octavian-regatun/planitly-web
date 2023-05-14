import {
  ArrowPathIcon,
  PhotoIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function ProfileSectionToggle() {
  return (
    <div className="mt-4 flex w-full justify-evenly border-y border-black py-2">
      <PhotoIcon className="h-8 w-8" />
      <UserGroupIcon className="h-8 w-8" />
      <ArrowPathIcon className="h-8 w-8" />
    </div>
  );
}
