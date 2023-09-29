import React from "react";
import { StepperProgress } from "../stepper/shared";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import { Step3 } from "./steps/step3";

type Steps = {
  step1: {
    text: string;
  };
  step2: {
    text: string;
  };
  step3: {
    text: string;
  };
};

export enum StepsEnum {
  STEP_1 = 1,
  STEP_2 = 2,
  STEP_3 = 3,
}

const stepperInitialValue = {
  step1: { text: "" },
  step2: { text: "" },
  step3: { text: "" },
};

export const StepContext = React.createContext<{
  currentStep: StepsEnum;
  state: Steps;
  setCurrentStep: React.Dispatch<React.SetStateAction<StepsEnum>>;
  setStepperState: React.Dispatch<React.SetStateAction<Steps>>;
}>({
  state: stepperInitialValue,
  currentStep: StepsEnum.STEP_1,
  setCurrentStep: () => ({}),
  setStepperState: () => ({}),
});

const Stepper = () => {
  const [currentStep, setCurrentStep] = React.useState(StepsEnum.STEP_1);
  const [stepperState, setStepperState] = React.useState(stepperInitialValue);

  return (
    <section className="flex flex-col space-y-3 border-4 border-lime-300 mb-2">
      <pre className="bg-slate-50 w-full">
        {JSON.stringify(stepperState, null, 4)}
      </pre>
      <StepContext.Provider
        value={{
          state: stepperState,
          currentStep,
          setCurrentStep,
          setStepperState,
        }}
      >
        <div className="space-y-2">
          <StepperProgress<StepsEnum> currentStep={currentStep} />
          {currentStep === StepsEnum.STEP_1 && <Step1 />}
          {currentStep === StepsEnum.STEP_2 && <Step2 />}
          {currentStep === StepsEnum.STEP_3 && <Step3 />}
        </div>
      </StepContext.Provider>
    </section>
  );
};

export default Stepper;
