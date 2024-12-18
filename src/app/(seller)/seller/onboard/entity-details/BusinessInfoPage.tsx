"use client";
import { isEqual } from "lodash";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { useForm } from "react-hook-form";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import {
  BusinessFormSchema,
  BusinessFormValidator,
} from "@/lib/validators/BusinessInfoValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { useBusinessInfoStore } from "@/app/store/sellerOnboardStore/businessInfoStore";
import { AddressType } from "@/types/seller";
import { toast } from "@/components/ui/use-toast";

interface BusinessInfoPageProps {
  setShowAddressPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setAddNewMobileNumber: React.Dispatch<React.SetStateAction<boolean>>;
  addNewMobileNumber: boolean;
  setUseExistingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  useExistingAddress: boolean;
  formRef: any;
  addressToUse: AddressType | undefined;
  setAddressToUse: React.Dispatch<SetStateAction<AddressType | undefined>>;
  setShowNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const BusinessInfoPage: React.FC<BusinessInfoPageProps> = ({
  setShowAddressPopup,
  setAddNewMobileNumber,
  addNewMobileNumber,
  setUseExistingAddress,
  useExistingAddress,
  addressToUse,
  setAddressToUse,
  formRef,
  setShowNext,
}) => {
  const businessInfoStore = useBusinessInfoStore((state) => state.businessInfo);
  const setBusinessInfoStore = useBusinessInfoStore(
    (state) => state.setBusinessInfo
  );
  const setUseExistingBusinessAddress = useBusinessInfoStore(
    (state) => state.setUseExistingBusinessAddress
  );
  const setUseExistingBusinessPhoneNumber = useBusinessInfoStore(
    (state) => state.setUseExistingBusinessPhoneNumber
  );

  const businessInfoForm = useForm<BusinessFormValidator>({
    resolver: zodResolver(BusinessFormSchema),
    defaultValues: businessInfoStore,
  });

  const handleSaveAddress = () => {
    // get and save address to DB here
    const addressToSave = businessInfoForm.getValues([
      "country",
      "addressLine",
      "zip",
      "state",
      "city",
      "apartment",
      "countryPhoneCode",
    ]);
    if (addressToSave.includes(" ") || addressToSave.includes(undefined)) {
      return;
    }
    toast({
      title: "saving the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(addressToSave, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  const watchedValues = businessInfoForm.watch();
  // Ref to store previous watched values
  const prevWatchedValues = useRef(watchedValues);

  useEffect(() => {
    // Compare current values to previous ones to avoid unnecessary re-renders
    if (!isEqual(prevWatchedValues.current, watchedValues)) {
      setBusinessInfoStore(watchedValues);
      prevWatchedValues.current = watchedValues; // Update the previous values reference
    }
  }, [watchedValues, setBusinessInfoStore]);

  const onSubmit = (values: BusinessFormValidator) => {
    // TODO => Update DB here
    setBusinessInfoStore(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    // on successful push to DB, showNext for next step
    setShowNext(true);
  };

  // this is to load from local storage (persistence) &/ API when ready (save & continue feature)
  useEffect(() => {
    businessInfoForm.reset(businessInfoStore);

    // mocking address coming from API
    setAddressToUse({
      address1: "123  St",
      apartment: "24mmm",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    });
  }, [businessInfoStore, businessInfoForm]);

  return (
    <div className="p-4 space-y-4 w-full max-w-[1440px]">
      <Form {...businessInfoForm}>
        <form
          ref={formRef}
          onSubmit={businessInfoForm.handleSubmit(onSubmit)}
          className=" h-full flex flex-col gap-6 "
        >
          <FormField
            control={businessInfoForm.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Business name, used to register with your state or federal
                  government
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Afrotranct Inc" />
                </FormControl>
                <FormMessage />
                <FormDescription />
              </FormItem>
            )}
          />

          <FormField
            control={businessInfoForm.control}
            name="companyRegNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label
                          htmlFor="registration-number"
                          className="flex items-center font-bold mb-2"
                        >
                          Company Registration Number{" "}
                          <Info className="ml-1 w-4 h-4" />
                        </Label>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your official company registration number</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    id="registration-number"
                    placeholder="Enter registration number"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription />
              </FormItem>
            )}
          />

          <div>
            <Label
              htmlFor="business-address"
              className="flex items-center font-bold"
            >
              Registered business address <Info className="ml-1 w-4 h-4" />
            </Label>
            {!useExistingAddress &&
            !businessInfoStore.useExistingBusinessAddress ? (
              <p
                className="text-xs text-blue-600 mt-1 mb-3 cursor-pointer"
                onClick={() => setShowAddressPopup(true)}
              >
                View all saved addresses
              </p>
            ) : (
              <p
                className="text-xs text-blue-600 mt-1 cursor-pointer"
                onClick={() => {
                  setUseExistingBusinessAddress(false);
                  setUseExistingAddress(false);
                }}
              >
                Add a new address
              </p>
            )}

            <div className="address-container">
              {useExistingAddress ||
              businessInfoStore.useExistingBusinessAddress ? (
                <Card className="mt-2 pt-4">
                  <CardContent>
                    {/* Display form here */}
                    {addressToUse && (
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p>{addressToUse?.address1},</p>
                              <p>
                                {addressToUse?.city}, {addressToUse?.state}
                                {addressToUse?.zip}
                              </p>
                              <p className="font-bold ">
                                {addressToUse?.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <>
                  <FormField
                    control={businessInfoForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <FormField
                      control={businessInfoForm.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              placeholder="ZIP / Postal code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={businessInfoForm.control}
                      name="apartment"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Apartment/building/suite/other"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={businessInfoForm.control}
                      name="addressLine"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input {...field} placeholder="Address Line 1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={businessInfoForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input {...field} placeholder="City/Town" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={businessInfoForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormControl>
                            <Input {...field} placeholder="State / Region" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500 mt-1"
                      // type="submit"
                      onClick={handleSaveAddress}
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <Label className="font-bold">Phone number for verification</Label>
            <RadioGroup defaultValue="existing">
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem
                  value="existing"
                  checked={!addNewMobileNumber}
                  id="existing"
                  onClick={() => {
                    setAddNewMobileNumber(false);
                    setUseExistingBusinessPhoneNumber(true);
                  }}
                />
                <Label htmlFor="existing">+2347069295882</Label>
              </div>
            </RadioGroup>

            <p
              className="text-xs text-blue-600 mt-2 cursor-pointer"
              onClick={() => {
                setAddNewMobileNumber(true);
                setUseExistingBusinessPhoneNumber(false);
              }}
            >
              Add a new mobile number
            </p>
          </div>
          {addNewMobileNumber && (
            <div className="grid grid-cols-3 gap-4 space-y-4 border border-gray-200 rounded-lg p-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="phone">Telephone number</Label>
                <div className="w-full grid grid-cols-6">
                  <FormField
                    control={businessInfoForm.control}
                    name="countryPhoneCode"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue="us"
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us">US +1</SelectItem>
                            <SelectItem value="uk">GB +44</SelectItem>
                            <SelectItem value="ca">CA +1</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={businessInfoForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-5 ">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            id="phone"
                            placeholder="Enter phone number"
                            className="flex-1 mt-0 w-full "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* <div className="space-y-2 flex items-end">
                <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                  Save
                </Button>
              </div> */}
            </div>
          )}
          <div>
            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 mt-1">
              Save Form and Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessInfoPage;
