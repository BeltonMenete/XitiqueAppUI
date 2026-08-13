import { AlertCircle, RefreshCw } from "lucide-react";
import { Component, type ReactNode } from "react";
import { Button } from "#/components/ui/Button";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: unknown) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
					<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<AlertCircle size={32} className="text-red-600" />
						</div>
						<h2 className="text-xl font-bold text-slate-900 mb-2">
							Ocorreu um erro
						</h2>
						<p className="text-sm text-slate-500 mb-6">
							Algo inesperado aconteceu. Por favor, tente novamente.
						</p>
						{this.state.error && (
							<details className="mb-6 text-left">
								<summary className="text-xs text-slate-400 cursor-pointer mb-2">
									Ver detalhes do erro
								</summary>
								<pre className="text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
									{this.state.error.message}
								</pre>
							</details>
						)}
						<Button
							onClick={this.handleReset}
							leftIcon={<RefreshCw size={16} />}
						>
							Tentar Novamente
						</Button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
