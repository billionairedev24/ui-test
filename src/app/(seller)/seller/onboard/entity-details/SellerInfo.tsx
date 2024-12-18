"use client";
import { isEqual } from "lodash";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SellerInfoForm,
  SellerInfoFormValidator,
} from "@/lib/validators/SellerInfoBioValidators";
import { countries } from "@/components/util/DOB_Util";
import { useSellerInfoStore } from "@/app/store/sellerOnboardStore/sellerInfoStore";
import React, { SetStateAction, useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

import AddressToUseType from "./page";
import { AddressType } from "@/types/seller";

interface SellerInfoPageProps {
  setShowAddressPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNext: React.Dispatch<React.SetStateAction<boolean>>;
  existingSellerAddress: boolean;
  setExistingSellerAddress: React.Dispatch<React.SetStateAction<boolean>>;
  addressToUse: AddressType | undefined;
  setAddressToUse: React.Dispatch<SetStateAction< AddressType | undefined>>;
}
function SellerInfo({
  setShowAddressPopup,
  setShowNext,
  existingSellerAddress,
  setExistingSellerAddress,
  addressToUse,
  setAddressToUse,
}: SellerInfoPageProps) {
  const sellerInfoStore = useSellerInfoStore((state) => state.sellerInfo);
  const setSellerInfoStore = useSellerInfoStore(
    (state) => state.setSellerInfoStore
  );
  const setUseExistingSellerAddress = useSellerInfoStore(
    (state) => state.setUseExistingSellerAddress
  );
  const sellerInfoForm = useForm<SellerInfoFormValidator>({
    resolver: zodResolver(SellerInfoForm),
    defaultValues: sellerInfoStore,
  });

  const watchedValues = sellerInfoForm.watch();

  // Ref to store previous watched values
  const prevWatchedValues = useRef(watchedValues);

  useEffect(() => {
    // Compare current values to previous ones to avoid unnecessary re-renders
    if (!isEqual(prevWatchedValues.current, watchedValues)) {
      setSellerInfoStore(watchedValues);
      prevWatchedValues.current = watchedValues; // Update the previous values reference
    }
  }, [watchedValues, setSellerInfoStore]);

  const onsubmit = (values: SellerInfoFormValidator) => {
    // TODO: Save to DB here
    setSellerInfoStore(values);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    // showNext() to be called on successful save to DB
    setShowNext(true);
  };
  useEffect(() => {
    sellerInfoForm.reset(sellerInfoStore);
    setAddressToUse({
      address1: "123  St",
      apartment: "24mmm",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    });
  }, [sellerInfoForm, sellerInfoStore]);
  return (
    <Form {...sellerInfoForm}>
      <form onSubmit={sellerInfoForm.handleSubmit(onsubmit)}>
        <div className="space-y-4 border border-gray-200 rounded-lg p-4 mt-4">
          <h2 className="text-xl font-bold">Primary Contact Person</h2>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-4 xl:items-center">
            <FormField
              control={sellerInfoForm.control}
              name="fName"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel htmlFor="seller-first-name">First Name</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      id="seller-first-name"
                      placeholder="Enter your First name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sellerInfoForm.control}
              name="mName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="seller-first-name">
                    Middle Name (optional)
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      id="seller-middle-name"
                      placeholder="Enter your middle name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sellerInfoForm.control}
              name="lName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="seller-first-name">Last Name</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      id="seller-last-name"
                      placeholder="Enter your last name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={sellerInfoForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="seller-email"> Email Address</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      id="seller-last-name"
                      placeholder="Enter your email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={sellerInfoForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className=" md:col-span-2 ">
                  <FormLabel htmlFor="seller-phone"> Phone Number</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      id="seller-phone"
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Enter your complete name as it appears on the passport or ID{" "}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-1 md:gap-5 items-base">
            <FormField
              control={sellerInfoForm.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full gap-1 items-center">
                  <FormLabel className=" w-1/2 mt-[8px]">
                    Country of Residence
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="US">
                    <FormControl className=" col-span-5 w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>{" "}
                    <SelectContent>
                      {countries.map((eachCountry, index) => (
                        <SelectItem value={eachCountry?.code} key={index}>
                          {eachCountry?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={sellerInfoForm.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-start">
                  <FormLabel className="mt-[8.5px] flex  items-center gap-2 col-span-2">
                    Date of birth
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }

                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="residence">
            <Label htmlFor="residence">Residential Address</Label>
            {!existingSellerAddress &&
            !sellerInfoStore.useExistingSellerAddress ? (
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
                  setExistingSellerAddress(false);
                  setUseExistingSellerAddress(false);
                }}
              >
                Add a new address
              </p>
            )}
            {existingSellerAddress ||
            sellerInfoStore.useExistingSellerAddress ? (
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
                  control={sellerInfoForm.control}
                  name="residenceCountry"
                  render={({ field }) => (
                    <FormItem>
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
                    control={sellerInfoForm.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
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
                    control={sellerInfoForm.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem>
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
                    control={sellerInfoForm.control}
                    name="addressLine"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Address Line 1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sellerInfoForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="City/Town" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sellerInfoForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="State / Region" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                    Save
                  </Button>
                </div>
              </>
            )}
          </div>

          <div>
            <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 mt-1">
              Save Form and Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SellerInfo;
