import SignUp from "./components/SignUp"
import { Toaster } from "react-hot-toast"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignIn from "./components/SignIn"
function App() {
  const router = createBrowserRouter([

    {
      path: '/',
      element: <>
        <SignUp />
        <Toaster />
      </>
    },
    {
      path: 'signin',
      element: <>
        <SignIn />
        <Toaster />
      </>
    }

  ])
  return (

    <RouterProvider router={router} />



  )
}

export default App
