import Nav from "../../nav-bar/Nav";
import ApiComponent from "./ApiComponent";
import Musify from "../../nav-bar/Musify";

const HomeScreen = () => {

    return (
        <div className="container-fluid bg-black mt-3">
            <div className="row">
            <div className="col-2">
                    <Musify />
					<Nav />
				</div>
                <div className="col-10">
                    <ApiComponent />
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;