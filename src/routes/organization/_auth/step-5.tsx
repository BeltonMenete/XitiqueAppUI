import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/organization/_auth/step-5')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/organization/_auth/step-5"!</div>
}
