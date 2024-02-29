import { z } from "zod";
import { useForm } from "react-hook-form";
import * as UserApi from "../../api/users-api";
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
import VerticalLogo from "../VerticalLogo";
import { User } from "@/models/user";

interface LogInFormProps {
  onLoggedIn: (user: User) => void;
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const LogInForm = ({ onLoggedIn }: LogInFormProps) => {
  const {
    formState: { errors, isSubmitting },
  } = useForm<UserApi.LogInCredentials>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      onLoggedIn(await UserApi.logIn(values));
      //window.location.href = "/dashboard";
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-20 h-screen w-screen items-center justify-center">
      <VerticalLogo />
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="h1-extrabold">Log In</h1>
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
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="underline text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInForm;
