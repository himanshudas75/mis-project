import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import PersonalDetails from './PersonalDetails';
import QualificationDetails from './QualificationDetails';
import WorkExperience from './WorkExperience';
import DocumentUpload from '../DocumentUpload';
import useAuth from '../hooks/useAuth';
import ApplicationCompleted from './ApplicationCompleted';

const steps = [
    { label: 'PD' },
    { label: 'QN' },
    { label: 'WE' },
    { label: 'DU' },
];

const MultiStepForm = () => {
    const { auth } = useAuth();
    const stepsReached = auth ? auth.steps : 0;

    console.log(auth);
    console.log(stepsReached);

    const { nextStep, reset, activeStep } = useSteps({
        initialStep: stepsReached,
    });
    const isLastStep = activeStep === steps.length - 1;
    const hasCompletedAllSteps = activeStep === steps.length;
    const bg = useColorModeValue('blue.200', 'blue.700');
    return (
        <Flex flexDir="column" width="100%">
            {/* <Steps colorScheme="blue" activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Box sx={{ p: 8, bg, my: 8, rounded: "md" }}>
              <PersonalDetails moveToNext={nextStep} />
            </Box>
            <Box>
              <QualificationDetails moveToNext={nextStep} />
            </Box>
          </Step>
        ))}
      </Steps> */}

            <Steps colorScheme="blue" activeStep={activeStep}>
                {/* personal details step */}
                <Step label={steps[0].label}>
                    <Box sx={{ p: 8, bg, my: 8, rounded: 'md' }}>
                        <PersonalDetails moveToNext={nextStep} />
                    </Box>
                </Step>

                {/* qualification details step */}
                <Step label={steps[1].label}>
                    <Box sx={{ p: 8, bg, my: 8, rounded: 'md' }}>
                        <QualificationDetails moveToNext={nextStep} />
                    </Box>
                </Step>

                {/* work experience step */}
                <Step label={steps[2].label}>
                    <Box sx={{ p: 8, bg, my: 8, rounded: 'md' }}>
                        <WorkExperience moveToNext={nextStep} />
                    </Box>
                </Step>

                {/* du step */}
                <Step label={steps[3].label}>
                    <Box sx={{ p: 8, bg, my: 8, rounded: 'md' }}>
                        <DocumentUpload moveToNext={nextStep} />
                    </Box>
                </Step>

                {/* pt step */}
                {/* <Step label={steps[4].label}>
                    <Box sx={{ p: 8, bg, my: 8, rounded: 'md' }}>
                        <QualificationDetails moveToNext={nextStep} />
                    </Box>
                </Step> */}
            </Steps>

            {hasCompletedAllSteps && (
                <Box sx={{ my: 8, bg, p: 8, rounded: 'md' }}>
                    <Heading fontSize="xl" textAlign={'center'}>
                        Woohoo! All steps completed! 🎉
                    </Heading>
                </Box>
            )}
            <Flex width="100%" justify="flex-end" gap={4}>
                {hasCompletedAllSteps ? <ApplicationCompleted /> : null}
            </Flex>
        </Flex>
    );
};

export default MultiStepForm;
