import { useContext } from "react";
import { StepContext, StepsEnum } from "..";

export const Step1 = () => {
  const { setCurrentStep } = useContext(StepContext);
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="text-center font-bold text-red-600">Step 1</div>
      <div className="inline-flex justify-around border w-fit space-x-3 self-end">
        <button className="border p-2 cursor-not-allowed" disabled>
          prev
        </button>
        <button
          className="border p-2"
          onClick={() => setCurrentStep(StepsEnum.STEP_2)}
        >
          next
        </button>
      </div>
    </div>
  );
};
