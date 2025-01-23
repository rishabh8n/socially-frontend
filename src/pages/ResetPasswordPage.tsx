import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "@/axios/axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useNavigate, useParams } from "react-router";

const formSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string(),
});

const ResetPasswordPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError("");
      const { password, confirmPassword } = data;
      if (password !== confirmPassword) {
        setError("Passwords field do not match");
        setIsLoading(false);
        return;
      }
      const response = await axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      if (response.status === 200) {
        setMessage("Password changed successfully.");
        navigate("/auth/signin");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setError(error?.response?.data.message);
    }
  };

  return (
    <div className="bg-opacity-5 p-6 flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-semibold m-2">Verify Your Email</h1>
      <p className="w-64 text-center mx-auto text-gray-400 text-sm leading-4 mb-6">
        Enter your mail to get reset link
      </p>
      <div className="mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
                        type="button"
                        className="absolute top-[50%] translate-y-[-50%] right-0"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative w-80">
                      <Input
                        {...field}
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="py-5"
                        placeholder="Enter your password"
                      />
                      <Button
                        variant={"ghost"}
                        type="button"
                        className="absolute top-[50%] translate-y-[-50%] right-0"
                        onClick={(e) => {
                          e.preventDefault();
                          setconfirmPasswordVisible((prev) => !prev);
                        }}
                      >
                        {confirmPasswordVisible ? (
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
            <Button
              type="submit"
              className="mb-8 w-full p-5"
              disabled={isLoading || message !== ""}
            >
              {isLoading ? "loading..." : "Change Password"}
            </Button>
          </form>
        </Form>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-black text-sm">{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
