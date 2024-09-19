import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import RootLayout from "./RootLayout/RootLayout";
import SignInPage from "./Components/pages/SignInPage";
import SignUpPage from "./Components/pages/SignUpPage";
import { useEffect } from "react";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import AdminPanel from "./Components/ui/AdminPanel";
import { useDisclosure } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/pages/HomePage/Homepage";

function App() {
  const [user, setUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axiosInstance.get(`/token/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: "/signIn",
          element: <SignInPage setUser={setUser} />,
        },
        {
          path: "/signUp",
          element: <SignUpPage setUser={setUser} />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute role={user.role} user={user}>
              <AdminPanel isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

function ProtectedRoute({ role, user, children }) {
  if (user.role !== role) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default App;
