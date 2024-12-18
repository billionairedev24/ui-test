import { useState } from "react";
import { AddressType } from "@/types/seller";
import { useBusinessInfoStore } from "@/app/store/sellerOnboardStore/businessInfoStore";
import { useSellerInfoStore } from "@/app/store/sellerOnboardStore/sellerInfoStore";

const DEFAULT_ADDRESSES: AddressType[] = [
  {
    address1: "123 St",
    apartment: "24mmm",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
  },
  {
    address1: "123 Main St",
    apartment: "Apt 4",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
  },
  {
    address1: "mumumul Main St",
    apartment: "24mmm",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
  },
];

export const useAddressManagement = () => {
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [addressToUse, setAddressToUse] = useState<AddressType>();
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [existingSellerAddress, setExistingSellerAddress] = useState(false);
  const [addresses] = useState<AddressType[]>(DEFAULT_ADDRESSES);

  const setUseBusinessExistingAddress = useBusinessInfoStore(
    (state) => state.setUseExistingBusinessAddress
  );
  const setUseExistingSellerAddress = useSellerInfoStore(
    (state) => state.setUseExistingSellerAddress
  );

  const handleSavedAddress = (index: number) => {
    setAddressToUse(addresses[index]);
  };

  const handleUseAddress = () => {
    setShowAddressPopup(false);
    setUseExistingAddress(true);
    setUseBusinessExistingAddress(true);
    setExistingSellerAddress(true);
    setUseExistingSellerAddress(true);
  };

  return {
    showAddressPopup,
    setShowAddressPopup,
    addressToUse,
    useExistingAddress,
    existingSellerAddress,
    addresses,
    setAddressToUse,
    handleSavedAddress,
    handleUseAddress,
    setUseExistingAddress,
    setExistingSellerAddress,
  };
};
