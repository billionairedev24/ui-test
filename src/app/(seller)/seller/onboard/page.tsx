"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, AlertCircle } from "lucide-react";
import Faq from "@/components/seller/faq";
import SubmitButton from "@/components/util/SumitButton";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import {
  BusinessInfoSchema,
  BusinessInfoValidator,
} from "@/lib/validators/sellerOnboardValidator";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useBusinessTypeStore } from "@/app/store/sellerOnboardStore/businessTypeStore";

const BusinessInformationPage = () => {
  const [businessLocation, setBusinessLocation] = useState("");
  // const [businessType, setBusinessType] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const setBusinessType = useBusinessTypeStore(
    (state) => state.setBusinessType
  );
  const businessType = useBusinessTypeStore((state) => state.businessType);

  const businessPageForm = useForm<BusinessInfoValidator>({
    resolver: zodResolver(BusinessInfoSchema),
    defaultValues: {
      country: "",
      businessType: "",
      businessName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      attestation: false,
    },
  });

  const onSubmit = (data: BusinessInfoValidator) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    router.push("/seller/onboard/entity-details");
  };

  return (
    <div className="h-[85%] md:h-full overflow-y-visible ">
      <div className="h-full p-8 overflow-y-scroll">
        <Form {...businessPageForm}>
          <form onSubmit={businessPageForm.handleSubmit(onSubmit)}>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-black mb-8">
                Business Information
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card className="border-black">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <FormLabel className="flex items-center space-x-2 text-sm font-semibold text-black mb-2">
                            <span>Business location</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-4 h-4 text-gray-500 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {/*ToDo: update with verbiage */}
                                  <p>To do item. Get verbiage</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </FormLabel>
                          <FormField
                            control={businessPageForm.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setBusinessLocation(value);
                                  }}
                                  value={field.value}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {/*Map this maybe from api async*/}
                                    <SelectItem value="United States">
                                      United States
                                    </SelectItem>
                                    <SelectItem value="Canada">
                                      Canada
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  <p className="text-sm text-gray-500 mt-1">
                                    If you don&#39;t have a business, enter your
                                    country of residence.
                                  </p>
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {businessLocation && (
                          <div>
                            <FormLabel className="flex items-center space-x-2 text-sm font-semibold text-black mb-2">
                              <span>Business type</span>
                            </FormLabel>
                            <FormField
                              control={businessPageForm.control}
                              name="businessType"
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      // setBusinessType(value);
                                      setBusinessType(value);
                                    }}
                                    value={field.value}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select business type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="individual">
                                        Individual
                                      </SelectItem>
                                      <SelectItem value="business">
                                        Business
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}

                        {businessType && (
                          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-blue-400" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                  Please ensure that your business type
                                  selection is correct.
                                </p>
                                <p className="mt-2 text-sm text-blue-700">
                                  You have selected to register as a{" "}
                                  <strong>
                                    {businessType === "individual"
                                      ? "individual"
                                      : "business"}
                                  </strong>
                                  {businessType === "individual"
                                    ? ", which means you are operating as a sole proprietor or individual seller."
                                    : ", which is controlled and operated by a registered company or organization."}
                                </p>
                                <p className="mt-2 text-sm text-red-600">
                                  An incorrect selection may affect the status
                                  of your account.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {businessType === "individual" && (
                          <div className="grid grid-cols-3 gap-2">
                            <div className="grid gap-2">
                              <FormField
                                control={businessPageForm.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="text"
                                        placeholder="Danny"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid gap-2">
                              <FormField
                                control={businessPageForm.control}
                                name="middleName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>
                                      Middle Name (optional)
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="text"
                                        placeholder="Smith"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid gap-2">
                              <FormField
                                control={businessPageForm.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="text"
                                        placeholder="Doe"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        )}

                        {businessType === "business" && (
                          <div>
                            <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                              Business Name, used to register with your
                              government
                            </FormLabel>
                            <FormField
                              control={businessPageForm.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Business Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="text"
                                      placeholder="Afrotransact Inc."
                                    />
                                  </FormControl>
                                  <FormMessage />
                                  <FormDescription />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}

                        {businessType && (
                          <div className="flex items-center space-x-2">
                            <FormField
                              control={businessPageForm.control}
                              name="attestation"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={(checked) => {
                                        field.onChange(checked);
                                        setIsVerified(
                                          (prevState) => !prevState
                                        );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel>
                                    <label
                                      htmlFor="terms"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      I confirm that my business location and
                                      type are correct and I understand that
                                      this information cannot be changed later.
                                    </label>
                                  </FormLabel>
                                  <FormMessage />
                                  <FormDescription />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}

                        <div className="text-sm text-gray-700 space-y-4">
                          <p>
                            By clicking on &#39;Agree and continue&#39;, you
                            agree to the AfroTransact Services Business
                            Solutions Agreement and AfroTransact&#39;s Privacy
                            Notice.
                          </p>
                          <p>
                            If you use the selling services offered in
                            AfroTransact&#39;s marketplaces other than in the
                            USA or Canada, you also agree to the additional
                            terms listed on the International Selling Agreements
                            page with respect to those services.
                          </p>
                          <p>
                            You agree to the additional terms and conditions of
                            Customer Service by AfroTransact (CSBA). To help you
                            get started, we automatically enroll you for this
                            service. You will benefit from our established
                            customer service for your self-shipped orders in
                            marketplaces where CSBA is available. We&#39;ll
                            inform you of any potential fee in advance via your
                            registered email. You can opt-out of CSBA at any
                            time.
                          </p>
                        </div>

                        <SubmitButton
                          isLoading={false}
                          title="Agree and continue"
                          classItems="bg-yellow-400 text-black hover:bg-yellow-500"
                          disabled={
                            !isVerified || !businessLocation || !businessType
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Faq />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BusinessInformationPage;
