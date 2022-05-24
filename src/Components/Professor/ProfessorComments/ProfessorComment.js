import React, { useEffect, useState } from 'react';
import "./FontAwesomeIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { message, Select, Spin } from 'antd';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const { Option } = Select;

const ProfessorComment = () => {
    const initialstate = {
        countryID: "",
        countries: [],
        univID: "",
        universities: [],
        collegeID: "",
        colleges: [],
        majorID: "",
        majors: [],
        profID: "",
        professors: [],
        subjectID: "",
        subjects: [],
        grade: "",
        year: "",
        class2: "",
        class1: "",
        rating: "",
        TeachingStyle: "",
        attendence: "",
        project: "",
        homework: "",
        curve: "",
        tags: [],
        Inspirational: true,
        GroupProjects: false,
        GetReadytoRead1: false,
        GetReadytoRead2: false,
        YouAttendToPass: false,
        DependsOnNotes: false,
        Reading24_7: false,
        VeryHeavy: false,
        YouWillLoveTheClass: false,
        FocusOnTheSlides: false,
        exams: "",
        comment: "",
        reference: "",
        update: false,
        error: ""
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { countryID, countries, univID, universities, collegeID, colleges, majorID, majors, profID, professors, subjectID, subjects, tags, grade, year, class2, class1, rating, TeachingStyle, attendence, project, homework, curve, Inspirational, GroupProjects, GetReadytoRead1, GetReadytoRead2, exams, comment, reference, update, error } = DetailData;

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
        else if (name === "majorID") {
            getAllSubjects(e)
        }
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

    const getAllProf = (id, olderResponce) => {
        const loadProfs = async () => {
            const response = await axios.get(`api/admin/professor/list?majorID=${id}`)
            console.log(response)
            if (response.data.success) {
                if (olderResponce.success) {
                    setDetailData({
                        ...DetailData,
                        professors: response.data.data.docs,
                        subjects: olderResponce.data.docs,
                        update: true,
                    })
                }
                else {
                    setDetailData({
                        ...DetailData,
                        professors: response.data.data.docs,
                        update: true,
                    })
                }
            }
        }
        loadProfs()
    }

    const getAllSubjects = (id) => {
        const loadSubjects = async () => {
            const response = await axios.get(`api/admin/subject/list?majorID=${id}`)
            console.log(response)
            getAllProf(id, response.data)
        }
        loadSubjects()
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        if (type === "checkbox") {
            setDetailData({
                ...DetailData,
                [name]: checked
            })
            var a = document.getElementsByClassName('chkbox')
            var counter = 0;
            for (var count = 0; count < a.length; count++) {
                if (a[count].checked === true) {
                    counter++
                }
            }

            if (counter > 3) {
                document.getElementById('chkbox').innerHTML = "Select upto Three"
                return false
            }
            if (counter < 4) {
                document.getElementById('chkbox').innerHTML = ""
                return false
            }
        }

        if ([name] === "grade") {
            if (value.length > 0) {
                setDetailData({
                    ...DetailData,
                    class1: "Valued"
                }
                )
            }
            else {
                setDetailData({
                    ...DetailData,
                    class1: ""
                }
                )
            }
        } if ([name] === "year") {
            if (value.length > 0) {
                setDetailData({
                    ...DetailData,
                    class2: "Valued"
                }
                )
            }
            else {
                setDetailData({
                    ...DetailData,
                    class2: " "
                }
                )
            }
        }
        else {
            setDetailData({
                ...DetailData,
                [name]: value
            })
        }
    }

    const SubmitForm = () => {
        const tags = [
            Inspirational ? "Inspirational" : null,
            GroupProjects ? "GroupProjects" : null,
            GetReadytoRead1 ? "GetReadytoRead1" : null,
            // GetReadytoRead2 ? "GetReadytoRead2" : ""
        ]
        //   tags.push(Tags)
        axios.post(`api/admin/professor/comment/add`, {
            subjectID: subjectID,
            profID: profID,
            year: year,
            grade: grade,
            rating: rating.toString(),
            exams: exams,
            project: project,
            homework: homework,
            attendence: attendence,
            curve: curve,
            comment: comment,
            tags: tags,
            reference: reference
        }
        )
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success('Comment Added Successfully')
                    window.location = "/professorcomment"
                }
                else {
                    message.error(response.data.message)
                }
            })
    }

    const validation = () => {
        if (countries !== "") {
            if (universities !== "") {
                if (colleges !== "") {
                    if (professors !== "") {
                        if (subjects !== "") {
                            if (grade !== "") {
                                if (year !== "") {
                                    // if (rating !== "") {
                                    if (rating !== "") {
                                        if (TeachingStyle !== "") {
                                            if (attendence !== "") {
                                                if (homework !== "") {
                                                    if (project !== "") {
                                                        if (curve !== "") {
                                                            if (tags !== "") {
                                                                if (exams !== "") {
                                                                    // if (takeWithHim !== "") {
                                                                    if (comment !== "") {
                                                                        if (reference !== "") {
                                                                            SubmitForm()
                                                                            setDetailData({
                                                                                ...DetailData,
                                                                                error: ""
                                                                            })
                                                                        }
                                                                        else {
                                                                            setDetailData({
                                                                                ...DetailData,
                                                                                error: "Select Reference"
                                                                            })
                                                                        }
                                                                    }
                                                                    else {
                                                                        setDetailData({
                                                                            ...DetailData,
                                                                            error: "Please Type Your Comment"
                                                                        })
                                                                    }
                                                                    // }
                                                                    // else {
                                                                    //     setDetailData({
                                                                    //         ...DetailData,
                                                                    //         error: "Select Take with Him"
                                                                    //     })
                                                                    // }
                                                                }
                                                                else {
                                                                    setDetailData({
                                                                        ...DetailData,
                                                                        error: "Select Exams"
                                                                    })
                                                                }
                                                            }
                                                            else {
                                                                setDetailData({
                                                                    ...DetailData,
                                                                    error: "Select Tags"
                                                                })
                                                            }
                                                        }
                                                        else {
                                                            setDetailData({
                                                                ...DetailData,
                                                                error: "Select Curve"
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        setDetailData({
                                                            ...DetailData,
                                                            error: "Select Projects"
                                                        })
                                                    }
                                                }
                                                else {
                                                    setDetailData({
                                                        ...DetailData,
                                                        error: "Select Homework"
                                                    })
                                                }
                                            }
                                            else {
                                                setDetailData({
                                                    ...DetailData,
                                                    error: "Select Attendance"
                                                })
                                            }
                                        }
                                        else {
                                            setDetailData({
                                                ...DetailData,
                                                error: "Select Teaching Style"
                                            })
                                        }
                                        // }
                                        // else {
                                        //     setDetailData({
                                        //         ...DetailData,
                                        //         error: "Select Hardness Level"
                                        //     })
                                        // }
                                    }
                                    else {
                                        setDetailData({
                                            ...DetailData,
                                            error: "Select Rating"
                                        })
                                    }
                                }
                                else {
                                    setDetailData({
                                        ...DetailData,
                                        error: "Select Year"
                                    })
                                }
                            }
                            else {
                                setDetailData({
                                    ...DetailData,
                                    error: "Select grade"
                                })
                            }
                        }
                        else {
                            setDetailData({
                                ...DetailData,
                                error: "Select Subject"
                            })
                        }
                    }
                    else {
                        setDetailData({
                            ...DetailData,
                            error: "Professor is Required"
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
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="row col-11 mx-auto  ">
                        <p className="mr-auto my-auto">Professor &gt; Add Professor Comment</p>
                        <NavLink to="/commentrequests"> <button className="btn skyblue White ml-auto ">Comments Requests</button></NavLink>
                    </div>
                    <div className="col-11 col-md-10 mx-auto">
                        <div className="row col-12 col-md-10 col-lg-8 mx-auto ShadowBordr p-4">
                            <div className="row col-12  mx-auto Floating px-0">
                                <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
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
                                <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
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
                                            {
                                                universities.map(item => {
                                                    return <Option value={item.univID}>{item.univName}</Option>
                                                })
                                            }
                                                </React.Fragment>}
                                        </Select>
                            </div>
                        </div>

                        <div className="row col-12  mx-auto Floating px-0 pt-2">
                            <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
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
                                        {
                                            colleges.map(item => {
                                                return <Option value={item.collegeID}>{item.collegeName}</Option>
                                            })
                                        }
                                                </React.Fragment>}
                                        </Select>
                        </div>
                        <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
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
                                    {
                                        majors.map(item => {
                                            return <Option value={item.majorID}>{item.majorName}</Option>
                                        })
                                    }
                                                </React.Fragment>}
                                        </Select>
                    </div>

                    <div className="row col-12  mx-auto Floating px-0 pt-2">
                        <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
                            <Select
                                showSearch
                                placeholder="Select Professor"
                                className="col-12"
                                optionFilterProp="children"
                                onChange={(e) => onchange(e, 'profID')}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {majors === "" ?
                                    <Option >Select Major First</Option>
                                    :
                                    <React.Fragment>
                                    {
                                        professors.map(item => {
                                            return <Option value={item.profID}>{item.profName}</Option>
                                        })
                                    }
                                                    </React.Fragment>}
                                            </Select>
                    </div>
                    <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
                        <Select
                            showSearch
                            placeholder="Select Subject"
                            className="col-12"
                            optionFilterProp="children"
                            onChange={(e) => onchange(e, 'subjectID')}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {majors === "" ?
                                <Option >Select Major First</Option>
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
            </div>
                                </div >

                                <div className="row col-12  mx-auto Floating px-0 pt-2">
                                    <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
                                        <Select
                                            
                                            placeholder="Select grade"
                                            className="col-12"
                                            optionFilterProp="children"
                                            onChange={(e) => onchange(e, 'grade')}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                        >
                                            <Option value="A">A</Option>
                                            <Option value="A-">A-</Option>
                                            <Option value="B+">B+</Option>
                                            <Option value="B">B</Option>
                                            <Option value="B-">B-</Option>
                                            <Option value="C+">C+</Option>
                                            <Option value="C">C</Option>
                                            <Option value="C-">C-</Option>
                                            <Option value="D+">D+</Option>
                                            <Option value="D">D</Option>
                                            <Option value="D-">D-</Option>
                                            <Option value="F">F</Option>
                                        </Select>
                                    </div>
                                    <div className="col-12 col-md-6 form-group px-1 mb-2 my-md-0">
                                        <Select
                                            showSearch
                                            placeholder="Select Year"
                                            className="col-12"
                                            optionFilterProp="children"
                                            onChange={(e) => onchange(e, 'year')}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                        >
                                            <Option value="2020">2020</Option>
                                            <Option value="2021">2021</Option>
                                            <Option value="2022">2022</Option>
                                            <Option value="2023">2023</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="col-12 text-center mt-3">
                                    <h6 className="FS_16 mb-0">Rating</h6>
                                </div>
                                <div className="col-12 rating-wrapper mt-3 px-0">
                                    <label className="rating-label mx-auto">
                                        <div className="ratingItemList mx-auto p-0 d-flex ">
                                            <input className="d-none rating rating-1" id="rating-1-2" type="radio" value={1} onClick={handleChange}
                                                name="rating" />
                                            <label className="rating rating-1" for="rating-1-2"><FontAwesomeIcon icon="star" color="rgb(254, 193, 7)" />
                                                <p className="Bold Black FS_10 p-2"> Very Poor</p>
                                            </label>
                                            <input className="d-none rating rating-2" id="rating-2-2" type="radio" value={2} onClick={handleChange}
                                                name="rating" />
                                            <label className="rating rating-2" for="rating-2-2"><FontAwesomeIcon icon="star" color="rgb(254, 193, 7)" />
                                                <p className="Bold Black FS_10 p-2"> Poor</p>
                                            </label>
                                            <input className="d-none rating rating-3" id="rating-3-2" type="radio" value={3} onClick={handleChange}
                                                name="rating" />
                                            <label className="rating rating-3" for="rating-3-2"><FontAwesomeIcon icon="star" color="rgb(254, 193, 7)" />
                                                <p className="Bold Black FS_10 p-2"> Good</p>
                                            </label>
                                            <input className="d-none rating rating-4" id="rating-4-2" type="radio" value={4} onClick={handleChange}
                                                name="rating" />
                                            <label className="rating rating-4" for="rating-4-2"><FontAwesomeIcon icon="star" color="rgb(254, 193, 7)" />
                                                <p className="Bold Black FS_10 p-2"> Very Good</p>
                                            </label>
                                            <input className="d-none rating rating-5" id="rating-5-2" type="radio" value={5} onClick={handleChange}
                                                name="rating" />
                                            <label className="rating rating-5" for="rating-5-2"><FontAwesomeIcon icon="star" color="rgb(254, 193, 7)" />
                                                <p className="Bold Black FS_10 p-2"> One of a Kind</p>
                                            </label>
                                        </div>
                                    </label>
                                </div>
                                <div className="col-12 text-center px-0">
                                    <p className="FS_16 mb-0">Teaching Style</p>
                                </div>
                                <div className="col-12 text-center mt-3 px-0">
                                    <ul className="Tags RadioToButton row px-0">
                                        <li className="col-4 col-md-3 mx-auto px-1">
                                            <input type="radio"
                                                id="Onslide"
                                                name="TeachingStyle"
                                                value="Onslide"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 FS_12" for="Onslide">On slide</label>
                                        </li>
                                        <li className="col-4 col-md-3 mx-auto px-1">
                                            <input type="radio"
                                                id="OnBoard"
                                                name="TeachingStyle"
                                                value="OnBoard"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 FS_12" for="OnBoard">On Board</label>
                                        </li>
                                        <li className="col-4 col-md-3 mx-auto px-1">
                                            <input type="radio"
                                                id="Both"
                                                name="TeachingStyle"
                                                value="Both"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 FS_12" for="Both">Both</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row col-12 px-0 mt-3">
                                    <div className="col-12 col-sm-6 text-center borderRight">
                                        <h5>Attandance</h5>
                                        <ul class="w-100 combineButton RadioToButton d-inline-flex px-0 my-1">
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="Takes Attandance"
                                                    name="attendence"
                                                    value="Takes Attendance"
                                                    onClick={handleChange} />
                                                <label for="Takes Attandance" className="py-1 mb-0 Bold FS_12">Takes</label>
                                            </li>
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="Don't Takes Attandance"
                                                    name="attendence"
                                                    value="Don't Takes Attendance"
                                                    onClick={handleChange} />
                                                <label for="Don't Takes Attandance" className="py-1 mb-0 Bold FS_12">Don't Takes</label>
                                            </li>
                                        </ul>
                                        <h5 className="mt-3">Project</h5>
                                        <ul class="w-100 combineButton RadioToButton d-inline-flex px-0 my-1">
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="Gives Project"
                                                    name="project"
                                                    value="Gives Project"
                                                    onClick={handleChange} />
                                                <label for="Gives Project" className="py-1 mb-0 Bold FS_12">Gives</label>
                                            </li>
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="Don't Give Project"
                                                    name="project"
                                                    value="Don't Give Project"
                                                    onClick={handleChange} />
                                                <label for="Don't Give Project" className="py-1 mb-0 Bold FS_12">Don't Give</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-6  text-center">
                                        <h5>Homework</h5>
                                        <ul class="w-100 combineButton RadioToButton d-inline-flex px-0 my-1">
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="GivesHomeWork"
                                                    name="homework"
                                                    value="Give Homework"
                                                    onClick={handleChange} />
                                                <label for="GivesHomeWork" className="py-1 mb-0 Bold FS_12">Give</label>
                                            </li>
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="Don't Gives Homework"
                                                    name="homework"
                                                    value="Don't Gives Homework"
                                                    onClick={handleChange} />
                                                <label for="Don't Gives Homework" className="py-1 mb-0 Bold FS_12">Don't Gives</label>
                                            </li>
                                        </ul>
                                        <h5 className="mt-3">Curve</h5>
                                        <ul class="w-100 combineButton RadioToButton d-inline-flex px-0 my-1">
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="Give Curves"
                                                    name="curve"
                                                    value="Give curve"

                                                    onClick={handleChange} />
                                                <label for="Give Curves" className="py-1 mb-0 Bold FS_12">Give</label>
                                            </li>
                                            <li className="w-50">
                                                <input
                                                    type="radio"
                                                    id="Don't Gives Curves"
                                                    name="curve"
                                                    value="Don't Gives Curve"
                                                    onClick={handleChange} />
                                                <label for="Don't Gives Curves" className="py-1 mb-0 Bold FS_12">Don't Gives</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-12 mt-3 text-center px-0 RadioToButton Tags">
                                    <p className="FS_16 mt-3">Select up to three tags that best describe your subject</p>
                                    <p className="m-0" style={{ color: "red" }} id="chkbox"></p>
                                    <div className="form-check-inline col-5 col-sm-3 mx-auto px-1">
                                        <input
                                            type="checkbox"
                                            id="Inspirational"
                                            className="chkbox"
                                            name="Inspirational"
                                            value="Inspirational"
                                            checked={Inspirational}
                                            onClick={handleChange} />
                                        <label className="mb-0 w-100 py-2 FS_10" for="Inspirational">Inspirational</label>
                                    </div>
                                    <div className="form-check-inline col-5 col-sm-3 mx-auto mt-3 px-1">
                                        <input
                                            type="checkbox"
                                            id="Group Projects"
                                            className="chkbox"
                                            name="GroupProjects"
                                            value="GroupProjects"
                                            checked={GroupProjects}
                                            onChange={handleChange} />
                                        <label className="mb-0 w-100 py-2 FS_10" for="Group Projects">Group Projects</label>
                                    </div>
                                    <div className="form-check-inline col-5 col-sm-3 mx-auto mt-3 px-1">
                                        <input
                                            type="checkbox"
                                            id="Get Ready to Read"
                                            className="chkbox"
                                            checked={GetReadytoRead1}
                                            name="GetReadytoRead1"
                                            value="GetReadytoRead1"
                                            onChange={handleChange} />
                                        <label className="mb-0 w-100 py-2 FS_10" for="Get Ready to Read">Get Ready to Read</label>
                                    </div>
                                    <div className="form-check-inline col-5 col-sm-3 mx-auto mt-3 px-1">
                                        <input
                                            type="checkbox"
                                            id="Get Ready to Read 2"
                                            name="GetReadytoRead2"
                                            value="GetReadytoRead2"
                                            className="chkbox"
                                            checked={GetReadytoRead2}
                                            onChange={handleChange} />
                                        <label className="mb-0 w-100 py-2 FS_10" for="Get Ready to Read 2">Get Ready to Read</label>
                                    </div>
                                </div>
{ console.log(tags) }
                                <div className="col-12 mt-3 text-center px-0 RadioToButton Tags">
                                    <p className="FS_16 mb-0">Exam Form</p>
                                    <ul class="row Tags RadioToButton px-0">
                                        <li className="mx-auto px-1 mt-3">
                                            <input type="radio"
                                                id="Books"
                                                name="exams"
                                                value="Books"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 px-3 FS_10" for="Books">Books</label>
                                        </li>
                                        <li className="mx-auto px-1 mt-3">
                                            <input type="radio"
                                                id="Notes"
                                                name="exams"
                                                value="Notes"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 px-3 FS_10" for="Notes">Notes</label>
                                        </li>
                                        <li className="mx-auto px-1 mt-3">
                                            <input type="radio"
                                                id="Notes&Books"
                                                name="exams"
                                                value="Notes&Books"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 px-3 FS_10" for="Notes&Books">Notes&Books</label>
                                        </li>
                                        <li className="mx-auto px-1 mt-3">
                                            <input type="radio"
                                                id="PastExams"
                                                name="exams"
                                                value="PastExams"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 px-3 FS_10" for="PastExams">Past Exams</label>
                                        </li>
                                        <li className="mx-auto px-1 mt-3">
                                            <input type="radio"
                                                id="Imposible"
                                                name="exams"
                                                value="Imposible"
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 px-3 FS_10" for="Imposible">Imposible</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-12 px-0">
                                    <textarea
                                        id="Description" name="comment"
                                        value={comment}
                                        placeholder="Share Your experience with Professor&#10;NameX here.."
                                        rows="5"
                                        onChange={handleChange}
                                        className="my-3 p-3"
                                    ></textarea>
                                </div>
                                <div className="col-12 mx-auto pt-2">
                                    <select className="form-control reference"
                                        name="reference"
                                        value={reference}
                                        onChange={handleChange}>
                                        <option selected value="">Reference</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="Instagram">Instagram</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-3 form-group mx-auto mb-4 pt-3">
                                    <button
                                        className="btn skyblue White mt-2 text-center" onClick={validation}
                                        type="button" >
                                        Submit
                                    </button>
                                </div>
                            </div >
    <p className="text-danger text-center mb-0py-2" style={{ fontSize: "20px", fontWeight: "500" }}> {error}</p>
                        </div >
                    </div >
                </div >
            </React.Fragment >
        );
    }
}

export default ProfessorComment;