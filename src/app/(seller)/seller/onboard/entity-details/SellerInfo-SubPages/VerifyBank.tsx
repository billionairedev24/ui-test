"use client";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  SellerInfoBank,
  SellerInfoBankValidator,
} from "@/lib/validators/SellerBankInfoValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction, useEffect } from "react";
import { useVerifyBankStore } from "@/app/store/sellerOnboardStore/verifyBankStore";

interface VerifyBankProps {
  setShowNext: React.Dispatch<SetStateAction<boolean>>;
}

function VerifyBank({ setShowNext }: VerifyBankProps) {
  const verifyBankStore = useVerifyBankStore((state) => state.bankDetails);
  const setVerifyBankStore = useVerifyBankStore(
    (state) => state.setBankDetails
  );
  const sellerBankInfoForm = useForm<SellerInfoBankValidator>({
    resolver: zodResolver(SellerInfoBank),
    defaultValues: verifyBankStore,
  });

  const onSubmit = (values: SellerInfoBankValidator) => {
    // TODO: Push to DB

    setVerifyBankStore(values);
    // On successful save to DB
    setShowNext(true);
  };

  useEffect(() => {
    sellerBankInfoForm.reset(verifyBankStore);
  }, [sellerBankInfoForm, verifyBankStore]);

  return (
    <Form {...sellerBankInfoForm}>
      <form onSubmit={sellerBankInfoForm.handleSubmit(onSubmit)}>
        <div className="space-y-4 border border-gray-200 rounded-lg p-4 mt-4">
          <div className=" w-[90%] bg-blue-50 border-l-4 border-blue-400 p-4 ml-8 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  You are adding your bank account in the US marketplace. You
                  can add a bank account for other market places you choose to
                  sell in, once you cmplete registration.{" "}
                </p>
              </div>
            </div>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Add a Bank Account</CardTitle>
            </CardHeader>
            <CardContent>
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-4">
                  <FormField
                    control={sellerBankInfoForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="mt-[6px]">
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="us">
                              United State of America
                            </SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellerBankInfoForm.control}
                    name="financialInstitution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Financial Institution</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger id="financial-institution">
                              <SelectValue placeholder="Financial Institution Name" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent position="popper">
                            <SelectItem value="jp">JP Morgan</SelectItem>
                            <SelectItem value="boa">Bank of America</SelectItem>
                            <SelectItem value="gms">Goldman Sachs</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellerBankInfoForm.control}
                    name="bankHolderName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel>Bank account holder Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Bank Account Holder Name "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellerBankInfoForm.control}
                    name="routingNumber"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel>Routing Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="9 digits Routing Number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellerBankInfoForm.control}
                    name="bankAccountNumber"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Account Number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={sellerBankInfoForm.control}
                    name="reBankAccountNumber"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel>Re-Type Account Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Re-Type Account Number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  Verify Account
                </Button>
              </>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}

export default VerifyBank;
