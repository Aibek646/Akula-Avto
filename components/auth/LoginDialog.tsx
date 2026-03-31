"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/auth.validation";
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
import useLoginDialog from "@/hooks/use-login-dialog";
import useRegisterDialog from "@/hooks/use-register.dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginMutationFunction, registerMutationFunction } from "@/lib/fetcher";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const LoginDialog = () => {
  const { open, onClose } = useLoginDialog();
  const { onOpen } = useRegisterDialog();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFunction,
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
        toast("Login successfull!", {
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
        toast("Error occurred", {
          description: "Login failed, please try again",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      },
    });
  };

  const handleRegisterOpen = () => {
    onClose();
    onOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
          <DialogDescription>
            Enter your email and password to login
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
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
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-2 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Dont have an account? ?{" "}
            <button onClick={handleRegisterOpen} className="!text-primary">
              Registration
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
