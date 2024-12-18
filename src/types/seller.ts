export type AddressType = {
  address1: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type StepProps = {
  currentStep: number;
  stepsReached: number;
  onStepClick: (step: number) => void;
};

export type OnboardingStepProps = {
  index: number;
  handleStepClick: (step: number) => void;
  stage: string;
  stages: string[];
  stepsReached: number;
  currentStep: number;
};
