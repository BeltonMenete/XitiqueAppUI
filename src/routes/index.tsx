import { createFileRoute, Link } from "@tanstack/react-router";
import { AppButton } from "#/components/ui/AppButton";
import { APP_NAME, APP_TAGLINE } from "#/lib/constants";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="text-center space-y-8">
				<div>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
						Bem-vindo a {APP_NAME}
					</h1>
					<p className="text-lg text-gray-600">{APP_TAGLINE}</p>
				</div>

				<div>
					<Link to="/login">
						<AppButton type="button">Entrar</AppButton>
					</Link>
				</div>
			</div>
		</div>
	);
}
