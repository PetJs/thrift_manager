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
import { AxiosError } from "axios";
import { ApiResponse } from "@/lib/types";

const signUnSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string(),
  phone: z
    .string()
    .min(9, "Phone must be 9 characters")
    .max(13, "Phone cant be more than 13"),
  contribution_amount: z.number(),
});

export default function SignUp() {
  const navigate = useNavigate();
  const { setUser, setTokens } = useUserStore();

  const registerMutation = useMutation({
    mutationFn: AuthService.registerUser,
    onSuccess: (resp) => {
      setUser({ user: resp.data.user });
      setTokens(resp.data.token, "");
      toast.success("Woo hoo signed up");
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      const errorMessage =
        ((err as AxiosError).response?.data as ApiResponse<null>)?.message ||
        "Sign Up Error";
      toast.error(errorMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(signUnSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      contribution_amount: 0,
    },
  });

  const onSubmit = async (values: {
    email: string;
    password: string;
    name: string;
    phone: string;
    contribution_amount: number;
  }) => {
    registerMutation.mutate(values);
  };

  return (
    <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-md p-6">
      <h1 className="text-xl font-bold text-gray-700 text-center mb-6">
        Thrift Management Signup
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your Phone..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contribution_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribution Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Contribution amount."
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
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500 underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
