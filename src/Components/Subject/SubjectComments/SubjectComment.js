// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Select, Spin } from 'antd';
// import axios from 'axios';
// const { Option } = Select;

// const SubjectComment = () => {

//     const initialstate = {
//         comment: "",
//         country: "",
//         university: "",
//         college: "",
//         major: "",
//         subject: "",
//         grade: "",
//         year: "",
//         rating: "",
//         hardness: "",
//         teachingStyle: "",
//         attendance: "",
//         homework: "",
//         projects: "",
//         curve: "",
//         exams: "",
//         tags: "",
//         takeWithHim: "",
//         reference: "",
//         users: [],
//         error: "",
//         update: false
//     }

//     const [FormData, setFormData] = useState(initialstate);
//     const { comment, country, university, college, subject, major, grade, year, rating, hardness, teachingStyle,
//         attendance, homework, projects, curve, exams, tags, takeWithHim, reference, users, error, update } = FormData;

//     const onHandleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({
//             ...FormData,
//             [name]: value
//         })
//     }

//     const onchange = (e, name) => {
//         console.log('event', e, name)
//         setFormData({
//             ...FormData,
//             [name]: e
//         })
//         console.log(FormData)
//     }

//     useEffect(() => {
//         const loadUsers = async () => {
//             const response = await axios.get('https://reqres.in/api/users')
//             console.log(response)
//             setFormData({
//                 ...FormData,
//                 users: response.data.data,
//                 update: true
//             })
//         }
//         loadUsers()
//         // eslint-disable-next-line
//     }, [])

//     const validation = () => {
//         if (country !== "") {
//             if (university !== "") {
//                 if (college !== "") {
//                     if (major !== "") {
//                         if (subject !== "") {
//                             if (grade !== "") {
//                                 if (year !== "") {
//                                     if (rating !== "") {
//                                         if (hardness !== "") {
//                                             if (teachingStyle !== "") {
//                                                 if (attendance !== "") {
//                                                     if (homework !== "") {
//                                                         if (projects !== "") {
//                                                             if (curve !== "") {
//                                                                 if (tags !== "") {
//                                                                     if (exams !== "") {
//                                                                         if (takeWithHim !== "") {
//                                                                             if (comment !== "") {
//                                                                                 if (reference !== "") {
//                                                                                     alert('Added Successfully')
//                                                                                 }
//                                                                                 else {
//                                                                                     setFormData({
//                                                                                         ...FormData,
//                                                                                         error: "Select Reference"
//                                                                                     })
//                                                                                 }
//                                                                             }
//                                                                             else {
//                                                                                 setFormData({
//                                                                                     ...FormData,
//                                                                                     error: "Please Type Your Comment"
//                                                                                 })
//                                                                             }
//                                                                         }
//                                                                         else {
//                                                                             setFormData({
//                                                                                 ...FormData,
//                                                                                 error: "Select Take with Him"
//                                                                             })
//                                                                         }
//                                                                     }
//                                                                     else {
//                                                                         setFormData({
//                                                                             ...FormData,
//                                                                             error: "Select Exams"
//                                                                         })
//                                                                     }
//                                                                 }
//                                                                 else {
//                                                                     setFormData({
//                                                                         ...FormData,
//                                                                         error: "Select Tags"
//                                                                     })
//                                                                 }
//                                                             }
//                                                             else {
//                                                                 setFormData({
//                                                                     ...FormData,
//                                                                     error: "Select Curve"
//                                                                 })
//                                                             }
//                                                         }
//                                                         else {
//                                                             setFormData({
//                                                                 ...FormData,
//                                                                 error: "Select Projects"
//                                                             })
//                                                         }
//                                                     }
//                                                     else {
//                                                         setFormData({
//                                                             ...FormData,
//                                                             error: "Select Homework"
//                                                         })
//                                                     }
//                                                 }
//                                                 else {
//                                                     setFormData({
//                                                         ...FormData,
//                                                         error: "Select Attendance"
//                                                     })
//                                                 }
//                                             }
//                                             else {
//                                                 setFormData({
//                                                     ...FormData,
//                                                     error: "Select Teaching Style"
//                                                 })
//                                             }
//                                         }
//                                         else {
//                                             setFormData({
//                                                 ...FormData,
//                                                 error: "Select Hardness Level"
//                                             })
//                                         }
//                                     }
//                                     else {
//                                         setFormData({
//                                             ...FormData,
//                                             error: "Select Rating"
//                                         })
//                                     }
//                                 }
//                                 else {
//                                     setFormData({
//                                         ...FormData,
//                                         error: "Select Year"
//                                     })
//                                 }
//                             }
//                             else {
//                                 setFormData({
//                                     ...FormData,
//                                     error: "Select Grade"
//                                 })
//                             }
//                         }
//                         else {
//                             setFormData({
//                                 ...FormData,
//                                 error: "Select Subject"
//                             })
//                         }
//                     }
//                     else {
//                         setFormData({
//                             ...FormData,
//                             error: "Major is Required"
//                         })
//                     }
//                 }
//                 else {
//                     setFormData({
//                         ...FormData,
//                         error: "College is Required"
//                     })
//                 }
//             }
//             else {
//                 setFormData({
//                     ...FormData,
//                     error: "University is Required"
//                 })
//             }
//         }
//         else {
//             setFormData({
//                 ...FormData,
//                 error: "Country is Required"
//             })
//         }
//     }

//     if (update !== true) {
//         return <Spin size="large" />
//     }
//     else if (update === true) {
//         return (
//             <React.Fragment>
//                 <div className="row mr-0">
//                     <div className="row col-11 mx-auto pt-2 ">
//                         <p className="mr-auto my-auto">Subject Comment &gt; Add Subject Comment</p>
//                         <NavLink to="/subjectcommentreq"> <button className="btn skyblue White ml-auto">Comment Requests</button></NavLink>
//                     </div>

//                     <form className="col-11 mx-auto pt-3">
//                         <div className="row">
//                             <div className="form-group col-md-3 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Select Country"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'country')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     {users.map(item => {
//                                         return <Option value={item.first_name}>{item.first_name}</Option>
//                                     })}
//                                 </Select>
//                             </div>
//                             <div className="form-group col-md-3">
//                                 <Select
//                                     showSearch
//                                     placeholder="Select University"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'university')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     {country === "" ?
//                                         <Option >Select Country First</Option>
//                                         :
//                                         <React.Fragment>
//                                             {users.map(item => {
//                                                 return <Option value={item.first_name}>{item.first_name}</Option>
//                                             })}
//                                         </React.Fragment>}
//                                 </Select>
//                             </div>
//                             <div className="form-group col-md-3">
//                                 <Select
//                                     showSearch
//                                     placeholder="Select College"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'college')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     {university === "" ?
//                                         <Option >Select University First</Option>
//                                         :
//                                         <React.Fragment>
//                                             {users.map(item => {
//                                                 return <Option value={item.first_name}>{item.first_name}</Option>
//                                             })}
//                                         </React.Fragment>}
//                                 </Select>
//                             </div>
//                             <div className="form-group col-md-3 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Select Major"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'major')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     {college === "" ?
//                                         <Option >Select College First</Option>
//                                         :
//                                         <React.Fragment>
//                                             {users.map(item => {
//                                                 return <Option value={item.first_name}>{item.first_name}</Option>
//                                             })}
//                                         </React.Fragment>}
//                                 </Select>
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Select Subject Name or Code"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'subject')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     {users.map(item => {
//                                         return <Option value={item.first_name}>{item.first_name}</Option>
//                                     })}
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     // style={{ width: 200 }}
//                                     placeholder="Select Grade"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'grade')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="A">A</Option>
//                                     <Option value="A-">A-</Option>
//                                     <Option value="B+">B+</Option>
//                                     <Option value="B">B</Option>
//                                     <Option value="B-">B-</Option>
//                                     <Option value="C+">C+</Option>
//                                     <Option value="C">C</Option>
//                                     <Option value="C-">C-</Option>
//                                     <Option value="D+">D+</Option>
//                                     <Option value="D">D</Option>
//                                     <Option value="D-">D-</Option>
//                                     <Option value="F">F</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     // style={{ width: 200 }}
//                                     placeholder="Select Year"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'year')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="2020">2020</Option>
//                                     <Option value="2021">2021</Option>
//                                     <Option value="2022">2022</Option>
//                                     <Option value="2023">2023</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     className="col-12"
//                                     placeholder="Select Rating"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'rating')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="unknown">Unknown</Option>
//                                     <Option value="verypoor">Very Poor</Option>
//                                     <Option value="poor">Poor</Option>
//                                     <Option value="average">Average</Option>
//                                     <Option value="verygood">Very Good</Option>
//                                 </Select>
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Headness Level"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'hardness')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="pass"> &#128526;	Pass</Option>
//                                     <Option value="easyA"> &#128532; Easy A</Option>
//                                     <Option value="usual">&#128528; The Usual</Option>
//                                     <Option value="hard">&#128534; Very Hard</Option>
//                                     <Option value="impossible">&#128529; Impossible</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     className="col-12"
//                                     placeholder="Teaching Style"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'teachingStyle')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="onSlides">On Slides</Option>
//                                     <Option value="onBoard">On Board</Option>
//                                     <Option value="both">Both</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Attendance"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'attendance')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="takes">Takes</Option>
//                                     <Option value="doesn't">Doesn't Take</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Homework"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'homework')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="gives">Gives</Option>
//                                     <Option value="doesn't">Doesn't Give</Option>
//                                 </Select>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Projects"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'projects')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="gives">Gives</Option>
//                                     <Option value="doesn't">Doesn't Give</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     className="col-12"
//                                     placeholder="Curve"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'curve')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="gives">Gives</Option>
//                                     <Option value="doesn't">Doesn't Give</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">

//                                 <Select
//                                     mode="multiple"
//                                     className="col-12"
//                                     allowClear
//                                     placeholder="Select Upto 3 Tags"
//                                     onChange={(e) => onchange(e, 'tags')}
//                                 >
//                                     <Option value="You Attend You Pass">You Attend You Pass</Option>)
//                                     <Option value="Depends on Notes">Depends on Notes</Option>
//                                     <Option value="Reading 24/7">Reading 24/7</Option>
//                                     <Option value="Very Heavy">Very Heavy</Option>
//                                     <Option value="You'll love the class">You'll love the class</Option>
//                                     <Option value="Focus on the Slides">Focus on the Slides</Option>
//                                     <Option value="Memorization is a must">Memorization is a must</Option>
//                                     <Option value="Need a tutor">Need a tutor</Option>
//                                     <Option value="Book is required">Book is required</Option>
//                                     <Option value="Past exams are must">Past exams are must</Option>
//                                     <Option value="Find Alternative">Find Alternative</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Exam From"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'exams')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="books">Books</Option>
//                                     <Option value="notes">Notes</Option>
//                                     <Option value="pastexams">Past Exams</Option>
//                                     <Option value="all">Books, Notes, Past Exams</Option>
//                                     <Option value="sky">The Sky</Option>
//                                 </Select>
//                             </div>
//                             <div className="form-group col-lg-3 col-md-6 col-12">
//                                 <Select
//                                     showSearch
//                                     placeholder="Take with Him Again"
//                                     className="col-12"
//                                     optionFilterProp="children"
//                                     onChange={(e) => onchange(e, 'takeWithHim')}
//                                     filterOption={(input, option) =>
//                                         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                                     }
//                                     filterSort={(optionA, optionB) =>
//                                         optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
//                                     }
//                                 >
//                                     <Option value="yes">Yes</Option>
//                                     <Option value="no">No</Option>
//                                 </Select>
//                             </div>
//                         </div>
//                         <div className=" justify-content-center">
//                             <div className="col-md-7 mx-auto">
//                                 <textarea type="text" style={{ resize: 'none' }}
//                                     className="form-control Radius_20"
//                                     placeholder="Comment"
//                                     name="comment"
//                                     value={comment}
//                                     onChange={onHandleChange} rows="5">
//                                 </textarea>
//                             </div>
//                             <div className="col-md-7 mx-auto pt-2">
//                                 <select className="form-control reference Radius_20"
//                                     name="reference"
//                                     value={reference}
//                                     onChange={onHandleChange}>
//                                     <option selected value="">Reference</option>
//                                     <option value="facebook">Facebook</option>
//                                     <option value="twitter">Twitter</option>
//                                     <option value="instagram">Instagram</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <button type="button" className="btn skyblue White mt-2 float-right" onClick={validation}>
//                             Submit
//                         </button>
//                         <p className="text-danger text-center mb-0py-2" style={{ fontSize: "20px", fontWeight: "500" }}> {error}</p>
//                     </form>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// export default SubjectComment;
import React, { useEffect, useState } from 'react';
import "./FontAwesomeIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Select, Spin } from 'antd';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const { Option } = Select;

const SubjectComment = () => {
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
        again: "",
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
    const { countryID, countries, univID, universities, collegeID, colleges, majorID, majors, profID, professors, subjectID, subjects, tags, grade, year, class2, class1, rating, again, TeachingStyle, attendence, project, homework, curve, Inspirational, GroupProjects, GetReadytoRead1, GetReadytoRead2, exams, comment, reference, update, error } = DetailData;

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
            GetReadytoRead2 ? "GetReadytoRead2" : null
        ]
        //   tags.push(Tags)
        axios.post(`api/admin/subject/comment/add`, {
            subjectID: subjectID,
            year: year,
            grade: grade,
            rating: rating,
            exams: exams,
            project: project,
            homework: homework,
            comment: comment,
            tags: tags,
            again: again,
            reference: reference
        }
        )
            .then((response) => {
                console.log(response)
                // if (response.data.success) {
                //     message.success('Comment Added Successfully')
                //     window.location = "/professorcomment"
                // }
                // else {
                //     message.error(response.data.message)
                // }
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
                        <div className="row col-11 mx-auto pt-2 ">
                            <p className="mr-auto my-auto">Subject Comment &gt; Add Subject Comment</p>
                            <NavLink to="/subjectcommentreq"> <button className="btn skyblue White ml-auto">Comment Requests</button></NavLink>
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
                                                    {universities.map(item => {
                                                        return <Option value={item.univID}>{item.univName}</Option>
                                                    })}
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
                                                    {colleges.map(item => {
                                                        return <Option value={item.collegeID}>{item.collegeName}</Option>
                                                    })}
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
                                                    {majors.map(item => {
                                                        return <Option value={item.majorID}>{item.majorName}</Option>
                                                    })}
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
                                                        {professors.map(item => {
                                                            return <Option value={item.profID}>{item.profName}</Option>
                                                        })}
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
                                                        {subjects.map(item => {
                                                            return <Option value={item.subjectID}>{item.subjectName}</Option>
                                                        })}
                                                    </React.Fragment>}
                                            </Select>
                                        </div>
                                    </div>
                                </div>

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

                                <div className="col-12 mt-3 text-center px-0 RadioToButton Tags">
                                    <p className="FS_16 mb-0">Take With Him Again?</p>
                                    <ul class="w-100 combineButton RadioToButton d-inline-flex px-0 my-1">
                                        <li className="mx-auto px-1 mt-3">
                                            <input type="radio"
                                                id="Yes"
                                                name="again"
                                                value={true}
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 px-3 FS_10" for="Yes">Yes</label>
                                        </li>
                                        <li className="mx-auto px-1 mt-3">
                                            <input type="radio"
                                                id="No"
                                                name="again"
                                                value={false}
                                                onClick={handleChange} />
                                            <label className="w-100 py-1 px-3 FS_10" for="No">No</label>
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
                            </div>
                            <p className="text-danger text-center mb-0py-2" style={{ fontSize: "20px", fontWeight: "500" }}> {error}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SubjectComment;