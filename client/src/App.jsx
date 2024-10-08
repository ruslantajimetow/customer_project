import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import RootLayout from './RootLayout/RootLayout';
import SignInPage from './Components/pages/SignInPage';
import SignUpPage from './Components/pages/SignUpPage';
import { useEffect } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';
import AdminPanel from './Components/ui/AdminPanel';
import { useDisclosure } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './Components/pages/HomePage/HomePage';
import FavoritesPage from './Components/pages/FavoritesPage/FavoritesPage';

function App() {
  const [user, setUser] = useState({});
  const [housings, setHousings] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axiosInstance.get(`/token/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
    axiosInstance.get('/housings').then((res) => {
      setHousings(res.data);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <HomePage user={user} housings={housings} />,
        },

        {
          path: '/signIn',
          element: <SignInPage setUser={setUser} />,
        },
        {
          path: '/signUp',
          element: <SignUpPage setUser={setUser} />,
        },
        {
          path: '/favourites/:id',
          element: <FavoritesPage user={user} />,
        },

        {
          path: '/dashboard',
          element: (
            <ProtectedRoute role={user.role} user={user}>
              <AdminPanel
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                housings={housings}
                setHousings={setHousings}
              />
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
