import React, { useEffect, useState } from 'react';
import { Select, Input, Spin, message } from 'antd';
import axios from 'axios';
import UploadComponent from '../ImageUploader/UploadComponent'
import { NavLink } from 'react-router-dom';
const { Option } = Select;

const University = () => {
    const initialstate = {
        name: "",
        arName: "",
        countryID: "",
        countries: [],
        error: "",
        univLogo: [],
        universityData: [],
        update: false,
    }

    const [DetailData, setDetailData] = useState(initialstate);
    const { name, arName, countryID, countries, error, univLogo, universityData, update } = DetailData;

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
    }

    console.log(DetailData)

    useEffect(() => {
        GetAllUniv()
        // eslint-disable-next-line
    }, [])

    const GetAllUniv = () => {
        axios.get(`api/admin/universities/list?id=${1}`)
            .then((response) => {
                console.log(response)
                getAllCountries(response.data)
            })
    }

    const getAllCountries = (olderResponce) => {
        const loadCountries = async () => {
            const response = await axios.get('api/countries/get')
            console.log(response)
            if (response.data.success) {
                if (olderResponce.success === true) {
                    setDetailData({
                        ...DetailData,
                        countries: response.data.data.rows,
                        universityData: olderResponce.data.docs,
                        update: true,
                    })
                }
                else {
                    setDetailData({
                        ...DetailData,
                        countries: response.data.data.rows,
                        update: true,
                    })
                }
            }
        }
        loadCountries()
    }

    console.log(universityData)

    const imagesSet = (imageArray) => {
        setDetailData({
            ...DetailData,
            univLogo: imageArray[0].originFileObj
        })
        console.log(imageArray)
    }

    const SubmitForm = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("arName", arName);
        formData.append("univLogo", univLogo);
        const link = `api/admin/universities/add?countryID=${countryID}`
        console.log(formData)
        axios.post(link, formData
        )
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('University Added Successfully')
                    window.location = "/university"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }

    const validation = () => {
        if (countryID !== "") {
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
                    error: "Univeristy Name EN is Required"
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
                        <h4 className="mr-auto my-auto">University </h4>
                        <NavLink to="/alluniversities"> <button className="btn skyblue White ml-auto rounded-0">All Universities</button></NavLink>
                    </div>
                    <form className="col-11 mx-auto ">
                        <div className="col-12 col-md-10 col-lg-8 mx-auto">
                            {/* <div></div> */}
                            <h4 className="text-center">Add University</h4>
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

                                    {
                                        countries.map(item => {
                                            return <Option value={item.countryID}>{item.countryName}</Option>
                                        })}
                                </Select>
                            </div>
                            <div className="col-lg-6 col-md-9 col-12 mx-auto">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Name EN"
                                    name="name"
                                    value={name}
                                    onChange={onHandleChange} />
                            </div>

                            <div className=" col-lg-6 col-md-9 col-12 mx-auto pt-2">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Name AR"
                                    name="arName"
                                    value={arName}
                                    onChange={onHandleChange} />
                            </div>
                            <div className="form-group pt-2 col-md-3 mx-auto">
                                <p for="exampleFormControlFile1">Image</p>
                                <UploadComponent limit={1} imagesSet={imagesSet} />
                            </div>
                            <div className="col-12 col-md-5 form-group mx-auto mb-4">
                                <button
                                    className="btn skyblue White mt-2 text-center"
                                    type="button" onClick={validation}>
                                    Submit
                                </button>
                            </div>
                            <p className="text-danger text-center mb-0 py-2" style={{ fontSize: "20px", fontWeight: "500" }}> {error}</p>
                        </div>
                        <hr></hr>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default University;