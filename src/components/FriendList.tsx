import React, { FC, HTMLAttributes } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { api } from "~/trpc/react";
import UserOption from "./UserOption";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { TrashIcon, ViewIcon } from "lucide-react";

type Props = {
  cardProps: HTMLAttributes<HTMLDivElement>;
};

const FriendList: FC<Props> = ({ cardProps }) => {
  const session = useSession();
  const { data: friendships } = api.friendships.getAll.useQuery();

  return (
    <Card {...cardProps}>
      <CardHeader>
        <CardTitle>Friends List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friendships?.map((friendship) => (
              <TableRow key={friendship.id}>
                <TableCell>
                  <UserOption
                    userId={
                      session.data?.user.id === friendship.user1Id
                        ? friendship.user2Id
                        : friendship.user1Id
                    }
                  />
                </TableCell>
                <TableCell>{friendship.status}</TableCell>
                <TableCell className="flex gap-4">
                  <Button size="icon" variant="outline">
                    <ViewIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FriendList;
