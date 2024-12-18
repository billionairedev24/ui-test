"use client";
import Otp from "@/components/seller/Otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSchema, OtpValidator } from "@/lib/validators/otpvalidator";
import { Form } from "@/components/ui/form";
import { Role } from "@/types/types";
import { toast } from "../ui/use-toast";
import axios from "axios";

const VerifyAccount = ({
  otpDestinationType,
  otpDestination,
  userId,
  role,
  classes,
}: {
  otpDestinationType: string;
  otpDestination: string;
  userId: string;
  role: Role;
  classes?: string;
  password: string;
}) => {
  useRouter();
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "success" | "error" | "complete"
  >("idle");

  const handleOTPComplete = (otp: string) => {
    setVerificationStatus("verifying");
    setTimeout(async () => {
      const request = {
        userId: userId,
        otp: otp,
      };
      const response = await axios.post("/validate",request )
      if (response.status === 200) {
        const isValid = (await response.data()) as boolean;
        if (!isValid) {
          setVerificationStatus("error");
          return;
        }
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    }, 3000);
  };

  const handleResendOTP = () => {
    toast({
      title: "Resending OTP...",
      variant: "processing",
    });
    setVerificationStatus("idle");

    setTimeout(async () => {
      try {
        const response = await axios.post("/resendOtp",{ userId, destination: otpDestination } )
        if (response.status === 200) {
          toast({
            title: "OTP resent successfully !",
            variant: "success",
          });
        }
      } catch (error: any) {
        toast({
          title: "Resend OTP failed",
          description: error.message,
          variant: "destructive",
        });
      }
    }, 3000);
  };

  const otpForm = useForm<OtpValidator>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const isSeller = role === Role.SELLER;

  return (
    <div
      className={`flex  flex-col ${
        isSeller ? "bg-black" : "bg-white"
      } items-center justify-center h-screen ${classes}`}
    >
      <div
        className={`max-w-md w-full space-y-4 p-6 rounded-lg  ${
          isSeller ? "shadow-lg" : "shadow-md"
        }  `}
      >
        <div className="space-y-2">
          <Form {...otpForm}>
            <form>
              <div className="flex flex-col items-center justify-center">
                {/*<div className="flex flex-col items-center justify-center min-h-screen bg-black">*/}
                <h1
                  className={`text-2xl font-bold  ${
                    isSeller ? "text-yellow-400" : "text-black"
                  }  mb-8`}
                >
                  OTP Verification
                </h1>
                <Otp
                  onComplete={handleOTPComplete}
                  form={otpForm}
                  resendOTP={handleResendOTP}
                  otpDestination={otpDestination}
                  otpDestinationType={otpDestinationType}
                  role={role}
                />
                {verificationStatus === "verifying" && (
                  <p
                    className={`${
                      isSeller ? "text-yellow-400" : "text-black"
                    } mt-4"`}
                  >
                    Verifying OTP...
                  </p>
                )}
                {verificationStatus === "success" && (
                  <p className="text-green-500 mt-4">
                    OTP verified successfully!
                  </p>
                )}
                {verificationStatus === "error" && (
                  <p className="text-red-500 mt-4">
                    Invalid OTP. Please try again.
                  </p>
                )}
                {verificationStatus === "complete" && (
                  <p
                    className={`${
                      isSeller ? "text-yellow-400" : "text-black"
                    } mt-4 font-bold"`}
                  >
                    Logging you in
                  </p>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
