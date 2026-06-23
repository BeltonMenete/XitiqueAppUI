import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/organization/_auth/step-2')({
    component: StepTwo,
});

function StepTwo() {
    return (
        <>
            <h1>Step 2 is coming...</h1>
        </>
    );
}
