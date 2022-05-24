import React, { useState } from 'react';
import $ from 'jquery';
import NotificationsData from './NotificationsData';
import DataComponent from './DataComponent';
const Notifications = () => {
    const initialstate = {
        data: [],
        content: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { data, content } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const RenderData = data.map(Data => {
        return (
            <DataComponent Data={Data}></DataComponent>
        )
    })

    const Data = (e) => {
        if (e.target.value !== '') {
            $('#tableData').removeClass('d-none')
        }
        else {
            $('#tableData').addClass('d-none')
        }
        if (e.target.value === 'school') {
            setFormData({
                ...FormData,
                data: NotificationsData.School
            })
        }
        if (e.target.value === 'college') {
            setFormData({
                ...FormData,
                data: NotificationsData.College
            })
        }
        if (e.target.value === 'major') {
            setFormData({
                ...FormData,
                data: NotificationsData.Major
            })
        }
        if (e.target.value === 'user') {
            setFormData({
                ...FormData,
                data: NotificationsData.User
            })
        }
    }

    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto">
                    <h2 className="text-center pt-3">Broadcast Notification</h2>
                    <div className="col">
                        <textarea type="text"
                            className="form-control Radius_20" style={{ resize: 'none' }}
                            placeholder="Type Here..."
                            name="content"
                            value={content}
                            rows="2"
                            onChange={onHandleChange} >
                        </textarea>
                    </div>

                    <div className="mx-auto">
                        <button type="button" className="btn skyblue White mt-3 d-block mx-auto">
                            Send Notification
                        </button>
                    </div>
                    <hr></hr>
                </div>

                <div className="col-11 mx-auto">
                    <form className=" pt-3">
                        <h2 className="text-center pt-3">User Specific Notifications</h2>
                        <select id="data" className="form-control data Radius_20"
                            name="data"
                            onChange={Data}>
                            <option selected value="">Select</option>
                            <option value="school">School</option>
                            <option value="college">College</option>
                            <option value="major">Major</option>
                            <option value="user">User</option>
                        </select>
                        <table className="table table-bordered bg-white mt-3 d-none" id="tableData">
                            <thead>
                                <tr>
                                    <th scope="col" ></th>
                                    <th scope="col" >ID</th>
                                    <th scope="col" >Name</th>
                                    <th scope="col"  >Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RenderData}
                            </tbody>
                        </table>

                        <div className="row pt-3">
                            <div className="col">
                                <textarea type="text"
                                    className="form-control Radius_20" style={{ resize: 'none' }}
                                    placeholder="Type Here..."
                                    name="content"
                                    value={content}
                                    rows="2"
                                    onChange={onHandleChange} >
                                </textarea>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <button type="button" className="btn skyblue White mt-3 d-block mx-auto ">
                                Send Notification
                            </button>
                        </div>

                        <hr></hr>
                    </form>
                </div>

            </div>
        </React.Fragment>
    )
}

export default Notifications;