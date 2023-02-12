//import LoginForm from './pages/login';
import Map from './map';
import Profile from './profile';


import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import Root from './root';
import ErrorPage from '../utils/errorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'map',
                element: <Map />
            }, {
                path: 'profile',
                element: <Profile />
            }
        ]
    }
])

function App() {
    return (
        <RouterProvider router={ router }/>
    );
}

export default App;