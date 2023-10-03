import { useContext } from "react";
import { StepContext, StepsEnum } from "..";

export const Step4 = () => {
  const { setCurrentStep } = useContext(StepContext);
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="text-center font-bold text-red-600">Step 4</div>
      <div className="inline-flex justify-around border w-fit space-x-3 self-end">
        <button
          className="border p-2"
          onClick={() => setCurrentStep(StepsEnum.STEP_3)}
        >
          prev
        </button>
        <button
          className="border p-2"
          onClick={() => setCurrentStep(StepsEnum.STEP_5)}
        >
          next
        </button>
      </div>
    </div>
  );
};
