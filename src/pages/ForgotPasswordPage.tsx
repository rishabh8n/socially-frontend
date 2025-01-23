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

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPasswordPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError("");
      const { email } = data;
      const response = await axios.post("/auth/forgot-password", { email });
      if (response.status === 200) {
        setMessage("Reset link sent to your email");
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
            <Button
              type="submit"
              className="mb-8 w-full p-5"
              disabled={isLoading || message !== ""}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-black text-sm">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
