"use client";
import { useFriendsStore } from "@/store/friends";
import { debounce } from "lodash";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";

export default function Search() {
  const [query, setQuery] = useFriendsStore(
    state => [state.query, state.setQuery],
    shallow
  );

  const debouncedSetQuery = useCallback(debounce(setQuery, 250), []);

  return (
    <input
      type="text"
      placeholder="Search"
      className="w-full rounded border border-gray-400 px-4 py-2"
      onChange={event => debouncedSetQuery(event.target.value)}
    />
  );
}
