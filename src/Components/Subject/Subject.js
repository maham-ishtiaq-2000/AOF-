import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Select, Input, Spin, message } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const Subject = () => {
    const initialstate = {
        subjectCode: "",
        subjectName: "",
        arsubjectName: "",
        subjectDescription: "",
        countryID: "",
        countries: [],
        univID: "",
        universities: [],
        collegeID: "",
        colleges: [],
        majorID: "",
        majors: [],
        error: "",
        update: false
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { subjectCode, subjectName, arsubjectName, countryID, countries, univID, universities, collegeID, colleges, majorID, majors, subjectDescription, error, update } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "subjectCode") {
            setDetailData({
                ...DetailData,
                subjectCode: event.target.value.replace(/[^a-zA-Z0-9-\s]/ig, '')
            })
        }
        else if (event.target.name === "subjectName") {

            setDetailData({
                ...DetailData,
                subjectName: event.target.value.replace(/[^a-zA-Z0-9\s]/ig, '')
            })
        }
        else if (event.target.name === "arsubjectName") {

            setDetailData({
                ...DetailData,
                arsubjectName: event.target.value.replace(/[^\u0621-\u064A0-9\s]/ig, ''),
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
        else if (name === "collegeID") {
            getAllMajors(e)
        }
        console.log(DetailData)
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

    const getAllMajors = (id) => {
        const loadMajors = async () => {
            const response = await axios.get(`api/admin/major/list?id=${id}`)
            console.log(response)
            if (response.data.success) {
                setDetailData({
                    ...DetailData,
                    majors: response.data.data.docs,
                    update: true,
                })
            }
        }
        loadMajors()
    }

    const validation = () => {
        if (countries !== "") {
            if (universities !== "") {
                if (colleges !== "") {
                    if (majors !== "") {
                        if (subjectCode !== "") {
                            if (subjectName !== "") {
                                if (arsubjectName !== "") {
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
                                error: "Subject Code is Required"
                            })
                        }
                    }
                    else {
                        setDetailData({
                            ...DetailData,
                            error: "Major is Required"
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

    const SubmitForm = () => {
        axios.post(`api/admin/subject/add?majorID=${majorID}`, {
            subjectCode: subjectCode,
            subjectName: subjectName,
            arsubjectName: arsubjectName,
            subjectDescription: subjectDescription
        }
        )
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success('Subject Added Successfully')
                    window.location = "/subject"
                }
                else {
                    message.error(response.data.message)
                }
            })
    }

    if (update !== true) {
        return <Spin size="large" />
    }
    else if (update === true) {
        return (
            <React.Fragment>
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <p className="mr-auto my-auto">Subject &gt; Add Subject</p>
                        <NavLink to="/subjectrequests"> <button className="btn skyblue White ml-auto rounded-0">Subject Requests</button></NavLink>
                        <NavLink to="/allsubjects"> <button className="btn review ml-auto rounded-0">All Subjects</button></NavLink>
                    </div>

                    <form className="col-11 mx-auto pt-3">
                        <div className="col-12 col-md-10 col-lg-8 mx-auto ">
                            <div className="form-group col-lg-6 col-md-9 col-12 mx-auto">
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
                            <div className="form-group col-lg-6 col-md-9 col-12 mx-auto">
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
                            <div className="form-group col-lg-6 col-md-9 col-12 mx-auto">
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
                            <div className="form-group col-lg-6 col-md-9 col-12 mx-auto">
                                <Select
                                    showSearch
                                    placeholder="Select Major"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'majorID')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {colleges === "" ?
                                        <Option >Select College First</Option>
                                        :
                                        <React.Fragment>
                                            {majors.map(item => {
                                                return <Option value={item.majorID}>{item.majorName}</Option>
                                            })}
                                        </React.Fragment>}
                                </Select>
                            </div>

                            <div className="col-lg-6 col-md-9 col-12 mx-auto">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Subject Code"
                                    name="subjectCode"
                                    value={subjectCode}
                                    onChange={onHandleChange} />
                            </div>
                            <div className="col-lg-6 col-md-9 col-12 mx-auto pt-2">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Name EN"
                                    name="subjectName"
                                    value={subjectName}
                                    onChange={onHandleChange} />
                            </div>
                            <div className="col-lg-6 col-md-9 col-12 mx-auto pt-2">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Name AR"
                                    name="arsubjectName"
                                    value={arsubjectName}
                                    onChange={onHandleChange} />
                            </div>
                            {/* <div className="row pt-3"> */}
                            <div className="col-lg-6 col-md-9 col-12 mx-auto pt-2">
                                <TextArea type="text"
                                    className="form-control Radius_10"
                                    placeholder="Description"
                                    name="subjectDescription"
                                    value={subjectDescription}
                                    onChange={onHandleChange}
                                    autoSize={{ minRows: 3, maxRows: 5 }} />
                            </div>
                            {/* </div> */}

                            <div className="col-12 col-md-3 form-group mx-auto mb-4 pt-3">
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

export default Subject;