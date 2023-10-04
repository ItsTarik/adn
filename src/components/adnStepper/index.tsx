import React, {
  PropsWithChildren,
  ReactChild,
  ReactComponentElement,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { StepperProgress } from "../stepper/shared";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import { Step3 } from "./steps/step3";
import { Step4 } from "./steps/step4";
import { Step5 } from "./steps/step5";

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
  STEP_4 = 4,
  STEP_5 = 5,
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

const Slider = ({ children }: { children: ReactElement[] }) => {
  const childrenArray = React.Children.toArray(children);
  const slidesWithIndex = childrenArray.reduce((acc, child, index) => {
    return [...acc, { ...child, props: { ...child.props, index } }];
  }, []);

  return <div className="flex overflow-hidden">{slidesWithIndex}</div>;
};

const Slide = ({
  children,
  index = 0,
}: {
  children: ReactNode;
  index?: number;
}) => {
  const { currentStep } = useContext(StepContext);
  const isActive = currentStep === index + 1;
  const percent = -(currentStep - 1) * 100;

  return (
    <div
      className="w-full shrink-0 border-dotted border-blue-200 border-2 transition-all duration-1000"
      style={{
        transform: `translateX(${percent}%)`,
        opacity: isActive ? 1 : 0,
        // display: Math.abs(currentStep - index) > 1 && "none",
      }}
    >
      {children}
    </div>
  );
};

const Stepper = () => {
  const [currentStep, setCurrentStep] = React.useState(StepsEnum.STEP_1);
  const [stepperState, setStepperState] = React.useState(stepperInitialValue);
  const [toggleAnimation, setToggleAnimation] = useState(false);

  return (
    <section className="flex flex-col space-y-3 border-4 border-lime-300 mb-2">
      <pre className="bg-slate-50 w-full">
        {/* {JSON.stringify(stepperState, null, 4)} */}
      </pre>
      <button onClick={() => setToggleAnimation((t) => !t)}>
        toggle animation
      </button>
      <StepContext.Provider
        value={{
          state: stepperState,
          currentStep,
          setCurrentStep,
          setStepperState,
        }}
      >
        <div className="spadce-y-2">
          <StepperProgress<StepsEnum>
            currentStep={currentStep}
            toggleAnimation={toggleAnimation}
          />
          <div className="bg-slate-200 rounded-sm m-4 p-4">
            <Slider>
              <Slide>
                <Step1 />
              </Slide>
              <Slide>
                <Step2 />
              </Slide>
              <Slide>
                <Step3 />
              </Slide>
              <Slide>
                <Step4 />
              </Slide>
              <Slide>
                <Step5 />
              </Slide>
            </Slider>
            {/* {currentStep === StepsEnum.STEP_1 && <Step1 />}
            {currentStep === StepsEnum.STEP_2 && <Step2 />}
            {currentStep === StepsEnum.STEP_3 && <Step3 />}
            {currentStep === StepsEnum.STEP_4 && <Step4 />}
            {currentStep === StepsEnum.STEP_5 && <Step5 />} */}
          </div>
        </div>
      </StepContext.Provider>
    </section>
  );
};

export default Stepper;
