import { useState, useCallback } from "react";
import { useBusinessTypeStore } from "@/app/store/sellerOnboardStore/businessTypeStore";
import { useSellerSubPageSteps } from "../store/sellerOnboardStore/sellerSubPageStepsStore";

export const useOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsReached, setStepsReached] = useState(1);
  // const [sellerSubPageStep, setSellerSubPageStep] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const businessType = useBusinessTypeStore((state) => state.businessType);
  const sellerSubPageStep = useSellerSubPageSteps(
    (state) => state.sellerSubPageStep
  );
  const incSellerSubPageStep = useSellerSubPageSteps(
    (state) => state.incSellerSubPageStep
  );
  const decSellerSubPageStep = useSellerSubPageSteps(
    (state) => state.decSellerSubPageStep
  );
  const resetSellerSubSteps = useSellerSubPageSteps(
    (state) => state.resetSellerSubSteps
  );

  const stages =
    businessType === "business"
      ? [
          "Business information",
          "Seller information",
          "Billing",
          "Store",
          "Verification",
        ]
      : ["Seller information", "Billing", "Store", "Verification"];

  const checkSubStep = (step: number) => {
    const allowNextSteps = [1, 3];
    setShowNext(allowNextSteps.includes(step));
    return allowNextSteps.includes(step);
  };

  const businessTypeAndStep =
    (businessType === "business" &&
      currentStep === 2 &&
      sellerSubPageStep < 4) ||
    (businessType === "individual" &&
      currentStep === 1 &&
      sellerSubPageStep < 4);

  const handleNext = () => {
    if (businessTypeAndStep) {
      // for substeps
      checkSubStep(sellerSubPageStep + 1);
      incSellerSubPageStep();
    } else {
      // base case what handle Next should do
      setCurrentStep((prev) => prev + 1);
      if (currentStep === stepsReached) {
        setStepsReached((prev) => prev + 1);
        setShowNext(false);
        return;
      } else if (currentStep < stepsReached - 1) {
        //if used nav steping, now nexting
        return setShowNext(true);
      } else {
        if (currentStep + 1 === 2) {
          // add a condition here incase we surpassed sub step already to make it pass
          const reachedSellerSubPage = sellerSubPageStep;
          if (sellerSubPageStep < reachedSellerSubPage) {
            return setShowNext(true);
          }
        }
        return (false && setShowNext(false)) || checkSubStep(sellerSubPageStep);
      }
    }
  };

  const handlePrev = () => {
    setShowNext(true);
    if (
      (currentStep === 1 && businessType === "individual") ||
      (currentStep === 2 && businessType === "business")
    ) {
      if (sellerSubPageStep > 0) {
        return decSellerSubPageStep();
      } else {
        if (currentStep === 1) return;
        setCurrentStep((prev) => prev - 1);
      }
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (step: number) => {
    if (step > stepsReached) return;
    setCurrentStep(step);
    if (step < stepsReached) {
      setShowNext(true);
    } else if (step === stepsReached) {
      if (step === 2) {
        checkSubStep(sellerSubPageStep);
        return;
      }
      setShowNext(false);
    }
  };
  return {
    currentStep,
    stepsReached,
    sellerSubPageStep,
    showNext,
    stages,
    handleNext,
    handlePrev,
    handleStepClick,
    setShowNext,
  };
};
