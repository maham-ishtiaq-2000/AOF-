import React from 'react';
import SubjectData from './SubjectData';
import SubjectRequestComponent from './SubjectRequestComponent';
import { NavLink } from 'react-router-dom';

const SubjectRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Subject Requests</h6>
                        <NavLink to="/subject"> <button className="btn skyblue White ml-auto">Add Subject</button></NavLink>
                    </div>
                    <div className="pt-3">
                        <SubjectRequestComponent data={SubjectData} />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default SubjectRequests;