import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Callback from './pages/auth/callback';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

const router = createBrowserRouter([
    {
        element:<MainLayout />,
        children: [
            {
                path:'/',
                element:<Home />
            },
            {
                path:'/about',
                element:<About />
            },
            {
                path:'/contact',
                element:<Contact />
            },
            {
                path:'/profile',
                element:<Profile />
            },
        ]
    },
    {
        path:'/callback',
        element: <Callback></Callback>
    }

]);

export const UserContext = React.createContext(null);

function App() {
    const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
