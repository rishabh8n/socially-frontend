import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "@/store/userStore";
import { useGoogleLogin } from "@react-oauth/google";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});
const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const { signup, error, isLoading, googleSignin, clearError } = useUserStore();

  useEffect(() => {
    clearError();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await signup(data.email, data.username, data.password);
      navigate("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const response = async (authResult: any) => {
    try {
      if (authResult.code) {
        await googleSignin(authResult.code);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: response,
    onError: response,
    flow: "auth-code",
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-semibold text-3xl sm:text-5xl text-center mb-2">
        Welcome to Socially
      </h1>
      <p className="w-72 text-center mx-auto text-gray-400 text-sm leading-4 mb-5">
        Get started by registering yourself to Socially.
      </p>
      <Button
        variant={"outline"}
        className="w-80 py-6 text-[16px] flex items-center justify-center gap-2"
        onClick={googleLogin}
      >
        <FcGoogle className="text-lg" />
        Sign in with Google
      </Button>
      <p className="text-gray-400 my-4">or</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="w-80 py-5"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-80 py-5"
                    placeholder="Enter your username"
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
                  <div className="relative w-80">
                    <Input
                      {...field}
                      type={passwordVisible ? "text" : "password"}
                      className="py-5"
                      placeholder="Enter your password"
                    />
                    <Button
                      variant={"ghost"}
                      className="absolute top-[50%] translate-y-[-50%] right-0"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPasswordVisible((prev) => !prev);
                      }}
                    >
                      {passwordVisible ? (
                        <EyeOffIcon className="size-5" />
                      ) : (
                        <EyeIcon className="size-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-red-500 text-center">{error}</p>

          <Button type="submit" className="w-80 p-5" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-center w-80 sm:w-full">
        Already have an account?
        <Link to="/auth/signin" className="text-blue-700">
          Sign in
        </Link>{" "}
        continue where you left.
      </p>
    </div>
  );
};

export default SignupPage;
