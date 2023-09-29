import { useCallback, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StepContext, StepsEnum } from "..";

type Step1Data = { text: string };

export const Step1 = () => {
  const { setCurrentStep, setStepperState, state } = useContext(StepContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({ defaultValues: state.step1 });

  const onSubmit: SubmitHandler<Step1Data> = useCallback(
    (data) => {
      setStepperState((state) => ({ ...state, step1: data }));
      setCurrentStep(StepsEnum.STEP_2);
    },
    [setCurrentStep, setStepperState]
  );

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="text-white text-center">Step 1</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <input {...register("text", { required: true })} />
        {errors.text && (
          <span className="text-red-500">This field is required</span>
        )}

        <div className="inline-flex justify-around border w-fit space-x-3 self-end">
          <button
            className="border p-2"
            onClick={() => setCurrentStep(StepsEnum.STEP_1)}
          >
            prev
          </button>
          <button className="border p-2" type="submit">
            next
          </button>
        </div>
      </form>
    </div>
  );
};
