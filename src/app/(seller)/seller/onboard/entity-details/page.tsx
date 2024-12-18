"use client";

import { useRef, useState } from "react";
import { useBusinessTypeStore } from "@/app/store/sellerOnboardStore/businessTypeStore";
import { useOnboardingFlow } from "@/app/hooks/useOnboardFlow";
import { useAddressManagement } from "@/app/hooks/useAddressManagement";
import BusinessInfoPage from "@/app/(seller)/seller/onboard/entity-details/BusinessInfoPage";
import SellerInfo from "./SellerInfo";
import WhatToExpectPage from "./SellerInfo-SubPages/WhatToExpectPage";
import VerifyBank from "./SellerInfo-SubPages/VerifyBank";
import PendingBankVerification from "./SellerInfo-SubPages/PendingBankVerification";
import CardForPayment from "./SellerInfo-SubPages/CardForPayment";
import OnboardingSteps from "@/components/seller/OnboardingSteps";
import AddressDialog from "@/components/seller/AddressDialog";
import OnboardingNavigation from "@/components/seller/onboardingNavigation";
import BusinessInformationPage from "../page";
import EntityDetailsFaq from "@/components/seller/entityDetailsFaq";

export default function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [addNewMobileNumber, setAddNewMobileNumber] = useState(false);
  const [isBusinessInfoExpanded, setIsBusinessInfoExpanded] = useState(true);
  const businessType = useBusinessTypeStore((state) => state.businessType);
  const {
    currentStep,
    stepsReached,
    sellerSubPageStep,
    showNext,
    stages,
    handleNext,
    handlePrev,
    handleStepClick,
    setShowNext,
  } = useOnboardingFlow();

  const {
    showAddressPopup,
    setShowAddressPopup,
    addressToUse,
    setAddressToUse,
    useExistingAddress,
    existingSellerAddress,
    addresses,
    handleSavedAddress,
    handleUseAddress,
    setUseExistingAddress,
    setExistingSellerAddress,
  } = useAddressManagement();

  const scrollToTop = () => {
    setTimeout(() => {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNextWithScroll = () => {
    handleNext();
    scrollToTop();
  };

  const handlePrevWithScroll = () => {
    handlePrev();
    scrollToTop();
  };

  const renderCurrentStep = () => {
    if (
      businessType === "business" &&
      currentStep === 1 &&
      isBusinessInfoExpanded
    ) {
      return (
        <BusinessInfoPage
          formRef={formRef}
          setAddressToUse={setAddressToUse}
          addNewMobileNumber={addNewMobileNumber}
          setAddNewMobileNumber={setAddNewMobileNumber}
          setShowAddressPopup={setShowAddressPopup}
          useExistingAddress={useExistingAddress}
          setUseExistingAddress={setUseExistingAddress}
          addressToUse={addresses[1]}
          setShowNext={setShowNext}
        />
      );
    }

    if (
      (currentStep === 2 && businessType === "business") ||
      (currentStep === 1 && businessType === "individual")
    ) {
      switch (sellerSubPageStep) {
        case 0:
          return (
            <SellerInfo
              setAddressToUse={setAddressToUse}
              setShowAddressPopup={setShowAddressPopup}
              setShowNext={setShowNext}
              existingSellerAddress={existingSellerAddress}
              setExistingSellerAddress={setExistingSellerAddress}
              addressToUse={addresses[2]}
            />
          );
        case 1:
          return <WhatToExpectPage />;
        case 2:
          return <VerifyBank setShowNext={setShowNext} />;
        case 3:
          return <PendingBankVerification />;
        case 4:
          return <CardForPayment setShowNext={setShowNext} />;
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div className="container h-[80dvh] overflow-x-hidden grid grid-cols-1 xl:grid-cols-3 gap-8 mx-auto p-6 xl:p-0 xl:px-6 bg-gray-100/95 rounded-md pb-0 xl:pb-6">
      <div className="w-full flex flex-col xl:col-span-2 xl:overflow-y-scroll xl:my-6">
        <div ref={scrollRef} className="flex items-center w-full py-5 xl:py-0">
          <div className="flex overflow-x-scroll xl:overflow-x-visible w-full">
            {stages.map((stage, index) => (
              <OnboardingSteps
                key={stage}
                index={index}
                handleStepClick={handleStepClick}
                stage={stage}
                stages={stages}
                stepsReached={stepsReached}
                currentStep={currentStep}
              />
            ))}
          </div>
        </div>

        <div className="pb-4">{renderCurrentStep()}</div>

        <OnboardingNavigation
          currentStep={currentStep}
          totalSteps={stages.length}
          showNext={showNext}
          onPrev={handlePrevWithScroll}
          onNext={handleNextWithScroll}
        />
      </div>

      <EntityDetailsFaq />

      <AddressDialog
        open={showAddressPopup}
        onOpenChange={setShowAddressPopup}
        addresses={addresses}
        onAddressSelect={handleSavedAddress}
        onUseAddress={handleUseAddress}
      />
    </div>
  );
}
