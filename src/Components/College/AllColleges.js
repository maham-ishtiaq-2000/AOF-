import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CollegeComponent from './CollegeComponent';
import axios from 'axios';
import { Spin } from 'antd';

const AllColleges = () => {
    const initialstate = {
        collegeData: [],
        update: false
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { update, collegeData } = DetailData;

    useEffect(() => {
        getAllColleges()
        // eslint-disable-next-line
    }, [])

    const getAllColleges = () => {
        axios.get(`api/admin/college/list?id=${100}`)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setDetailData({
                        ...DetailData,
                        collegeData: response.data.data.docs,
                        update: true
                    })
                }

            })
    }
    console.log(collegeData)

    if (update !== true) {
        return <Spin size="large" />
    }

    else if (update === true) {
        return (
            <React.Fragment>
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <h4 className="mr-auto my-auto">College </h4>
                        <NavLink to="/collegerequests"> <button className="btn skyblue White ml-auto rounded-0">College Requests</button></NavLink>
                        <NavLink to="/college"> <button className="btn review White ml-auto rounded-0">Add College</button></NavLink>
                    </div>

                    <form className="col-11 mx-auto pt-3">
                        <div >
                            <h6>All Colleges</h6>
                            <div>
                                <CollegeComponent data={collegeData} getAllColleges={getAllColleges} />
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default AllColleges;