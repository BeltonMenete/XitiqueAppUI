import ReactDOM from 'react-dom/client';
import 'ldrs/react/Ring2.css';
import { RouterProvider } from '@tanstack/react-router';
import { getRouter } from '#/router';
import '#/styles.css';

const router = getRouter();
const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<RouterProvider router={router} />);
}
