import React from 'react';
import CollegeData from './CollegeData';
import CollegeRequestComponent from './CollegeRequestComponent';
import { NavLink } from 'react-router-dom';

const CollegeRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Colleges Request</h6>
                        <NavLink to="/college"> <button className="btn skyblue White ml-auto">Add College</button></NavLink>
                    </div>
                    <div className="pt-3">
                        <CollegeRequestComponent data={CollegeData} />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default CollegeRequests;