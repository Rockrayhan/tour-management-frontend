import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div>
            <h1> Sorry you are Unauthorized </h1>
            visit our <Link to="/"> <u>Home Page</u> </Link>
        </div>
    );
};

export default Unauthorized;