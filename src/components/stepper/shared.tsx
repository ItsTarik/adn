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
        "flex list-none justify-center relative overflow-hidden pl-0 space-x-20 ease-in",
        toggleAnimation && "before:opacity-0 before:h-0 before:w-0 space-x-0"
      )}
    >
      {[...Array(nbr).keys()].map((_, index) => {
        return (
          <li
            className={twMerge(
              "whitespace-nowrap p-2 relative bkorder-8 border-blue-800 flex text-white font-bold rounded-full bg-blue-800 text-center w-20 h-20 justify-center items-center transition-all duration-[300ms]",
              "after:content-[''] after:h-1 after:w-full after:absolute after:bg-gray-500 after:top-[50%] after:right-full after:z-[-1] after:first:hidden",
              toggleAnimation && index > 0 && "collapse"
            )}
            key={index}
          >
            <div
              className={twMerge(
                "flex bg-red-800 w-full h-full rounded-full justify-center items-center transition-all duration-[300ms]",
                currentStep === index + 1 && "bg-lime-400",
                toggleAnimation && index > 0 && "bg-blue-800 text-blue-800"
              )}
            >
              <button className="z-50">
                <b>{index + 1}</b>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
