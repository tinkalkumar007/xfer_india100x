import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/hooks/use-toast";
import { useFrappeAuth } from "frappe-react-sdk";

import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
//import {useAuth} from '../hooks/useAuth';

const formSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }),
});

export default function UserLoginForm({ setScreen }) {
  const navigate = useNavigate();
  const { login } = useFrappeAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState("false");

  const onSubmit = (data) => {
    login({
      username: data.username,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
        if (response.message === "Logged In") {
          navigate("/xfer/business-dashboard");
        }
      })
      .catch((err) => {
        console.error(
          "Login failed:",
          err?.response?.data || err?.message || err
        );
      });
  };

  return (
    <div className={cn("grid gap-3")}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 select-none"
        >
          <div className="flex flex-col gap-4 relative">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        placeholder="Enter your email"
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
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="off"
                          {...field}
                        />
                        {showPassword ? (
                          <Eye
                            strokeWidth={2}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                            // "cursor-pointer absolute right-2 top-2 h-6 w-6 overline"
                            className="cursor-pointer absolute right-2 top-2 h-5 w-5"
                          />
                        ) : (
                          <EyeOff
                            strokeWidth={2}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                            // "cursor-pointer absolute right-2 top-2 h-6 w-6 overline"
                            className="cursor-pointer absolute right-2 top-2 h-5 w-5"
                          />
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-start text-sm gap-0 hover:underline">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setScreen("forgot-password");
                  }}
                >
                  Forgot Password?
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <Button className="w-full" type="submit">
                Log in
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
