import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ClassComponent from './ClassComponent';
import ClassData from './ClassData';
import { Select, Input, Spin } from 'antd';
import axios from 'axios';
const { Option } = Select;

const Class = () => {

    const initialstate = {
        name: "",
        country: "",
        university: "",
        college: "",
        subject: "",
        kind: "",
        feature: "",
        users: "",
        error: "",
        update: false
    }

    const [FormData, setFormData] = useState(initialstate);
    const { name, country, university, college, subject, kind, feature, users, error, update } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const onchange = (e, name) => {
        console.log('event', e, name)
        setFormData({
            ...FormData,
            [name]: e
        })
        console.log(FormData)
    }

    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get('https://reqres.in/api/users')
            console.log(response)
            setFormData({
                ...FormData,
                users: response.data.data,
                update: true
            })
        }
        loadUsers()
        // eslint-disable-next-line
    }, [])

    const validation = () => {
        if (country !== "") {
            if (university !== "") {
                if (college !== "") {
                    if (subject !== "") {
                        if (name !== "") {
                            if (kind !== "") {
                                if (feature !== "") {
                                    alert('Added Successfully')
                                }
                                else {
                                    setFormData({
                                        ...FormData,
                                        error: "Feature is Required"
                                    })
                                }
                            }
                            else {
                                setFormData({
                                    ...FormData,
                                    error: "Kind is Required"
                                })
                            }
                        }
                        else {
                            setFormData({
                                ...FormData,
                                error: "Name is Required"
                            })
                        }
                    }
                    else {
                        setFormData({
                            ...FormData,
                            error: "Subject is Required"
                        })
                    }
                }
                else {
                    setFormData({
                        ...FormData,
                        error: "College is Required"
                    })
                }
            }
            else {
                setFormData({
                    ...FormData,
                    error: "University is Required"
                })
            }
        }
        else {
            setFormData({
                ...FormData,
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
                        <p className="mr-auto my-auto">ClassRoom &gt; Add ClassRoom</p>
                        <NavLink to="/classrequests"> <button className="btn skyblue White ml-auto">ClassRoom Requests</button></NavLink>
                    </div>

                    <form className="col-11 mx-auto pt-3">
                        <div className="row">
                            <div className="form-group col-md-3 col-12">
                                <Select
                                    showSearch
                                    placeholder="Select Country"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'country')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {users.map(item => {
                                        return <Option value={item.first_name}>{item.first_name}</Option>
                                    })}
                                </Select>
                            </div>
                            <div className="form-group col-md-3">
                                <Select
                                    showSearch
                                    placeholder="Select University"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'university')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {country === "" ?
                                        <Option >Select Country First</Option>
                                        :
                                        <React.Fragment>
                                            {users.map(item => {
                                                return <Option value={item.first_name}>{item.first_name}</Option>
                                            })}
                                        </React.Fragment>}
                                </Select>
                            </div>
                            <div className="form-group col-md-3">
                                <Select
                                    showSearch
                                    placeholder="Select College"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'college')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {university === "" ?
                                        <Option >Select University First</Option>
                                        :
                                        <React.Fragment>
                                            {users.map(item => {
                                                return <Option value={item.first_name}>{item.first_name}</Option>
                                            })}
                                        </React.Fragment>}
                                </Select>
                            </div>
                            <div className="form-group col-md-3 col-12">
                                <Select
                                    showSearch
                                    placeholder="Select Subject"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'subject')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {college === "" ?
                                        <Option >Select College First</Option>
                                        :
                                        <React.Fragment>
                                            {users.map(item => {
                                                return <Option value={item.first_name}>{item.first_name}</Option>
                                            })}
                                        </React.Fragment>}
                                </Select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 col-12">
                                <Input type="text"
                                    className="form-control Radius_20"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={onHandleChange} />
                            </div>
                            <div className="col-md-3 col-12">
                                <Select
                                    showSearch
                                    placeholder="Kind"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'kind')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    <Option value="Public">Public</Option>
                                    <Option value="Private">Private</Option>
                                </Select>
                            </div>
                            <div className="col-md-3 col-12">
                                <Select
                                    showSearch
                                    placeholder="Feature"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'feature')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    <Option value="Featured">Featured</Option>
                                    <Option value="Non-Featured">Non-Featured</Option>
                                </Select>
                            </div>
                        </div>

                        <button type="button" className="btn skyblue White mt-3" onClick={validation}>
                            Submit
                        </button>
                        <p className="text-danger text-center mb-0py-2" style={{ fontSize: "20px", fontWeight: "500" }}> {error}</p>
                        <hr></hr>

                        <div>
                            <h6>Available Class Rooms</h6>
                            <div >
                                <ClassComponent data={ClassData} />
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Class;