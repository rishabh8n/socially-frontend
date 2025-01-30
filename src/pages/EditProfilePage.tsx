import DesktopSidebar from "@/components/DesktopSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftIcon, UserIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  username: z.string().min(3).max(20),
  fullName: z.string().min(3).max(50),
  bio: z.string().max(100).optional(),
  gender: z.string().optional(),
});

const EditProfilePage = () => {
  const { user, uploadAvatar, updateProfile } = useUserStore();
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      gender: user?.gender ? user.gender : "male",
    },
  });

  const handleChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      console.log(formData.get("avatar"));
      await uploadAvatar(formData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      setIsLoading(true);
      setError("");
      await updateProfile(data);
      navigate(`/profile/${user.username}`);
      setIsLoading(false);
    } catch (error: any) {
      setError(error?.response?.data.message || "Error updating profile");
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen items-center">
        <div className="flex items-center gap-2 p-2 md:hidden w-full">
          <Link
            replace={true}
            to={`/profile/${user.username}`}
            className="flex items-center p-2"
          >
            <ArrowLeftIcon size={24} />
          </Link>
          <p className="text-xl font-bold">Edit Profile</p>
        </div>
        <div className="w-full md:w-8/12 md:mt-10 p-2">
          <p className="hidden md:block mb-4 text-xl font-bold">Edit Profile</p>
          <div className="bg-primary/5 p-3 rounded-lg w-full flex justify-between items-center">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="size-8 text-primary/60" />
              </div>
            )}
            <Input
              type="file"
              onChange={handleChange}
              ref={inputFile}
              className="hidden"
            />
            <Button
              className=""
              onClick={() => inputFile.current?.click()}
              disabled={isLoading}
            >
              Change Photo
            </Button>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
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
                        className="w-full py-5"
                        placeholder="Enter your username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="w-full py-5"
                        placeholder="Enter your Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Tell us a little bit about yourself"
                        className="w-full resize-none py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-red-500 text-sm text-center">{error}</p>
              <Button
                type="submit"
                className="md:w-52 w-full p-5"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
