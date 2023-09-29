import { useContext } from "react";
import { StepContext, StepsEnum } from "..";

export const Step2 = () => {
  const { setCurrentStep } = useContext(StepContext);
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="text-white text-center">Step 2</div>
      <div className="inline-flex justify-around border w-fit space-x-3 self-end">
        <button
          className="border p-2"
          onClick={() => setCurrentStep(StepsEnum.STEP_1)}
        >
          prev
        </button>
        <button
          className="border p-2"
          onClick={() => setCurrentStep(StepsEnum.STEP_3)}
        >
          next
        </button>
      </div>
    </div>
  );
};
