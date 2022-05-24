import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SubjectComponent from './SubjectComponent';
import axios from 'axios';
import { Spin } from 'antd';

const AllSubjects = () => {
    const initialstate = {
        subjectData:[],
        update: false
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { subjectData, update } = DetailData;

    useEffect(() => {
        getAllSubjects()
        // eslint-disable-next-line
    }, [])

    const getAllSubjects = () => {
        axios.get(`api/admin/subject/list?majorID=${2}`)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setDetailData({
                        ...DetailData,
                        subjectData: response.data.data.docs,
                        update: true
                    })
                }

            })
    }
    console.log(subjectData)
    
    if (update !== true) {
        return <Spin size="large" />
    }
    else if (update === true) {
        return (
            <React.Fragment>
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <h4 className="mr-auto my-auto">Subject</h4>
                        <NavLink to="/subjectrequests"> <button className="btn skyblue White ml-auto rounded-0">Subject Requests</button></NavLink>
                        <NavLink to="/Subject"> <button className="btn review ml-auto rounded-0">Add Subject</button></NavLink>
                    </div>

                    <form className="col-11 mx-auto pt-3">
                        <div>
                            <h6>Available Subjects</h6>
                            <div>
                                <SubjectComponent data={subjectData} getAllSubjects={getAllSubjects} />
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default AllSubjects;