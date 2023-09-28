/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren } from "react";

import { StepWrapper } from "./StepWrapper";

export const Step = (props: any) => {
  const {
    component: StepComponent,
    name,
    title,
    stepIndex,
    indexes,
    progress,
    navigateToStep,
  } = props;

  return (
    <StepWrapper
      stepTitle={title}
      stepIndex={stepIndex}
      indexes={indexes}
      navigateToStep={navigateToStep}
      // showProgress={name !== "finalStep"}
      showProgress
      // stepsState={stepsState}
      progress={progress}
    >
      <StepComponent {...props} />
    </StepWrapper>
  );
};

export const MultiStep = ({ children }: PropsWithChildren) => children;
