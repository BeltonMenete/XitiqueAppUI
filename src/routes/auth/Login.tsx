import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/Login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-50">
      <div className="flex">
        <div>
          <p>Our login </p>
        </div>
        <div className="right-section">LOGO</div>
      </div>
    </div>
  );
}
