import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="container d-flex justify-content-center text-center">
                <div className="d-flex flex-column">
                    <h1 className="display-5"><span className="display-1">404!</span> Page Not Found</h1>
                    <p>We don't know how ended up here, But you shold go back home.</p>
                    <div className="text-center"><button onClick={() => navigate("/")} className="btn btn-secondary">Go Back Home</button></div>
                </div>
                
            </div>
        </>
    );
}

export default PageNotFound;