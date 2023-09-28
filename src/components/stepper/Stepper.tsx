/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useReducer } from "react";

import { parseSteps } from "./helpers";
import { twMerge } from "tailwind-merge";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_SUBMITTING":
      return { ...state, submitting: action.submitting };

    case "SET_SHOW_CONTROLS":
      return { ...state, showControls: action.showControls };

    case "SET_SUBMITTER":
      return { ...state, submitter: action.submitter, isValid: action.isValid };

    case "SET_ISVALID":
      return { ...state, isValid: action.isValid };

    default:
      throw new Error();
  }
}

const StepContext = React.createContext({
  setSubmitter: (submitter: any, isValid: boolean) => ({}),
  setShowControls: (v: boolean) => ({}),
  currentStep: 0,
});

export const SubmitArea = function (props: any) {
  const ctx = React.useContext(StepContext);
  const { submitter, isValid, noControl, children } = props;

  React.useEffect(() => {
    ctx.setSubmitter(submitter, isValid);
    noControl && ctx.setShowControls(true);
    return () => ctx.setShowControls(true);
  }, [ctx.currentStep, isValid]);

  return children;
};

const Stepper = (props: any) => {
  const [currentStep, setCurrentStep] = React.useState(
    props.startWithStep || 0
  );
  const navigateToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };
  const nextStep = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1);
  }, []);

  const previousStep = () => setCurrentStep((currentStep) => currentStep - 1);

  React.useEffect(() => {
    props.persistCurrentStep(currentStep);
  }, [currentStep]);

  React.useEffect(() => {
    setSubmitting(false);
  }, [currentStep]);

  const [state, dispatch] = useReducer(reducer, {
    isValid: false,
    submitting: false,
    showControls: true,
    submitter: () => ({}),
  });

  const setSubmitting = (submitting) =>
    dispatch({ type: "SET_SUBMITTING", submitting });

  const setSubmitter = (submitter, isValid) =>
    dispatch({ type: "SET_SUBMITTER", submitter, isValid });

  const setShowControls = (showControls) =>
    dispatch({ type: "SET_SHOW_CONTROLS", showControls });

  const { nodes: steps } = parseSteps(props, {
    nextStep,
    navigateToStep,
    SubmitArea,
  });

  const stepsCount = steps.length;

  const getNextButtonProps = (stepName) => {
    const label =
      {
        "step3-1": "Suivant (étape 4)",
        "step4-1": "Valider le projet",
      }[stepName] || "Suivant";
    return {
      label,
      borderless: stepName === "step4-1",
      black: stepName !== "step4-1",
    };
  };

  const renderStepControl = (submitting) => {
    if (!state.showControls) return null;
    const isThereMoreSteps = currentStep + 1 < stepsCount || !submitting;

    const stepName = steps?.currentStep?.props?.name;

    const { label, borderless, black } = getNextButtonProps(stepName);

    return (
      <div className="fixed right-3 bottom-2 flex">
        <div className="mr-3">
          <button
            className={twMerge(
              "text-white rounded-sm border-white p-1 border-2",
              currentStep === 0 && "cursor-not-allowed"
            )}
            onClick={previousStep}
            disabled={currentStep === 0}
          >
            Précédent
          </button>
        </div>

        <div className="mr-6">
          <button
            className={twMerge(
              "text-white rounded-sm border-white p-1 border-2",
              !isThereMoreSteps && "cursor-not-allowed"
            )}
            onClick={async () => {
              if (stepName === "step3-1") {
                return navigateToStep(11);
              }
              state.submitter();
              state.isValid && setSubmitting(true);
            }}
            disabled={!isThereMoreSteps}
            id={borderless ? "validate" : null}
          >
            {submitting && <i className="spinner" />}
            {label}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="flex border-4 border-lime-300 mb-2">
      <StepContext.Provider value={{ setSubmitter, setShowControls }}>
        {steps[currentStep]}
      </StepContext.Provider>
      {renderStepControl(state.submitting)}
      {/* {currentStep + 1 !== steps.length && renderStepControl(state.submitting)} */}
    </section>
  );
};

export default Stepper;
