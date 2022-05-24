import React, { useEffect, useState } from 'react';
import UniversityComponent from './UniversityComponent';
import { Spin } from 'antd';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const AllUniversities = () => {
    const initialstate = {
        universityData: [],
        update: false,
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { universityData, update } = DetailData;

    console.log(DetailData)

    useEffect(() => {
        GetAllUniv()
        // eslint-disable-next-line
    }, [])

    const GetAllUniv = () => {
        axios.get(`api/admin/universities/list?id=${1}`)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setDetailData({
                        ...DetailData,
                        universityData: response.data.data.docs,
                        update: true
                    })
                }
            })
    }

    console.log(universityData)

    if (update !== true) {
        return <Spin size="large" />
    }
    else if (update === true) {
        return (
            <React.Fragment>
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <h4 className="mr-auto my-auto">University</h4>
                        <NavLink to="/university"> <button className="btn skyblue White ml-auto rounded-0">Add University</button></NavLink>
                    </div>
                    <form className="col-11 mx-auto">
                        <div >
                            <h6>Available University</h6>
                            <UniversityComponent data={universityData} GetAllUniv={GetAllUniv} />
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default AllUniversities;