import Nav from "../../nav-bar/Nav";
import ApiComponent from "./ApiComponent";

const HomeScreen = () => {
    return (
        <div className="container-fluid bg-black">
            <div className="row">
                <div className="col-3">
                    <Nav />
                </div>
                <div className="col-9">
                    <ApiComponent />
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;