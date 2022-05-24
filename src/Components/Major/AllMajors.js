import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MajorComponent from './MajorComponent';
import axios from 'axios';
import { Spin } from 'antd';

const AllMajors = () => {

    const initialstate = {
        majorData: [],
        update: false
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { majorData, update } = DetailData;

    useEffect(() => {
        getAllMajors()
        // eslint-disable-next-line
    }, [])

    const getAllMajors = () => {
        axios.get(`api/admin/major/list?id=${2012}`)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setDetailData({
                        ...DetailData,
                        majorData: response.data.data.docs,
                        update: true
                    })
                }

            })
    }
    console.log(majorData)

    if (update !== true) {
        return <Spin size="large" />
    }
    else if (update === true) {
        return (
            <React.Fragment>
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <h4 className="mr-auto my-auto">Major</h4>
                        <NavLink to="/majorrequests"> <button className="btn skyblue White ml-auto rounded-0">Major Requests</button></NavLink>
                        <NavLink to="/major"> <button className="btn review ml-auto rounded-0">Add Major</button></NavLink>
                    </div>
                    <form className="col-11 mx-auto pt-3">
                        <div>
                            <h6>All Majors</h6>
                            <div>
                                <MajorComponent data={majorData} getAllMajors={getAllMajors} />
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default AllMajors;