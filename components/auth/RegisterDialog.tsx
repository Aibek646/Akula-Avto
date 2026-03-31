"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation/auth.validation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useRegisterDialog from "@/hooks/use-register.dialog";
import useLoginDialog from "@/hooks/use-login-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerMutationFunction } from "@/lib/fetcher";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const RegisterDialog = () => {
  const { open, onClose } = useRegisterDialog();
  const { onOpen } = useLoginDialog();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFunction,
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      shopName: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
        toast("Registration successfull!", {
          description: "Today",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        form.reset();
        onClose();
      },
      onError: (err: any) => {
        toast("Error occurred!", {
          description: "Registration failed.Please try again",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    });
  };

  const hangleLoginOpen = () => {
    onClose();
    onOpen();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Create na account</DialogTitle>
          <DialogDescription>Enter your details</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Aibek Ramazanov"
                      className="!h-10"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      className="!h-10"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Techithemma co"
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      className="!h-10"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              className="w-full"
              type="submit"
              size="lg"
            >
              {isPending && <Loader className="w-4 h-4 animate-spin" />}
              Register
            </Button>
          </form>
        </Form>
        <div className="mt-2 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
            <button
              disabled={isPending}
              onClick={hangleLoginOpen}
              className="!text-primary"
            >
              {isPending && <Loader className="w-4 h-4 animate-spin" />}
              Login
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default RegisterDialog;
