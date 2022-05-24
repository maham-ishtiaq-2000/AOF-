import React from 'react';
import SubjectCommentRequestComponent from './SubjectCommentRequestComponent';
import SubjectCommentData from './SubjectCommentData';
import { NavLink } from 'react-router-dom';

const SubjectCommentRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Subject Comment Requests</h6>
                        <NavLink to="/Subjectcomments"> <button className="btn skyblue White ml-auto">Add Comment</button></NavLink>
                    </div>
                    <div className="pt-2">
                        <SubjectCommentRequestComponent data={SubjectCommentData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubjectCommentRequests;