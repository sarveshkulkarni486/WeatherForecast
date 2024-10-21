import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import load from '../assets/images/loading.gif';
const Loading = () => {
    return(
        <div>
            <div className="img-fluid">
                <img src={load} alt="loading" />
            </div>
            <h1>Loading...</h1>
        </div>
    )
}
export default Loading;