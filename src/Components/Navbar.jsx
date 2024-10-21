import react, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaCity} from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import {MdFolderZip, MdOutlinePin } from 'react-icons/md';
import Home from './Home';
import LocationSearch from './LocationSearch';
import ZipCodeSearch from './ZipCodeSearch';
import './navbar.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import App from '../App';
const Navbar=() => {
    return(
        <Router>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Weather Forecast</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Search by City</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/location">Search by Location</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/zipcodesearch">Search by ZipCode</Link>
                        </li>
                    </ul>
                </div>
            </div>
           </nav>
           <div>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/location' element={<LocationSearch />} />
                <Route path='/zipcodesearch' element={<ZipCodeSearch />} />
            </Routes>
           </div>
        </div>
        </Router>

    );

}
export default Navbar;
