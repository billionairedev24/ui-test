import React from "react";
import {toast} from "@/components/ui/use-toast";
import {TUserSchemaValidator} from "@/lib/validators/userSignupValidator";
import {IdentifierType} from "@/types/types";
import {AES} from "crypto-js";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

interface UseRegisterArgs {
  idType?: IdentifierType;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
}

export const UseRegister = ({ setIsLoading, idType, router }: UseRegisterArgs) => {

  return async (userData: TUserSchemaValidator) => {
    try {
      setIsLoading?.(true);
      const response = await axios.post("/api/auth/v1/user/signup",userData)

      if (response.status === 200) {
        const data = await response.data();
        toast({
          title: "Registration successful",
          variant: "success",
        });
        router.push("/verify");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message
          ? error.message
          : "Internal error; unable to sign up.",
        variant: "destructive",
      });
    } finally {
      setIsLoading?.(false);
    }
  };
};

