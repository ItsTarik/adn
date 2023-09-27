/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const StepperProgress = (props: any) => <div>StepperProgress</div>;

export const StepWrapper = ({
  children,
  stepTitle,
  stepIndex,
  indexes,
  navigateToStep,
  showProgress,
  stepsState,
  progress,
  create,
}: any) => (
  <div className="step-wrapper" style={{ paddingBottom: "4rem" }}>
    {showProgress && (
      <React.Fragment>
        <div>Stepper Header</div>
        <StepperProgress
          className="stepper"
          stepIndex={stepIndex}
          indexes={indexes}
          navigateToStep={navigateToStep}
          stepsState={stepsState}
          progress={progress}
        />
      </React.Fragment>
    )}

    <div className="todo">{stepTitle}</div>
    {children}
  </div>
);
