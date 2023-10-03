import { twMerge } from "tailwind-merge";

export const StepperProgress = <T,>({ currentStep }: { currentStep: T }) => {
  return (
    <ul className="flex list-none justify-between relative overflow-hidden pl-0 before:content-[''] before:w-full before:h-1 before:absolute before:bg-[#495057] before:top-[50%] before:left-0 before:z-[-1]">
      {[...Array(5).keys()].map((_, index) => {
        return (
          <li
            className={twMerge(
              "whitespace-nowrap flex text-white font-bold rounded-full bg-slate-400 relative text-center w-20 h-20 justify-center items-center transition-all duration-700",
              currentStep === index + 1 && "bg-lime-400"
            )}
            key={index}
          >
            <button>
              <b>{index + 1}</b>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
