import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/organization/_auth/step-2')({
    component: StepTwo,
});

function StepTwo() {
    <>Step I am coming</>
}