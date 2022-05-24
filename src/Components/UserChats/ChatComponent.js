import React, { useState } from 'react';
import ClassComponent from './ClassComponent';
import ClassData from './ClassData';
const ChatComponent = () => {
    return (
        <React.Fragment>
            <form className="col-11 mx-auto pt-3">
                <div className="">
                    <form className="col-11 mx-auto pt-3">
                        <div className="row">
                            <div className="form-group col">
                                <select id="inputcountry" className="form-control Radius_20"
                                    name="inputcountry"
                                    value={inputcountry}
                                    onChange={onHandleChange}>
                                    <option selected value="">Country</option>
                                    <option value="dubai">Dubai</option>
                                    <option value="Saudi Arab">Saudi Arab</option>
                                    <option value="Pakistan">Pakistan</option>
                                </select>
                            </div>
                            <div className="form-group col">
                                <select id="inputuniversity" className="form-control d-none Radius_20"
                                    name="inputuniversity"
                                    value={inputuniversity}
                                    onChange={onHandleChange}>
                                    <option selected value="">University</option>
                                    <option value="comsats">COMSATS University Islamabad</option>
                                    <option value="iiui">Islamic International University</option>
                                    <option value="fast">FAST</option>
                                </select>
                            </div>
                            <div className="form-group col">
                                <select id="inputsubject" className="form-control inputsubject Radius_20 d-none"
                                    name="inputsubject"
                                    value={inputsubject}
                                    onChange={onHandleChange}>
                                    <option selected value="">Subject</option>
                                    <option value="math">Maths</option>
                                    <option value="english">English</option>
                                    <option value="urdu">Urdu</option>
                                </select>
                            </div>
                            <button type="button" className="btn skyblue White mb-3" id="majorbtn" onClick={displayList}>
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="d-none" id="classList">
                        <ClassComponent data={ClassData} />
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ChatComponent;