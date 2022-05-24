import React from 'react';
import DocumentRequestComponent from './DocumentRequestComponent';
import SubjectDocumentData from './SubjectDocumentData';
import { NavLink } from 'react-router-dom';

const SubjectDocumentRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Document Requests</h6>
                        <NavLink to="/subjectdocument"> <button className="btn skyblue White ml-auto">Add Document</button></NavLink>
                    </div>
                    <div className="pt-3">
                        <DocumentRequestComponent data={SubjectDocumentData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubjectDocumentRequests;