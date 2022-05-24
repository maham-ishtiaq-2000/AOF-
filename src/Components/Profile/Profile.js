import React, { useState } from 'react';
import Uploading from '../UploadImg';

const Profile = () => {
    const initialstate = {
        fname: "",
        lname: "",
        password: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { fname, lname, password } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    return (
        <React.Fragment>
            <div className="row mr-0">

                <h2 className="pt-3 row col-11 mx-auto">Profile</h2>

                <form className="col-11 mx-auto pt-3">
                    <div className="row mx-auto">
                        <Uploading />
                    </div>
                    <div className="row pt-3">
                        <div className="col-md-6 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="First Name"
                                name="fname"
                                value={fname}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                        <div className="col-md-6 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="Last Name"
                                name="lname"
                                value={lname}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-12">
                            <input type="password"
                                className="form-control Radius_20"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                    </div>

                    <button type="button" className="btn skyblue White mt-2">
                        Update
                    </button>
                    <hr></hr>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Profile;