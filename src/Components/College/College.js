import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import UploadComponent from '../ImageUploader/UploadComponent'
import { Select, Input, Spin, message } from 'antd';
const { Option } = Select;

const College = () => {
    const initialstate = {
        name: "",
        arName: "",
        location: "",
        countryID: '',
        countries: "",
        univID: "",
        universities: [],
        collegeLogo: [],
        error: "",
        update: false
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { name, arName, countries, univID, error, update, universities, collegeLogo } = DetailData;

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
    }

    const imagesSet = (imageArray) => {
        setDetailData({
            ...DetailData,
            collegeLogo: imageArray[0].originFileObj
        })
    }

    useEffect(() => {
        getAllCountries()
        // eslint-disable-next-line
    }, [])

    const getAllCountries = () => {
        const loadCountries = async () => {
            const response = await axios.get('api/countries/get')
            console.log(response)
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

    const SubmitForm = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("arName", arName);
        formData.append("collegeLogo", collegeLogo);
        const link = `api/admin/college/add?univID=${univID}`
        console.log(formData)
        axios.post(link, formData
        )
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('College Added Successfully')
                    window.location = "/college"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }

    const validation = () => {
        if (countries !== "") {
            if (univID !== "") {
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
                        error: "English Name is Required"
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
                        <p className="mr-auto my-auto">College &gt; Add College</p>
                        <NavLink to="/collegerequests"> <button className="btn skyblue White ml-auto rounded-0">College Requests</button></NavLink>
                        <NavLink to="/allcolleges"> <button className="btn review White ml-auto rounded-0">View All Colleges</button></NavLink>
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
                            <div className=" col-lg-6 col-md-9 col-12 mx-auto">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Name in EN"
                                    name="name"
                                    value={name}
                                    onChange={onHandleChange} />
                            </div>
                            <div className=" col-lg-6 col-md-9 col-12 mx-auto pt-2">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Name in AR"
                                    name="arName"
                                    value={arName}
                                    onChange={onHandleChange} />
                            </div>
                            <div className="form-group pt-3 col-md-3 mx-auto">
                                <p for="exampleFormControlFile1">Image</p>
                                <UploadComponent limit={1} imagesSet={imagesSet} />

                            </div>
                            <div className="col-12 col-md-6 form-group mx-auto mb-4">
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

export default College;