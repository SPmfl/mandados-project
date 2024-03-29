//import LoginForm from './pages/login';
import Map from './map';
import Profile from './profile';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Root from './root';
import Login from './login'
import Welcome from './welcome'
import ErrorPage from '../utils/errorPage';
import Map2 from '../components/cmp-map-2/map2';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Map2/>,
        // element: <Login />,
        errorElement: <ErrorPage />
    }, 
    {
        path: '/app',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/app',
                element: <Welcome />
            }, {
                path: '/app/map',
                element: <Map />
            }, {
                path: '/app/profile',
                element: <Profile />
            }
        ]
    }
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;