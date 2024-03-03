import { z } from "zod";
import { useForm } from "react-hook-form";
import * as UserApi from "../api/users-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import VerticalLogo from "../components/VerticalLogo";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50).email(),
  password: z.string().min(2).max(50),
});

export const SignUpPage = () => {
  const {
    formState: { isSubmitting },
  } = useForm<UserApi.SignUpCredentials>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await UserApi.signUp(values);
      window.location.href = "/login";
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-20 h-screen w-screen items-center justify-center">
      <VerticalLogo />
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="h1-extrabold">Sign Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <div className="space-y-4">
                  <FormItem>
                    <FormControl>
                      <Input
                        required={true}
                        className="p"
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div className="space-y-4">
                  <FormItem>
                    <FormControl>
                      <Input
                        required={true}
                        className="p"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div className="space-y-4">
                  <FormItem>
                    <FormControl>
                      <Input
                        required={true}
                        className="p"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <Button
              disabled={isSubmitting}
              type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <p className="p">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
