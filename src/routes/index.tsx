import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Olá, seja bem-vindo ao xitique</h1>
      <p className="mt-4 text-lg">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/Login"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
