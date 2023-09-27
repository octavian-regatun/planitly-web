import { friendshipsService } from "@/services/friendships";
import { PublicUser, User, usersService } from "@/services/users";
import { useStore } from "@/store/store";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserSelector } from "./UserSelector";
import { Button } from "./shadcn/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/Form";
import { Input } from "./shadcn/Input";
import { Textarea } from "./shadcn/Textarea";
import { UsersList } from "./UsersList";
import { groupsService } from "@/services/groups";
import { useToast } from "./shadcn/use-toast";
import { AxiosError } from "axios";

export function NewGroupDialog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const me = useStore(store => store.me) as User;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);

  const groupMutation = useMutation({
    mutationFn: () => groupsService.create(form.getValues()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast({
        title: "Group Created 🎉",
        description: "Your group has been created.",
      });
      setIsOpen(false);
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      toast({
        title: `Error`,
        description: error.response?.data.message,
        className: "bg-red-600 text-white",
      });
    },
  });

  const friendshipsQuery = useQuery({
    queryKey: ["friendships"],
    queryFn: () => friendshipsService.find(),
  });

  const users =
    friendshipsQuery.data?.data.map(friendship =>
      friendship.recipientId === me.id
        ? friendship.requester
        : friendship.recipient
    ) || [];

  const formSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1),
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

  const membersQuery = useQuery({
    queryKey: ["users", form.getValues("members")],
    queryFn: () => usersService.findByIds(form.getValues("members")),
  });

  useEffect(() => {
    form.setValue("members", [me?.id as number]);
  }, [me]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    groupMutation.mutate();
  }

  const handleAddMember = () => {
    const members = form.getValues("members");
    const newMembers = new Set([...members, selectedUser?.id as number]);
    form.setValue("members", [...newMembers]);
    membersQuery.refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
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
                        onChange={user => setSelectedUser(user)}
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
            <Button type="submit" disabled={!form.formState.isValid}>
              Create Group
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
