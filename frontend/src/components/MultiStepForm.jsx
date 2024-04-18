import React from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import PersonalDetails from "./PersonalDetails";

const steps = [
  { label: "PD" },
  { label: "QN" },
  { label: "WE" },
  { label: "DU" },
  { label: "PT" },
];

const MultiStepForm = () => {
  const { nextStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = useColorModeValue("blue.200", "blue.700");
  return (
    <Flex flexDir="column" width="100%">
      <Steps colorScheme="blue" activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Box sx={{ p: 8, bg, my: 8, rounded: "md" }}>
              <PersonalDetails moveToNext={nextStep} />
            </Box>
          </Step>
        ))}
      </Steps>
      {hasCompletedAllSteps && (
        <Box sx={{ my: 8, bg, p: 8, rounded: "md" }}>
          <Heading fontSize="xl" textAlign={"center"}>
            Woohoo! All steps completed! 🎉
          </Heading>
        </Box>
      )}
      <Flex width="100%" justify="flex-end" gap={4}>
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default MultiStepForm;