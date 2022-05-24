import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfessorComponent from './ProfessorComponent';
import axios from 'axios';
import { Spin } from 'antd';

const AllProfessors = () => {
    const initialstate = {
        professorData: [],
        update: false
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { professorData, update } = DetailData;

    useEffect(() => {
        getAllProfs()
        // eslint-disable-next-line
    }, [])

    const getAllProfs = () => {
        axios.get(`api/admin/professor/list?majorID=${8}`)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setDetailData({
                        ...DetailData,
                        professorData: response.data.data.docs,
                        update: true
                    })
                }

            })
    }
    console.log(professorData)

    if (update !== true) {
        return <Spin size="large" />
    }
    else if (update === true) {
        return (
            <React.Fragment>
            <div className="row mr-0">
                <div className="row col-11 mx-auto pt-2">
                    <h4 className="mr-auto my-auto">Professors</h4>
                    <NavLink to="/professorrequests"> <button className="btn skyblue White ml-auto rounded-0">Professor Requests</button></NavLink>
                    <NavLink to="/professor"> <button className="btn review ml-auto rounded-0">Add Professor</button></NavLink>
                </div>

                <form className="col-11 mx-auto pt-3">
                    <div >
                        <h6>Available Professors</h6>
                        <div>
                            <ProfessorComponent data={professorData} getAllProfs={getAllProfs} />
                        </div>
                    </div>
                </form>
            </div>
            </React.Fragment>
        )
    }
}

export default AllProfessors;