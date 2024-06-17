"use client";
import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "~/trpc/react";
import {
  SelectContentProps,
  SelectProps,
  SelectValueProps,
} from "@radix-ui/react-select";

type Props = {
  selectProps?: SelectProps;
  selectValueProps?: SelectValueProps;
};

const UserSelect: FC<Props> = ({ selectProps, selectValueProps }) => {
  const users = api.users.search.useQuery({ query: "" });

  return (
    <Select {...selectProps}>
      <SelectTrigger>
        <SelectValue
          {...selectValueProps}
          placeholder={selectValueProps?.placeholder ?? "Select users"}
        />
      </SelectTrigger>
      <SelectContent>
        {users.data?.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserSelect;
