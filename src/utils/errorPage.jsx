import { useRouteError } from "react-router-dom";

import '../styles/errorpage.css';


function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <div>
                <h1 id="h1" className="h1">Oops!</h1>
                <div id="div2" className="container  p-5 my-5 ">
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default ErrorPage;