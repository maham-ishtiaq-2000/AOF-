import React from 'react';
import ClassData from './ClassData';
import ClassRequestComponent from './ClassRequestComponent';
import { NavLink } from 'react-router-dom';

const ClassRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">ClassRoom Requests</h6>
                        <NavLink to="/classroom"> <button className="btn skyblue White ml-auto">Add Classroom</button></NavLink>
                    </div>
                    <div className="pt-2">
                        <ClassRequestComponent data={ClassData} />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default ClassRequests;