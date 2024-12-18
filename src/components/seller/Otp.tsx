"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OtpValidator } from "@/lib/validators/otpvalidator";
import { ZodError } from "zod";
import { Role } from "@/types/types";

type OTPInputProps = {
  onComplete: (otp: string) => void;
  resendOTP: () => void;
  otpDestination: string;
  otpDestinationType: string;
  form: UseFormReturn<OtpValidator>;
  role: Role;
};

const Otp: React.FC<OTPInputProps> = ({
  form,
  onComplete,
  resendOTP,
  otpDestination,
  otpDestinationType,
  role,
}) => {
  const [otp, setOTP] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  },);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      validateAndComplete(otp.join(""));
    }
  }, [otp]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value)) || value.length > 1) return;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateAndComplete = (otpValue: string) => {
    try {
      onComplete(otpValue);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleResend = () => {
    resendOTP();
    setResendTimer(30);
    setOTP(Array(6).fill(""));
    setError(null);
    inputRefs.current[0]?.focus();
  };

  const maskedDestination =
    otpDestinationType === "email"
      ? otpDestination.replace(/(.{2})(.*)(@.*)/, "$1***$3")
      : otpDestination.replace(/(\d{2})(\d+)(\d{2})/, "$1*****$3");

  const isSeller = role === Role.SELLER;
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className={`text-sm  ${isSeller ? "text-yellow-400" : "text-black"}`}>
        Enter the OTP sent to your {otpDestinationType}: {maskedDestination}
      </p>
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-gray-800 border-gray-700">
                    <Input
                      key={index}
                      {...field}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el: HTMLInputElement | null) => {
                        if (el) {
                          inputRefs.current[index] = el;
                        }
                      }}
                      className={`w-12 h-12 text-center text-2xl border-2 ${
                        isSeller
                          ? "border-yellow-400 text-yellow-400 bg-black focus:border-yellow-500"
                          : "border-black text-black bg-white focus:border-white"
                      } rounded focus:outline-none `}
                    />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
          </React.Fragment>
        ))}
      </div>
      <div
        className={`text-sm ${isSeller ? "text-yellow-400 " : "text-black"}`}
      >
        {resendTimer > 0 ? (
          <span>Resend OTP in {resendTimer} seconds</span>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3 ">
            <Button
              onClick={handleResend}
              className={`text-sm underline w-fit ${
                isSeller ? "text-yellow-400 " : "text-white"
              }`}
            >
              Resend OTP
            </Button>

            <p
              className={`${isSeller ? "text-yellow-400" : "text-black"} mt-4"`}
            >
              OTP is valid for only 10 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Otp;
