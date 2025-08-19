import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { Dot } from "lucide-react";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(120);

  const formSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const handleSendOtp = async () => {
    const toastId = toast.loading("sending OTP");
    try {
      const res = await sendOtp({ email: email }).unwrap();

      if (res.success) {
        toast.success("OTP Sent", { id: toastId });
        setConfirmed(true);

        setTimer(120);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
        setConfirmed(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect( () => {
  //   if (!email) {
  //     navigate("/login");
  //   }

  // } , [email])

  useEffect(() => {
    if (!email || !confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      console.log("Tick");
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {confirmed ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Enter OTP</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
                id="otp-form"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <Dot />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormDescription>
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0}
                          className={cn("p-0 m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Resent OPT:{" "}
                        </Button>{" "}
                        {timer}
                      </FormDescription>

                      <FormDescription>
                        Please enter the one-time password sent to your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" form="otp-form">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Enter OTP</CardTitle>

            <CardDescription>
              An OTC will be sent to your email at {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex-col gap-2">
            <Button
              onClick={handleSendOtp}
              type="submit"
              className="w-full"
              form="otp-form"
            >
              Send
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;
