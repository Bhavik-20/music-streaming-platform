import RecentlyPlayed from "./RecentlyPlayed";
import Trending from "./Trending";

const ApiComponent = () => {
    return(
        <div className="container-fluid">
            <div id="welcome" className="w-100">
                <div className="row">
                    <div className="jumbotron col-9">
                        <h1 className="text-success">Welcome to Musify!</h1>
                        <p className="text-success">Your personalized online music streaming</p>
                    </div>
                    <div className="col-3">
                        <h2 className="text-success">Hi, Shreyas</h2>
                    </div>
                </div>
            </div>

            {/* Logged In user */}
            <div id="recently-played">
                <h2 className="text-success">Liked Songs/tracks</h2>
            </div>
            <div id="recently-played">
                <h2 className="text-success">Liked Albums</h2>
            </div>

            {/*For all users */}
            <div id="recently-played">
                <h2 className="text-success">Recently played</h2>
                <RecentlyPlayed />
            </div>
            <div id="trending">
                <h2 className="text-success">Trending</h2>
                <Trending />
            </div>
            
        </div>
    );
}
export default ApiComponent;