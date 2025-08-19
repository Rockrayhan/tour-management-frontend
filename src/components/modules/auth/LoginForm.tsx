import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Password from "@/components/ui/Password";
import config from "@/config/config";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await login(userInfo).unwrap();
      console.log(result);
      toast.success("Successfully Logged in.");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("your account is not verified");
      navigate("/verify", { state: data.email });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>

        <Button
          variant="secondary"
          type="button"
          className="cursor-pointer"
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
        >
          Login With Google
        </Button>
      </Form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}
