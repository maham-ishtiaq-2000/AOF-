import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DocumentComponent from './DocumentComponent';
import SubjectDocumentData from './SubjectDocumentData';
import axios from 'axios';
import FileUploader from './FileUploader'
import { Select, Input, Spin } from 'antd';
const { Option } = Select;

const SubjectDocument = (props) => {
    console.log(props)
    const initialstate = {
        country: "",
        university: "",
        college: "",
        major: "",
        subject: "",
        users: [],
        error: "",
        title: "",
        file: [],
        folder: "",
        description: "",
        files: [],
        type: "",
        update: false
    }

    const [checked, setChecked] = useState(false);
    const [FormData, setFormData] = useState(initialstate);
    const { country, university, college, major, subject, users, error, title, file, description, files, type, folder, update } = FormData;

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

    const Uploader = () => {
        if (title !== "" && description !== "" && file !== "" && type !== "") {
            const random = Math.floor(100000 + Math.random() * 900000);

            const newService = {
                serviceid: random,
                title: title,
                description: description,
                file: file,
                type: type
            }

            files.push(newService)
            setFormData({
                ...FormData,
                title: "",
                description: "",
                file: [],
                type: ""
            })
        }
    }

    const onUpdateTitle = (event) => {
        const id = event.target.id
        var array;
        // eslint-disable-next-line
        files.map((service, index) => {
            // eslint-disable-next-line
            if (service.serviceid == id) {
                array = files;
                array[index].title = event.target.value
                setFormData({
                    ...FormData,
                    files: array
                })
            }
        })
    }

    const onUpdateFile = (info, id) => {
        var array;
        // eslint-disable-next-line
        files.map((service, index) => {
            // eslint-disable-next-line
            if (service.serviceid == id) {
                array = files;
                array[index].file = info.file
            }
        })
    }

    const onUpdateDescription = (event) => {
        const id1 = event.target.id
        var array;
        // eslint-disable-next-line
        files.map((service, index) => {
            // eslint-disable-next-line
            if (service.serviceid == id1) {
                array = files;
                array[index].description = event.target.value
                setFormData({
                    ...FormData,
                    files: array
                })
            }
        })
    }

    const onUploadFile = (info) => {
        console.log(info)

        setFormData({
            ...FormData,
            file: info.fileList
        })
    }

    const RenderMap = files.map((servicemap) => {
        return (
            <React.Fragment>
                <div className="col-12 pb-5" >

                    <div className="form-group col-md-6 col-12 pt-2">
                        <Select
                            showSearch
                            placeholder="Select Type"
                            optionFilterProp="children"
                            name="type"
                            id={servicemap.serviceid}
                            value={servicemap.type}
                            onChange={(e) => onchange(e, 'type')}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            <Option value="Book">Book</Option>
                            <Option value="Notes">Notes</Option>
                            <Option value="Slides">Slides</Option>
                            <Option value="Labs">Labs</Option>
                            <Option value="Quizez">Quizez</Option>
                            <Option value="Exam">Exam</Option>
                            <Option value="Lecture Notes">Lecture Notes</Option>
                        </Select>
                    </div>
                    <div>
                        <input type="text"
                            className="p-2 col-lg-6 col-md-12 col-12 Radius_20 bordercolor"
                            name="title"
                            id={servicemap.serviceid}
                            value={servicemap.title}
                            onChange={onUpdateTitle}
                            placeholder="Title" ></input>
                    </div>

                    <div >
                        <textarea type="text" style={{ resize: 'none' }}
                            className="form-control Radius_20"
                            name="description"
                            id={servicemap.serviceid}
                            value={servicemap.description}
                            onChange={onUpdateDescription}
                            placeholder="Description">
                        </textarea>
                    </div>
                    <div className="pt-2 pb-2">
                        <FileUploader onUploadFile={onUpdateFile} id={servicemap.serviceid} fileList={servicemap.file} />
                    </div>
                </div>
            </React.Fragment>
        )
    })

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
                    if (major !== "") {
                        if (subject !== "") {
                            alert('Added Successfully')
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
                            error: "Major is Required"
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
                {console.log(FormData)}
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <p className="mr-auto my-auto">Subject &gt; Add Subject Document</p>
                        <NavLink to="/documentrequests"> <button className="btn skyblue White ml-auto">Documents Requests</button></NavLink>
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
                                    placeholder="Select Major"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'major')}
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
                            <div className="form-group col-xl-3 col-lg-3 col-md-6 col-12">
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
                                    {major === "" ?
                                        <Option >Select Major First</Option>
                                        :
                                        <React.Fragment>
                                            {users.map(item => {
                                                return <Option value={item.first_name}>{item.first_name}</Option>
                                            })}
                                        </React.Fragment>}
                                </Select>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8 col-12 mx-auto">
                            <input type="checkbox" onChange={() => setChecked(!checked)} checked={checked} />
                            <label className="pl-2">Impact As Folder</label>
                            {
                                checked ? (
                                    <Input type="text"
                                        className="Radius_20"
                                        placeholder="Folder Name"
                                        name="folder"
                                        value={folder}
                                        onChange={onHandleChange} />
                                ) : (<div></div>)
                            }

                        </div>

                        <div className="col-12 mt-3" style={{ border: "1px dotted " }}>
                            {RenderMap}
                            <div className="form-group col-md-6 col-12 pt-2">
                                <Select
                                    showSearch
                                    placeholder="Select Type"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'type')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    <Option value="Book">Book</Option>
                                    <Option value="Notes">Notes</Option>
                                    <Option value="Slides">Slides</Option>
                                    <Option value="Labs">Labs</Option>
                                    <Option value="Quizez">Quizez</Option>
                                    <Option value="Exam">Exam</Option>
                                    <Option value="Lecture Notes">Lecture Notes</Option>
                                </Select>
                            </div>
                            <div>
                                <Input type="text"
                                    className=" p-2 col-lg-6 col-md-12 col-12 Radius_20 bordercolor m-1"
                                    name="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={onHandleChange} />
                            </div>
                            <div >
                                <textarea type="text" style={{ resize: 'none' }}
                                    className="form-control Radius_20"
                                    placeholder="Description"
                                    name="description"
                                    value={description}
                                    onChange={onHandleChange} rows="3">
                                </textarea>
                            </div>
                            <div className="pt-2 pb-2">
                                <FileUploader limit={1} onUploadFile={onUploadFile} id="normal" fileList={file} />
                            </div>
                            <div className=" col-12 mb-2">
                                <button type="button" className="btn review d-block mxAuto mt-4 " onClick={Uploader}>+ Add More Files</button>
                            </div>
                        </div>

                        <button type="button" className="btn skyblue White mt-3" onClick={validation}>
                            Submit
                        </button>
                        <p className="text-danger text-center mb-0py-2" style={{ fontSize: "20px", fontWeight: "500" }}> {error}</p>
                        <hr></hr>

                        <div >
                            <h6>Available Document</h6>
                            <div>
                                <DocumentComponent data={SubjectDocumentData} />
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default SubjectDocument;