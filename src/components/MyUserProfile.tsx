import { useGetUser } from "@/hooks/use-get-user";
import { useUpdateUser } from "@/hooks/use-update-user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
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

interface Props {
  id: number;
}

export function MyUserProfile({ id }: Props) {
  const formSchema = z.object({
    username: z.string().min(2).max(32),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const getUser = useGetUser(id);
  const updateUser = useUpdateUser(id, form.getValues());

  useEffect(() => {
    if (getUser.data?.username)
      form.setValue("username", getUser.data.username);
  }, [getUser.data?.username]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser.mutate();
  }

  if (getUser.isPending) return <div>Loading...</div>;
  if (getUser.isError) return <div>{getUser.error.message}</div>;

  return (
    <div className="flex flex-col items-center pt-4">
      <Image
        src={getUser.data.picture}
        alt="profile"
        width={128}
        height={128}
        className="rounded-full border"
      />
      <p className="text-xl mt-4">
        {getUser.data.firstName} {getUser.data.lastName}
      </p>
      <p className="text-neutral-500">@{getUser.data.username}</p>
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
