import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Auth/Login.tsx'
import Register from './Auth/Register.tsx'
import ProtectedRoute from './ProtectedRoute.tsx' // import ProtectedRoute

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute isAuth={true} target="/login"><App /></ProtectedRoute>
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)