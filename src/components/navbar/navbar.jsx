import React, { useState } from 'react';
import './navbar.css';

function Navbar(props) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode') ? localStorage.getItem('darkmode') == 'true' : false);
    
    const handleDarkMode = () => {
        console.log(darkMode)
        localStorage.setItem('darkmode', !darkMode);
        setDarkMode(!darkMode);
    }

    return (
        <div className={darkMode ? 'navbar__body darkmode' :'navbar__body'}>
            <nav className={darkMode ? 'navbar navbar-expand-lg navbar-dark bg-dark darkmode text-white' : 'navbar navbar-expand-lg navbar-white bg-white'}>
                <div className="container-fluid">
                    <a className={darkMode ? "navbar-brand darkmode" : "navbar-brand"} href="#">Image Gallery</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <input type="text" placeholder='Search' className='navbar__search' onChange={(e)=>{props.searchItem(e.target.value)}} />
                            <a className={darkMode ? "nav-link darkmode" : "nav-link"} href="#">Explore</a>
                            <a className={darkMode ? "nav-link darkmode" : "nav-link"} href="#">Collection</a>
                            <a className={darkMode ? "nav-link darkmode" : "nav-link"} href="#">Community</a>
                            <div className="form-check form-switch mt-1">
                                <label className={darkMode ? "form-check-label darkmode" : "form-check-label" } htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                                <input className="form-check-input" checked={darkMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleDarkMode} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
