import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: SignUp,
});

function SignUp() {
  return (
    <div>
      <h1 className="text-4xl text-center">Inscreva-se</h1>
    </div>
  );
}
