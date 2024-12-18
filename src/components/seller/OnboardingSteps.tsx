type OnboardingStepsProps = {
  index: number;
  currentStep: number;
  stepsReached: number;
  stage: string;
  stages: string[];
  handleStepClick: (index: number) => void;
};

function OnboardingSteps({
  index,
  currentStep,
  stepsReached,
  stage,
  stages,
  handleStepClick,
}: OnboardingStepsProps) {
  return (
    <div
      key={index}
      className="flex items-center"
      onClick={() => handleStepClick(index + 1)}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          index + 1 === currentStep
            ? "bg-yellow-400 text-black"
            : "bg-gray-200 text-gray-500"
        } cursor-${stepsReached >= index + 1 ? "pointer" : "not-allowed"}`}
      >
        {index + 1}
      </div>
      <span className="text-xs text-start mt-2 pl-2 w-20">{stage}</span>{" "}
      {/* Increased width for text wrapping */}
      {index < stages.slice(1).length && (
        <div className="w-9 lg:w-8 h-0.5 bg-gray-200 mx-2"></div>
      )}
    </div>
  );
}

export default OnboardingSteps;
