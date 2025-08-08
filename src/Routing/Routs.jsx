import { createBrowserRouter, Navigate } from "react-router";
import Home from "../Pages/Home";
import MainPage from "../MainPage";
import AddEquipment from "../Pages/AddEquipment";
import LogIn from "../Pages/LogIn";
import Register from "../Pages/Register";
import AllEquipments from "../Pages/AllEquipments";
import MyEquipment from "../Pages/MyEquipment";
import CategoryItems from "../Components/CategoryItems";
import SpetialRout from "./SpetialRout";
import UpdateEquipment from "../Pages/UpdateEquipment";
import ErrorPage from "../Pages/ErrorPage";

const rout = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Navigate to={"/Home"} replace />,
      },
      {
        path: "/Home",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to={"/Home/fitness"} replace />,
          },
          {
            path: "/Home/:category",
            element: <CategoryItems />,
            loader: ({ params }) =>
              fetch(
                `https://sport-store-server-bxc4.onrender.com/allItems/category/${params.category}`
              ),
          },
        ],
      },
      {
        path: "/sports-equipment",
        element: (
          <SpetialRout>
            <AllEquipments />
          </SpetialRout>
        ),
        loader: () => fetch("https://sport-store-server-bxc4.onrender.com/allItems"),
      },
      {
        path: "/my-equipment",
        element: (
          <SpetialRout>
            <MyEquipment />
          </SpetialRout>
        ),
      },
      {
        path: "/add-equipment",
        element: (
          <SpetialRout>
            <AddEquipment />
          </SpetialRout>
        ),
      },
      {
        path: "/update-equipment/:id",
        element: (
          <SpetialRout>
            <UpdateEquipment />
          </SpetialRout>
        ),
        loader: ({ params }) =>
          fetch(`https://sport-store-server-bxc4.onrender.com/allItems/id/${params.id}`),
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signin",
        element: <Register />,
      },
      {
        path: "/error",
        element: <ErrorPage/>
      }
    ],
  },
]);

export default rout;
