import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signup")({
  component: Signup,
});


function Signup() {
    return (
        <div className="signup-page container">
            <h1 className="text-3xl">Sign Up</h1>
            <p>Welcome to our app!</p>
        </div>
    );
}