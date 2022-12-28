import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login } from "./pages/Login/Login";
import { Create } from './pages/Create/Create'
import { Contribute } from './pages/Contribute/Contribute'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/** 
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'contribute',
    element: <Contribute />
  },
  {
    path: 'create',
    element: <Create />,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
