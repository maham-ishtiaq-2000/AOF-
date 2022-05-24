import React, { useState } from 'react';
import DatePicker from '../DateComponent';
import Uploading from '../UploadImg';

const PopupAd = () => {
    const initialstate = {
        url: "",
        text: "",
        date: "",
        countryId: "",
        uniId: "",
        collegeId: "",
        majorId: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { url, text, date, countryId, uniId, collegeId, majorId } = FormData;
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

                <h2 className="pt-3 row col-11 mx-auto">Pop-up Ads</h2>

                <form className="col-11 mx-auto pt-3">
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="URL"
                                name="url"
                                value={url}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                        <div className="col-md-4 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="Text"
                                name="text"
                                value={text}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                        <div className="col-md-4 col-12">
                            <DatePicker name="date"
                                value={date}
                                onChange={onHandleChange} />
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-4 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="Country ID"
                                name="countryId"
                                value={countryId}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                        <div className="col-md-4 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="University ID"
                                name="uniId"
                                value={uniId}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                        <div className="col-md-4 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="College ID"
                                name="collegeId"
                                value={collegeId}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-4 col-12">
                            <input type="text"
                                className="form-control Radius_20"
                                placeholder="Major ID"
                                name="majorId"
                                value={majorId}
                                onChange={onHandleChange} >
                            </input>
                        </div>
                        <div className="col-md-4 col-12">
                            {/* <input type="text"
                                className="form-control Radius_20"
                                placeholder="University ID"
                                name="uniId"
                                value={uniId}
                                onChange={onHandleChange} >
                            </input> */}
                            <Uploading />
                        </div>
                    </div>
                    <button type="button" className="btn skyblue White mt-2">
                        Submit
                    </button>
                    <hr></hr>

                </form>
            </div>
        </React.Fragment>
    )
}

export default PopupAd;