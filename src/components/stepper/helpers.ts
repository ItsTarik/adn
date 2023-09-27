/* eslint-disable @typescript-eslint/no-explicit-any */
import { Step, MultiStep } from "./Step";

const forceArary = (obj: any) => (Array.isArray(obj) ? obj : [obj]);

export const parseSteps = (
  stepperProps,
  { nextStep, navigateToStep, SubmitArea }
) => {
  const { children } = stepperProps;

  const filteredSteps = children.reduce((stepsAcc, element) => {
    if (element.type === Step) {
      const { props } = element;
      if (!props.hideStep) {
        return [...stepsAcc, element];
      }
      return stepsAcc;
    }
    if (element.type === MultiStep) {
      const { children } = element.props;
      const filteredChildren = forceArary(children).reduce(
        (msStepsAcc, child) => {
          if (!child.props.hideStep) {
            return [...msStepsAcc, child];
          }
          return msStepsAcc;
        },
        []
      );
      return [
        ...stepsAcc,
        {
          ...element,
          props: { ...element.props, children: filteredChildren },
        },
      ];
    }
    return stepsAcc;
  }, []);

  const flattenedSteps = filteredSteps.reduce(
    (acc, element, index) => {
      if (element.type === Step) {
        const { props } = element;
        return {
          nodes: [
            ...acc.nodes,
            {
              ...element,
              props: {
                ...props,
                nextStep,
                key: props.name,
                stepIndex: index,
                SubmitArea,
                navigateToStep,
              },
            },
          ],

          flattenedStepsIndexes: {
            indexes: [
              ...acc.flattenedStepsIndexes.indexes,
              acc.flattenedStepsIndexes.nextStepIndex,
            ],
            nextStepIndex: acc.flattenedStepsIndexes.nextStepIndex + 1,
          },
        };
      }
      if (element.type === MultiStep) {
        const { name: parentStep, children, title } = element.props;

        return {
          nodes: [
            ...acc.nodes,
            ...children.reduce((msAcc, child, childIndex) => {
              return [
                ...msAcc,
                {
                  ...child,
                  props: {
                    ...child.props,
                    parentStep,
                    nextStep,
                    title: `${title}${
                      children.length > 1
                        ? ` (${childIndex + 1}/${children.length})`
                        : ""
                    }`,
                    progress: ((childIndex + 1) / children.length) * 100,
                    key: child.props.name,
                    stepIndex: index,
                    SubmitArea,
                    navigateToStep,
                  },
                },
              ];
            }, []),
          ],
          flattenedStepsIndexes: {
            indexes: [
              ...acc.flattenedStepsIndexes.indexes,
              acc.flattenedStepsIndexes.nextStepIndex,
            ],
            nextStepIndex:
              acc.flattenedStepsIndexes.nextStepIndex + children.length,
          },
        };
      }

      return acc;
    },
    { nodes: [], flattenedStepsIndexes: { indexes: [], nextStepIndex: 0 } }
  );
  return {
    ...flattenedSteps,
    nodes: flattenedSteps.nodes.reduce(
      (acc, node) => [
        ...acc,
        {
          ...node,
          props: {
            ...node.props,
            indexes: flattenedSteps.flattenedStepsIndexes.indexes,
          },
        },
      ],
      []
    ),
  };
};

export const initGovernanceState = false;
