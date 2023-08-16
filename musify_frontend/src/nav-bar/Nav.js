const Nav = () => {
    return (
        <div className="container-fluid  bg-black">
            <div id="logo">
                <a className="navbar-brand fw-bold" href="#">
                    <div className="row">
                        <div className="col-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="green"
                                 className="bi bi-music-note-beamed " viewBox="0 0 16 16">
                                <path
                                    d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                                <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
                            </svg>
                        </div>
                        <div className="col-10">
                            <h1 className="text-success">Musify</h1>
                        </div>
                    </div>
                </a>
            </div>
            <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                    Home
                </a>
                <a href="#" className="list-group-item list-group-item-action">Search</a>
                <a href="#" className="list-group-item list-group-item-action">Profile</a>
                <a href="#" className="list-group-item list-group-item-action">Sign out</a>
                <a className="list-group-item list-group-item-action disabled" aria-disabled="true">Sign in</a>

                {/* Use the below navigation method--- Bhavik  */}
                {/* <Link className={`list-group-item text-capitalize ${active === "profile" ? "active" : ""}`} to="/tuiter/profile">
                        <span><i className="bi bi-person me-2"/></span> 
                        <span className="d-none d-xl-inline-block">Profile</span>
                    </Link>} */}
            </div>
        </div>

    );
}

export default Nav;