import { useOnboardingFlow } from "@/app/hooks/useOnboardFlow";
import { useBusinessTypeStore } from "@/app/store/sellerOnboardStore/businessTypeStore";
import { Button } from "@/components/ui/button";

type OnboardingNavigationProps = {
  currentStep: number;
  totalSteps: number;
  showNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export default function OnboardingNavigation({
  currentStep,
  totalSteps,
  showNext,
  onPrev,
  onNext,
}: OnboardingNavigationProps) {
  const businessType = useBusinessTypeStore((state) => state.businessType);
  const { sellerSubPageStep } = useOnboardingFlow();
  
  return (
    <div className="flex justify-end px-4 w-full max-w-[1440px]">
      <div className="btns flex gap-2">
        {businessType === "individual" &&
          currentStep >= 1 &&
          sellerSubPageStep > 0 && (
            <Button
              className="bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={onPrev}
            >
              Previous
            </Button>
          )}
        {businessType === "business" && currentStep > 1 && (
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={onPrev}
          >
            Previous
          </Button>
        )}
        <Button
          disabled={!showNext}
          className="bg-yellow-400 text-black hover:bg-yellow-500"
          onClick={onNext}
        >
          {currentStep === totalSteps ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
