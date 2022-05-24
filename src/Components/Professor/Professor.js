import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Select, Input, Spin, message } from 'antd';
import './Professor.css';

const { Option } = Select;

const Professor = () => {
    const initialstate = {
        name: "",
        arName: "",
        countryID: "",
        countries: [],
        univID: "",
        universities: [],
        collegeID: "",
        colleges: [],
        majorID: "",
        majors: [],
        profLogo: [],
        error: "",
        update: false
    }

    let [addSingleProfessor , setAddSingleProfessor] = useState({
        university : '',
        country : '',
        major : '',
        college : '',
        NameEn : '',
        NameEr : ''
    })

    const addProfessor = (e) =>{
        e.preventDefault()
        console.log("professor is added")
        console.log(addSingleProfessor)
    }

    const onChangeSelectOption = (event) =>{
        event.preventDefault()
        const {name,value} = event.target
        setAddSingleProfessor({...addSingleProfessor , [name] : value})
    }

    const [DetailData, setDetailData] = useState(initialstate);
    // eslint-disable-next-line
    const { name, arName, countryID, countries, univID, universities, collegeID, colleges, majorID, majors, profLogo, error, update } = DetailData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;

        if (event.target.name === "name") {
            setDetailData({
                ...DetailData,
                name: event.target.value.replace(/[^a-zA-Z\s]/ig, '')
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
       
        if (name === 'countryID') {
            getAllUniv(e)
            setDetailData({
                ...DetailData,
                [name]: e
            })
        }
        else if (name === "univID") {
            getAllCollge(e)
            setDetailData({
                ...DetailData,
                [name]: e
            })
        }
        else if (name === "collegeID") {
            getAllMajors(e)
            setDetailData({
                ...DetailData,
                [name]: e
            })
        }
    }

    useEffect(() => {
        getAllCountries()
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        getAllUniv()
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

    const SubmitForm = () => {
        const link = "api/admin/professor/add"
        axios.post(link,
            {
                name: name,
                arName: arName,
                majorID: majorID.toString(),
                countryID: countryID
            })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('Professor Added Successfully')
                    window.location = "/professor"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }

    const validation = () => {
        if (countries !== "") {
            if (countries !== "") {
                if (colleges !== "") {
                    if (majors !== "") {
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

    console.log(DetailData)
    if (update !== true) {
        return <Spin size="large" />
    }

    else if (update === true) {
        return (
            <React.Fragment>
                          
                <div className="row mr-0">
                    <div className="row col-11 mx-auto pt-2">
                        <p className="mr-auto my-auto">Professor &gt; Add Professor</p>
                        <NavLink to="/professorrequests"> <button className="btn skyblue White ml-auto rounded-0">Professor Requests</button></NavLink>
                        <NavLink to="/allprofessors"> <button className="btn review ml-auto rounded-0">All Professors</button></NavLink>
                    </div>

                    <center>
                        
                        <div className='mainSelect'>
                            <select name="country" id="slct" className='select' onChange={onChangeSelectOption}>
                                <option value="Select Country">Select Country</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="India">India</option>
                                <option value="Africa">Africa</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="London">London</option>
                            </select>
                        </div>
                        <div className='mainSelect'>
                            <select name="university" id="slct" className='select' onChange={onChangeSelectOption}>
                                <option value="university">Select University</option>
                                <option value="Comsats">Comsats</option>
                                <option value="Nust">Nust</option>
                                <option value="UET">UET</option>
                                <option value="PIEAS">PIEAS</option>
                            </select>
                        </div>
                        <div className='mainSelect'>
                            <select name="college" id="slct" className='select' onChange={onChangeSelectOption}>
                                <option value="college">Select College</option>
                                <option value="Bahria">Bahria</option>
                                <option value="PC">PC</option>
                            </select>
                        </div>
                        <div className='mainSelect'>
                            <select name="major" id="slct" className='select' onChange={onChangeSelectOption}>
                                <option value="major">Select Major</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="BBA">BBA</option>
                                <option value="MBA">MBA</option>
                                <option value="Physics">Physics</option>
                            </select>
                        </div>
                        <div className='mainSelect'>
                            <input type="text" className='select' name="NameEn" placeholder='Name EN' onChange={onChangeSelectOption}></input>
                        </div>
                        <div className='mainSelect'>
                            <input type="text" className='select' name="NameAr" placeholder='Name AR' onChange={onChangeSelectOption}></input>
                        </div>
                        <button onClick={addProfessor} className='button'>Add</button>
                    </center>

                   
                </div >
            </React.Fragment>
               
            
        )
    }
}

export default Professor;