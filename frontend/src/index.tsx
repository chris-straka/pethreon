import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login, Create, Contribute } from "./pages"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./index.scss"

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
