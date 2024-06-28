import { Button } from "@/components/ui/button"
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import LinkPage from "./pages/LinkPage";
import Redirect from "./pages/Redirect";
import ProtectedRoute from "./components/ProtectedRoute";

const appRouter=createBrowserRouter([{
  path:"/",
  element:<AppLayout/>,
  children:[
    {
      path:"/",
      element:<LandingPage/>
    },
    {
      path:"/auth",
      element:<Auth/>
    },{
      path:"/dashboard",
      element:<ProtectedRoute>
        <DashBoard/>
      </ProtectedRoute>

    },{
      path:"/link/:id",
      element:<LinkPage/>
    },{
      path:"/:id",
      element:<Redirect/>

    }
  ]
}])

function App() {
  

  return <RouterProvider router={appRouter}/>
}

export default App
