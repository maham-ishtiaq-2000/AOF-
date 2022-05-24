import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import MajorComponent from './MajorComponent';
// import MajorData from './MajorData';
import axios from 'axios';
// eslint-disable-next-line
import { Select, Input, Spin, message } from 'antd';
import UploadComponent from '../ImageUploader/UploadComponent';
const { Option } = Select;

const Major = () => {

    const initialstate = {
        name: "",
        arName: "",
        countryID: "",
        countries: [],
        univID: "",
        universities: [],
        majorLogo: [],
        collegeID: "",
        colleges: [],
        users: [],
        error: "",
        update: false
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { name, arName, countryID, countries, univID, universities, collegeID, colleges, majorLogo, error, update } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "name") {

            setDetailData({
                ...DetailData,
                name: event.target.value.replace(/[^a-zA-Z\s]/ig, ''),
            })
        }
        else if (event.target.name === "arName") {

            setDetailData({
                ...DetailData,
                arName: event.target.value.replace(/[^\u0621-\u064A\s]/ig, ''),
            })
        }
        else {
            setDetailData({
                ...DetailData,
                [name]: value
            })
        }
    }

    const onchange = (e, name) => {
        console.log('event', e, name)
        setDetailData({
            ...DetailData,
            [name]: e
        })
        if (name === "countryID") {
            getAllUniv(e)
        }
        else if (name === "univID") {
            getAllCollge(e)
        }
    }

    const imagesSet = (imageArray) => {
        setDetailData({
            ...DetailData,
            majorLogo: imageArray[0].originFileObj
        })
    }

    useEffect(() => {
        getAllCountries()
        // eslint-disable-next-line
    }, [])

    const getAllCountries = () => {
        const loadCountries = async () => {
            const response = await axios.get('api/countries/get')
            setDetailData({
                ...DetailData,
                countries: response.data.data.rows,
                update: true,
            })
        }
        loadCountries()
    }

    const getAllUniv = (id) => {
        const loadUniversities = async () => {
            const response = await axios.get(`api/admin/universities/list?id=${id}`)
            console.log(response)
            if (response.data.success) {
                setDetailData({
                    ...DetailData,
                    universities: response.data.data.docs,
                    update: true,
                })
            }
        }
        loadUniversities()
    }

    const getAllCollge = (id) => {
        const loadColleges = async () => {
            const response = await axios.get(`api/admin/college/list?id=${id}`)
            console.log(response)
            if (response.data.success) {
                setDetailData({
                    ...DetailData,
                    colleges: response.data.data.docs,
                    update: true,
                })
            }
        }
        loadColleges()
    }

    const SubmitForm = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("arName", arName);
        formData.append("majorLogo", majorLogo);
        const link = `api/admin/major/add?collegeID=${collegeID}`
        axios.post(link, formData
        )
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('Major Added Successfully')
                    window.location = "/major"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }

    const validation = () => {
        if (countries !== "") {
            if (universities !== "") {
                if (colleges !== "") {
                    if (name !== "") {
                        if (arName !== "") {
                            SubmitForm()
                            setDetailData({
                                ...DetailData,
                                error: ""
                            })
                        }
                        else {
                            setDetailData({
                                ...DetailData,
                                error: "Arabic Name is Required"
                            })
                        }
                    }
                    else {
                        setDetailData({
                            ...DetailData,
                            error: "Name is Required"
                        })
                    }
                }
                else {
                    setDetailData({
                        ...DetailData,
                        error: "College is Required"
                    })
                }
            }
            else {
                setDetailData({
                    ...DetailData,
                    error: "University is Required"
                })
            }
        }
        else {
            setDetailData({
                ...DetailData,
                error: "Country is Required"
            })
        }
    }

    if (update !== true) {
        return <Spin size="large" />
    }
    else if (update === true) {
        return (
            <React.Fragment>
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <p className="mr-auto my-auto">Major &gt; Add Major</p>
                        <NavLink to="/majorrequests"> <button className="btn skyblue White ml-auto rounded-0">Major Requests</button></NavLink>
                        <NavLink to="/allmajors"> <button className="btn review White ml-auto rounded-0 ">All Majors</button></NavLink>
                    </div>
                    <form className="col-11 mx-auto pt-3">
                        <div className="col-12 col-md-10 col-lg-8 mx-auto ">
                            <div >
                                <div className="form-group col-md-6 col-12 mx-auto">
                                    <Select
                                        showSearch
                                        placeholder="Select Country"
                                        className="col-12"
                                        optionFilterProp="children"
                                        onChange={(e) => onchange(e, 'countryID')}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {countries.map(item => {
                                            return <Option value={item.countryID}>{item.countryName}</Option>
                                        })}
                                    </Select>
                                </div>
                                <div className="form-group  col-md-6 col-12 mx-auto">
                                    <Select
                                        showSearch
                                        placeholder="Select University"
                                        className="col-12"
                                        optionFilterProp="children"
                                        onChange={(e) => onchange(e, 'univID')}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {countries === "" ?
                                            <Option >Select Country First</Option>
                                            :
                                            <React.Fragment>
                                                {universities.map(item => {
                                                    return <Option value={item.univID}>{item.univName}</Option>
                                                })}
                                            </React.Fragment>}
                                    </Select>
                                </div>
                                <div className="form-group  col-md-6 col-12 mx-auto">
                                    <Select
                                        showSearch
                                        placeholder="Select College"
                                        className="col-12"
                                        optionFilterProp="children"
                                        onChange={(e) => onchange(e, 'collegeID')}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {universities === "" ?
                                            <Option >Select University First</Option>
                                            :
                                            <React.Fragment>
                                                {colleges.map(item => {
                                                    return <Option value={item.collegeID}>{item.collegeName}</Option>
                                                })}
                                            </React.Fragment>}
                                    </Select>
                                </div>
                            </div>
                            <div >
                                <div className=" col-md-6 col-12 mx-auto">
                                    <Input type="text"
                                        className="form-control Radius_20"
                                        placeholder="Name EN"
                                        name="name"
                                        value={name}
                                        onChange={onHandleChange} />
                                </div>
                                <div className=" col-md-6 col-12 mx-auto pt-2">
                                    <Input type="text"
                                        className="form-control Radius_20"
                                        placeholder="Name AR"
                                        name="arName"
                                        value={arName}
                                        onChange={onHandleChange} />
                                </div>
                            </div>

                            <div className="form-group pt-3 col-md-3 mx-auto">
                                <p for="exampleFormControlFile1">Image</p>
                                <UploadComponent limit={1} imagesSet={imagesSet} />
                            </div>
                            <div className="col-12 col-md-3 form-group mx-auto mb-4">
                                <button
                                    className="btn skyblue White mt-2 text-center"
                                    type="button" onClick={validation}>
                                    Submit
                                </button>
                            </div>
                            <p className="text-danger text-center mb-0py-2" style={{ fontSize: "20px", fontWeight: "500" }}> {error}</p>
                        </div>
                        <hr></hr>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Major;