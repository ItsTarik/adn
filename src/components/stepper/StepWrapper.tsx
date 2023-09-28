/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { StepperContext } from "../TestStepper";
import classnames from "classnames";
import { twMerge } from "tailwind-merge";
const stepsNames = ["Carte ID", "Gouvernance", "Planning", "Risques et météo"];
const stepperWidth = 900;
const stepperPadding = 4;

const StepperProgress = ({
  className,
  stepIndex,
  indexes = {},
  navigateToStep,
  stepsState,
  progress,
}: any) => {
  return (
    <ul className="flex list-none justify-between relative overflow-hidden pl-0 before:content-[''] before:w-full before:h-1 before:absolute before:bg-[#495057] before:top-[50%] before:left-0 before:z-[-1]">
      {[...Array(3).keys()].map((stepTitle, index) => {
        const isDisabled = false;
        const isActive = index === stepIndex;
        const isFull = stepIndex > index;

        return (
          <li
            className={twMerge(
              "whitespace-nowrap text-white font-bold py-[0.7rem] px-[0.375rem] rounded bg-slate-400 relative text-center w-20 border-transparent last:mr-0 first:before:content-[none]",
              isActive &&
                "after:w-[50%] after:transition-all after:duration-700 after:content-[''] after:h-2 after:absolute after:bg-[#ce6483] after:left-0 after:bottom-0 after:rounded-bl last:after:content-[none]",
              isFull &&
                "bg-[#7cca8f] after:w-[100%] after:transition-all after:duration-700 after:content-[''] after:h-2 after:absolute after:bg-[#ce6483] after:left-0 after:bottom-0 after:rounded-bl after:rounded-br"
            )}
            key={index}
          >
            <span></span>
            <button
              onClick={() => {
                return indexes[index] || indexes[index] === 0
                  ? navigateToStep(indexes[index])
                  : undefined;
              }}
              disabled={isDisabled}
              {...(isDisabled ? { style: { cursor: "not-allowed" } } : {})}
            >
              <b>{index + 1}</b>
              {/* <span>{stepTitle}</span> */}
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
  <div className="w-full p-3 space-y-2" style={{ paddingBottom: "4rem" }}>
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

    <div className="text-white font-bold">{stepTitle}</div>
    <div className="border-2 border-dashed border-yellow-300 p-4 mt-3">
      {children}
    </div>
  </div>
);
