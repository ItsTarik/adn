/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { StepperContext } from "../TestStepper";
import classnames from "classnames";

const stepsNames = ["Carte ID", "Gouvernance", "Planning", "Risques et météo"];

const StepperProgress = ({
  className,
  stepIndex,
  indexes = {},
  navigateToStep,
  stepsState,
  progress,
}: any) => {
  console.log("progress", progress);
  return (
    <ul className="flex list-none justify-start relative overflow-hidden pl-0 before:content-[''] before:w-full before:h-1 before:absolute before:bg-[#495057] before:top-[50%] before:left-0 before:z-[-1]">
      {[...Array(4).keys()].map((stepTitle, index) => {
        const isDisabled = false;
        const isActive = index === stepIndex;
        const isFull = stepIndex >= index;

        return (
          <li
            className={classnames(
              "whitespace-nowrap py-[0.7rem] px-[0.375rem] rounded bg-slate-400 relative text-center w-[16%] mr-[12%] border-transparent last:mr-0 after:content-[''] after:h-2 after:absolute after:bg-[#7cca8f] after:left-full after:top-[50%] after:mt-[-2px] last:after:content-[none] first:before:content-[none]",
              {
                "bg-[#7cca8f]": isActive,
                [`after:w-[${"100"}%]`]: isFull,
                // [`after:w-[${progress}%]`]: isFull,
                // "after:w-[60%]": isActive,
              }
            )}
            key={index}
          >
            <button
              onClick={() => {
                return indexes[index] || indexes[index] === 0
                  ? navigateToStep(indexes[index])
                  : undefined;
              }}
              disabled={isDisabled}
              {...(isDisabled ? { style: { cursor: "not-allowed" } } : {})}
            >
              <b>{index + 1}.</b>
              <span>{stepTitle}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

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
  <div className="w-full p-3" style={{ paddingBottom: "4rem" }}>
    {showProgress && (
      <React.Fragment>
        <div className="p-3 text-center">Stepper Header</div>
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
    <div className="border-2 border-dashed border-yellow-300 p-4 mt-3">
      {children}
    </div>
  </div>
);
