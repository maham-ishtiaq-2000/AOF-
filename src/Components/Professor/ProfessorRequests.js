import React from 'react';
import ProfessorData from './ProfessorData';
import ProfessorRequestComponent from './ProfessorRequestComponent';
import { NavLink } from 'react-router-dom';

const ProfessorRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Professor Requests</h6>
                        <NavLink to="/professor"> <button className="btn skyblue White ml-auto">Add Professor</button></NavLink>
                    </div>
                    <div className="pt-3">
                        <ProfessorRequestComponent data={ProfessorData} />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default ProfessorRequests;