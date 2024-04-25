import { useCreateGroup } from "@/hooks/use-create-group";
import { useGetFriendships } from "@/hooks/use-get-friendships";
import { useGetGroupMembers } from "@/hooks/use-get-group-members";
import { PublicUser, User } from "@/services/users";
import { useStore } from "@/store/store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserSelector } from "./UserSelector";
import { UsersList } from "./UsersList";
import { Button } from "./shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { Input } from "./shadcn/input";
import { Textarea } from "./shadcn/textarea";

export function NewGroupDialog() {
  const me = useStore((store) => store.me) as User;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);

  const formSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string(),
    picture: z.string().min(1),
    members: z.array(z.number()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      picture: "https://i.imgur.com/aicmR8x.jpg",
      members: [],
    },
  });

  const createGroup = useCreateGroup();
  const getFriendships = useGetFriendships();
  const membersQuery = useGetGroupMembers(form.getValues("members"));

  const users =
    getFriendships.data?.data.map((friendship) =>
      friendship.recipientId === me.id
        ? friendship.requester
        : friendship.recipient
    ) || [];

  useEffect(() => {
    form.setValue("members", [me?.id as number]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createGroup.mutate(form.getValues());
    setIsOpen(false);
  };

  const handleAddMember = () => {
    const members = form.getValues("members");
    const newMembers = new Set([...members, selectedUser?.id as number]);
    form.setValue("members", [...newMembers]);
    membersQuery.refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <PlusCircleIcon className="w-6 h-6 mr-2" /> New Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="The Most Awesome Group" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This is a description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center flex-wrap">
                      <UserSelector
                        users={users}
                        value={selectedUser}
                        onChange={(user) => setSelectedUser(user)}
                      />
                      <Button
                        type="button"
                        disabled={!selectedUser}
                        onClick={handleAddMember}
                      >
                        Add Member
                      </Button>
                      <UsersList users={membersQuery.data?.data || []} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isLoading}>
              Create Group
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
