
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import BookComponent from './BookComponent';
import BooksData from './BooksData';
import VideoUpload from './VideoUpload'
import UploadComponent from '../ImageUploader/UploadComponent'
import axios from 'axios';
import { Select, Spin, message, Input } from 'antd';
import { NavLink } from 'react-router-dom';
const { Option } = Select;

const Books = () => {
    const initialstate = {
        bookType: "",
        bookName: "",
        authorName: "",
        price: "",
        countryID: "",
        countries: [],
        univID: "",
        universities: [],
        schoolName: "",
        colleges: [],
        professors: [],
        subjects: [],
        SubjectName: "",
        postKind: "",
        contactMethod: "",
        phoneNo: "",
        feature: "",
        bookCondition: "",
        images: [],
        users: [],
        error: "",
        update: false
    }
    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { bookType, bookName, authorName, price, countryID, countries, univID, universities, schoolName, colleges, professors, subjects, SubjectName, postKind, contactMethod, phoneNo, feature, bookCondition, users, error, images, update } = DetailData;

    const handleChange = (event) => {
        const { name, value } = event.target
        setDetailData({
            ...DetailData,
            [name]: value
        })
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
        else if (name === "schoolName") {
            getAllMajors(e)
        }
        // else if (name === "majorID") {
        //     getAllSubjects(e)
        // }
        // else if(name === "majorID") {
        //     getAllSubjects(e)
        // }

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
            const response = await axios.get(`api/admin/subject/getSubjectByCollege?collegeID=${id}`)
            console.log(response)
            if (response.data.success) {
                setDetailData({
                    ...DetailData,
                    subjects: response.data.data.docs,
                    update: true,
                })
            }
        }
        loadMajors()
    }

    const makeVeriArray = (img) => {
        setDetailData({
            ...DetailData,
            error: ""
        })
        images.push(img)
        console.log("l", images)
    }

    const verification = (imageArray) => {
        while (images.length > 0) {
            images.pop();
        }
        // eslint-disable-next-line
        imageArray.map((detail) => {
            makeVeriArray(detail.originFileObj)
        })
    }

    const SubmitForm = (event) => {
        event.preventDefault()
        let formData = new FormData();
        formData.append("bookType", bookType);
        formData.append("bookName", bookName);
        formData.append("authorName", authorName);
        formData.append("bookCondition", bookCondition);
        formData.append("schoolName", schoolName);
        formData.append("SubjectName", SubjectName);
        formData.append("price", price);
        formData.append("contactMethod", contactMethod);
        formData.append("phoneNo", phoneNo);
        // formData.append("description", description);
        images.map(img => {
            formData.append('images', img)
            return (
                <React.Fragment></React.Fragment>
            )
        })
        const link = `api/user/BookStore/add`
        axios.post(link, formData
        )
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('Book Added Successfully')
                    window.location = "/books"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }

    const validation = () => {
        if (bookType !== "") {
            if (countries !== "") {
                if (universities !== "") {
                    if (colleges !== "") {
                        if (SubjectName !== "") {
                            if (bookName !== "") {
                                if (authorName !== "") {
                                    if (contactMethod !== "") {
                                        if (phoneNo !== "") {
                                            if (feature !== "") {
                                                SubmitForm()
                                            }
                                            else {
                                                setDetailData({
                                                    ...DetailData,
                                                    error: "Feature is Required"
                                                })
                                                message.error('Feature is Required')
                                            }
                                        }
                                        else {
                                            setDetailData({
                                                ...DetailData,
                                                error: "Phone number is Required"
                                            })
                                            message.error('Phone number is Required')
                                        }
                                    }
                                    else {
                                        setDetailData({
                                            ...DetailData,
                                            error: "Contact Method is Required"
                                        })
                                        message.error('Contact Method is Required')
                                    }
                                }
                                else {
                                    setDetailData({
                                        ...DetailData,
                                        error: "Author Name is Required"
                                    })
                                    message.error('Author Name is Required')
                                }
                            }
                            else {
                                setDetailData({
                                    ...DetailData,
                                    error: "Book Name is Required"
                                })
                                message.error('Book Name is Required')
                            }
                        }
                        else {
                            setDetailData({
                                ...DetailData,
                                error: "Subject Name is Required"
                            })
                            message.error('Subject Name is Required')
                        }
                    }
                    else {
                        setDetailData({
                            ...DetailData,
                            error: "College is Required"
                        })
                        message.error('College is Required')
                    }
                }
                else {
                    setDetailData({
                        ...DetailData,
                        error: "University is Required"
                    })
                    message.error('University is Required')
                }
            }
            else {
                setDetailData({
                    ...DetailData,
                    error: "Country is Required"
                })
                message.error('Country is Required')
            }
        }
        else {
            setDetailData({
                ...DetailData,
                error: "Select Book Post Kind"
            })
            message.error('Select Book Post Kind')
        }
    }

    if (update !== true) {
        return <Spin size="large" />
    }
    else if (update === true) {
        return (
            <React.Fragment>
            <div className="container-fluid mb-6 p-4">
                <div className="row col-11 mx-auto pt-2">
                    <p className="mr-auto my-auto">Book Post</p>
                    <NavLink to="/bookrequests"> <button className="btn skyblue White ml-auto rounded-0">Book Requests</button></NavLink>
                    <NavLink to="/allbooks"> <button className="btn review ml-auto rounded-0">All Books</button></NavLink>
                </div>
                <div className="col-11 mx-auto mb-5">
                    <h3 className="text-center">Book Post Ad</h3>
                    <div className="col-12 col-md-10 col-lg-8 mx-auto ">
                        <form className="row text-center form my-5 postAdd">
                            <div className="col-12 px-0">
                                <ul className="col-12 col-md-8 mx-auto combineButton form RadioToButton d-inline-flex px-0 mb-4">
                                    <li className="w-50">
                                        <input
                                            type="radio"
                                            id="For Sale"
                                            name="bookType"
                                            value="For Sale"
                                            onClick={handleChange} />
                                        <label for="For Sale" className="py-2 mb-0 Bold">For Sale</label>
                                    </li>
                                    <li className="w-50">
                                        <input
                                            type="radio"
                                            id="Requested"
                                            name="bookType"
                                            value="Requested"
                                            onClick={handleChange} />
                                        <label for="Requested" className="py-2 mb-0 Bold">Requested</label>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-sm-6 mb-4 px-1 form-group">
                                <Input
                                    required
                                    type="text"
                                    name="bookName"
                                    value={bookName}
                                    onChange={handleChange}
                                    className="form-control Radius_20"
                                    placeholder="Book Name" />
                                <label for="BookName">Book Name</label>
                            </div>
                            <div className="col-12 col-sm-6 mb-4 px-1 form-group">
                                <input
                                    type="text"
                                    name="authorName"
                                    value={authorName}
                                    onChange={handleChange}
                                    className="mr-auto form-control Round25"
                                    placeholder="Aurthor name" />
                                <label for="AutherName">Auther Name</label>
                            </div>

                            <div className="col-12 col-sm-6 mb-4 px-1 form-group">
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
                            <div className="col-12 col-sm-6 mb-4 px-1 form-group">
                                <Select
                                    showSearch
                                    className="col-12"
                                    placeholder="Select University"
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
                                        {
                                            universities.map(item => {
                                                return <Option value={item.univID}>{item.univName}</Option>
                                            })
                                        }
                                            </React.Fragment>}
                                    </Select>
                                </div>

                        <div className="col-12 col-sm-6 mb-4 px-1 form-group">
                            <Select
                                showSearch
                                className="col-12"
                                placeholder="Select College"
                                optionFilterProp="children"
                                onChange={(e) => onchange(e, 'schoolName')}
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
                                    {
                                        colleges.map(item => {
                                            return <Option value={item.collegeID}>{item.collegeName}</Option>
                                        })
                                    }
                                            </React.Fragment>}
                                    </Select>
                    </div>

                    <div className="col-12 col-sm-6 mb-4 px-1 form-group">
                        <Select
                            showSearch
                            className="col-12"
                            placeholder="Select Subject Name"
                            optionFilterProp="children"
                            onChange={(e) => onchange(e, 'SubjectName')}
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
                                {
                                    subjects.map(item => {
                                        return <Option value={item.subjectID}>{item.subjectName}</Option>
                                    })
                                }
                                            </React.Fragment>}
                                    </Select>
                </div>
                <div className="col-12 col-sm-6 mb-4 px-1 form-group">
                    <Select
                        className="col-12"
                        placeholder="Select Contact Method"
                        optionFilterProp="children"
                        onChange={(e) => onchange(e, 'contactMethod')}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="Email">Email</Option>
                        <Option value="Phone">Phone</Option>
                    </Select>
                </div>
                <div className="col-12 col-sm-6 mb-4 px-1">
                    {contactMethod === "Email" ?
                        <Input
                            type="text"
                            value={phoneNo}
                            placeholder="Email Address"
                            name="phoneNo"
                            containerClass="mb-3 mr-auto"
                            className="form-control Radius_20"
                            onChange={phoneNo => setDetailData({ ...DetailData, phoneNo })}
                        />
                        :
                        <PhoneInput
                            value={phoneNo}
                            name="phoneNo"
                            containerClass="mb-3 mr-auto"
                            inputClass="Round25"
                            country={'kw'}
                            onChange={contact => setDetailData({ ...DetailData, contact })}
                        />

                    }

                </div>
                {bookType === "For Sale" || bookType === "" ?
                                    <React.Fragment>
                                        <div className="col-12">
                                            <h4 className="mb-4 text-center">Book Condition</h4>
                                        </div>
                                        <div className="col-12 mx-auto px-0">
                                            <ul className="Tags RadioToButton row px-0">
                                                <li className="col-4 col-sm-3 col-md-4 col-lg-3 mx-auto px-1">
                                                    <input type="radio"
                                                        id="Damaged"
                                                        name="bookCondition"
                                                        value="Damaged"
                                                        onClick={handleChange} />
                                                    <label className="w-100 py-2" for="Damaged">Damaged</label>
                                                </li>
                                                <li className="col-4 col-sm-3 col-md-4 col-lg-3 mx-auto px-1">
                                                    <input
                                                        type="radio"
                                                        id="Annotated"
                                                        name="bookCondition"
                                                        value="Annotated"
                                                        onClick={handleChange} />
                                                    <label className="w-100 py-2" for="Annotated">Annotated</label>
                                                </li>
                                                <li className="col-4 col-sm-3 col-md-4 col-lg-3 mx-auto px-1">
                                                    <input type="radio"
                                                        id="Good"
                                                        name="bookCondition"
                                                        value="Good"
                                                        onClick={handleChange} />
                                                    <label className="w-100 py-2" for="Good">Good</label>
                                                </li>
                                                <li className="col-4 col-sm-3 col-md-4 col-lg-3 mx-auto px-1">
                                                    <input type="radio"
                                                        id="Like New"
                                                        name="bookCondition"
                                                        value="like New"
                                                        onClick={handleChange} />
                                                    <label className="w-100 py-2" for="Like New">Like New</label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-12 col-sm-4 mb-4 px-1 form-group">
                                            <Input
                                                type="text"
                                                id="Price"
                                                name="price"
                                                placeholder="Price"
                                                value={price}
                                                onChange={handleChange}
                                                className=" form-control Radius_20"
                                            />
                                            <label for="Price">Price</label>
                                        </div>
                                    </React.Fragment>
                                    :
''
                                }
<div className="col-8 px-0">
    <ul className="col-12 col-md-8 combineButton form RadioToButton d-inline-flex px-0">
        <li className="w-50">
            <input
                type="radio"
                id="Feature"
                name="feature"
                value="Feature"
                onClick={handleChange} />
            <label for="Feature" className="py-2 mb-0 Bold">Featured</label>
        </li>
        <li className="w-50">
            <input
                type="radio"
                id="Non-Featured"
                name="feature"
                value="Non-Featured"
                onClick={handleChange} />
            <label for="Non-Featured" className="py-2 mb-0 Bold">Non-Featured</label>
        </li>
    </ul>
</div>
                            </form >
                            <div className="form-group">
                                <p for="exampleFormControlFile1">Upload upto 5 Images</p>
                                <UploadComponent limit={5} imagesSet={verification} />
                            </div>
                            <div className="form-group">
                                <p for="exampleFormControlFile2">Upload Video</p>
                                <VideoUpload />
                            </div>
                            <div className="col-12 col-md-3 form-group mx-auto mb-4">
                                <button
                                    className="btn skyblue White mt-2 text-center"
                                    type="button" onClick={validation}>
                                    Submit
                                </button>
                            </div>
                        </div >
                    </div >
    <div>
        <h6>Available Books</h6>
        <div >
            <BookComponent data={BooksData} />
        </div>
    </div>
                </div >
            </React.Fragment >
        );
    }
}

export default Books;