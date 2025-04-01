import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/services/auth-service";
import useUserStore from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMemo } from "react";
import { AxiosError } from "axios";
import { ApiResponse } from "@/lib/types";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export default function SignIn() {
  const navigate = useNavigate();
  const { setUser, currentRole, setCurrentRole, setTokens } = useUserStore();

  const isAdmin = useMemo(() => currentRole === "admin", [currentRole]);

  console.log("Current Role before login:", currentRole);

  const loginMutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      return isAdmin ? AuthService.loginAdmin(values) : AuthService.loginUser(values);
    },
    onSuccess: (resp) => {
      console.log("Login Response:", resp.data);
      const userRole = resp.data.user.role || "admin"; // Default to 'admin' if null
      setUser({ user: resp.data.user });
      setCurrentRole(userRole);
      localStorage.setItem("currentRole", userRole); // Persist role correctly
      setTokens(resp.data.token, "");
      toast.success("Woo hoo signed in");
    
      console.log("User Role after login:", userRole); // Now it won’t be null
    
      navigate(userRole === "admin" ? "/admin/dashboard" : "/users/dashboard");
    },
    onError: (err) => {
      console.error(err);
      const errorMessage =
        ((err as AxiosError).response?.data as ApiResponse<null>)?.message ||
        "Sign in Error";
      toast.error(errorMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    loginMutation.mutate(values);
  };

  const toggleRole = () => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setCurrentRole(newRole);
    localStorage.setItem("currentRole", newRole);
    console.log("New Role:", newRole);
  };

  console.log("Current Role in Store:", currentRole);

  return (
    <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-md p-6">
      <Button
        onClick={toggleRole}
        className="w-full mt-3 bg-gray-600 text-white py-2 mb-1"
      >
        {isAdmin ? "Sign in as User" : "Sign in as Admin"}
      </Button>
      <h1 className="text-xl font-bold text-gray-700 text-center mb-6">
        Thrift Management {isAdmin ? "Admin" : "User"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#2341AA] text-white py-2"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4 text-sm text-gray-600">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>{" "}
        </p>
        Forgot your password?{" "}
        <Link to="/reset-password" className="text-blue-600 hover:underline">
          Reset Password
        </Link>
      </div>
    </div>
  );
}
