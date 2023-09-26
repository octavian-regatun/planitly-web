import { usersService } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./shadcn/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/Form";
import { Input } from "./shadcn/Input";
import { useEffect } from "react";
import { useToast } from "./shadcn/use-toast";

interface Props {
  id: number;
}

export function MyUserProfile({ id }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => usersService.findById(id),
  });

  const updateUserMutation = useMutation({
    mutationFn: () => usersService.update(id, form.getValues()),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast({
        title: "User Updated 🎉",
        description: "Your user has been updated.",
      });
    },
  });

  const formSchema = z.object({
    username: z.string().min(2).max(32),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (userQuery.data?.username)
      form.setValue("username", userQuery.data.username);
  }, [userQuery.data?.username]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUserMutation.mutate();
  }

  if (userQuery.isPending) return <div>Loading...</div>;
  if (userQuery.isError) return <div>{userQuery.error.message}</div>;

  return (
    <div className="flex flex-col items-center pt-4">
      <Image
        src={userQuery.data.picture}
        alt="profile"
        width={128}
        height={128}
        className="rounded-full border"
      />
      <p className="text-xl mt-4">
        {userQuery.data.firstName} {userQuery.data.lastName}
      </p>
      <p className="text-neutral-500">@{userQuery.data.username}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className="mt-4"
          >
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
