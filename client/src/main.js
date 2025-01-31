import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Board from './pages/Board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            {
                index: true,
                element: _jsx(Board, {})
            },
            {
                path: '/edit',
                element: _jsx(EditTicket, {})
            },
            {
                path: '/create',
                element: _jsx(CreateTicket, {})
            },
            {
                path: '/login',
                element: _jsx(Login, {})
            }
        ]
    }
]);
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(_jsx(RouterProvider, { router: router }));
}
