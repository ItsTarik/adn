import { twMerge } from "tailwind-merge";

export const StepperProgress = <T,>({
  currentStep,
  toggleAnimation,
}: {
  currentStep: T;
  toggleAnimation: boolean;
}) => {
  const nbr = 5;

  return (
    <ul
      className={twMerge(
        "flex list-none justify-between relative overflow-hidden pl-0",
        "before:content-[''] before:h-1 before:w-full before:absolute before:bg-[#495057] before:top-[50%] before:left-0 before:z-[-1] before:transition-all duration-[3000ms]",
        toggleAnimation &&
          "justify-center before:opacity-0 before:h-0 before:w-0"
        // !toggleAnimation && "before:w-full"
      )}
    >
      {[...Array(nbr).keys()].map((_, index) => {
        return (
          <li
            className={twMerge(
              "whitespace-nowrap border-8 border-blue-800 flex text-white font-bold rounded-full bg-slate-400 relative text-center w-20 h-20 justify-center items-center transition-all duration-[300ms]",
              currentStep === index + 1 && "bg-lime-400",
              toggleAnimation &&
                index > 0 &&
                "opacity-0 kw-0 jh-0 translakte-y-[100%] collapse text-blue-800"
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
