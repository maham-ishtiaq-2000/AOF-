import React from 'react';
import MajorData from './MajorData';
import MajorRequestComponent from './MajorRequestComponent';
import { NavLink } from 'react-router-dom';

const MajorRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Major Requests</h6>
                        <NavLink to="/major"> <button className="btn skyblue White ml-auto">Add Major</button></NavLink>
                    </div>
                    <div className="pt-3">
                        <MajorRequestComponent data={MajorData} />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default MajorRequests;