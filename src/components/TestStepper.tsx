/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useCallback, useReducer } from "react";
import Stepper, { SubmitArea } from "./stepper/Stepper";
import { MultiStep, Step } from "./stepper/Step";
import { useForm, SubmitHandler } from "react-hook-form";

export const StepperContext = createContext({});

function stepperReducer(state: any, action: any) {
  switch (action.type) {
    case "FUNDING_SOURCE_CHANGE":
      return { ...state, ...action.fragment };
    case "DX_ROLE_CHANGE":
      return { ...state, ...action.fragment };
    default:
      throw new Error();
  }
}

type Inputs = {
  example: string;
  exampleRequired: string;
};

const StepExp = ({ name, nextStep, ...rest }: { name: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (name === "finalStep") {
      return alert("end.");
    }
    nextStep();
  };

  return (
    <SubmitArea submitter={handleSubmit(onSubmit)} isValid={isValid}>
      <div className="space-y-2">
        <div className="text-yellow-400">{name}</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <input defaultValue="test" {...register("example")} />

          <input {...register("exampleRequired", { required: true })} />
          {errors.exampleRequired && (
            <span className="text-red-500">This field is required</span>
          )}
        </form>
      </div>
    </SubmitArea>
  );
};

export const TestStepper = () => {
  const [stepperState, dispatch] = useReducer(stepperReducer, {
    isFundingSourceDefined: false,
    isDxRoleLeader: false,
  });

  const setStepperState = useCallback((type, fragment) => {
    dispatch({ type, fragment });
  }, []);

  const persistCurrentStep = useCallback((projectId) => (stepIndex) => 0, []);
  return (
    <Stepper
      persistCurrentStep={persistCurrentStep("id")}
      startWithStep={0 || 0}
    >
      <MultiStep name="step1" title="Etape 1">
        <Step name="step1-1" component={StepExp} />
        <Step
          name="step1-2"
          component={StepExp}
          setStepperState={setStepperState}
        />
      </MultiStep>
      <MultiStep name="step2" title="Etape 2">
        <Step name="step2-1" component={StepExp} />
        <Step
          name="step2-2"
          component={StepExp}
          setStepperState={setStepperState}
        />
      </MultiStep>

      <Step name="finalStep" component={StepExp} />
    </Stepper>
  );
};
