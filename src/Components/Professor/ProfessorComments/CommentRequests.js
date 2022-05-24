import React, { useState, useEffect } from 'react';
import CommentRequestComponent from './CommentRequestComponent';
// import ProfessorCommentData from './ProfessorCommentData';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const CommentRequests = () => {
    const initialstate = {
        ProfessorCommentData: []
    }

    const [FormData, setFormData] = useState(initialstate);
    const { ProfessorCommentData } = FormData;

    useEffect(() => {
        getAllComments()
        // eslint-disable-next-line
    }, [])

    const getAllComments = () => {
        axios.get(`api/admin/professor/comment/list`)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setFormData({
                        ...FormData,
                        ProfessorCommentData: response.data.data.docs
                    })
                }

            })
    }
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Professor Comments Requests</h6>
                        <NavLink to="/professorcomment"> <button className="btn skyblue White ml-auto">Add Comment</button></NavLink>
                    </div>
                    <div className="pt-3">
                        <CommentRequestComponent data={ProfessorCommentData} />
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

export default CommentRequests;