import { Switch } from 'antd';
import React, { useState } from 'react';
import { Input } from 'antd';

const AppConfig = () => {
    const initialstate = {
        color: "",
        video: "",
        bookPost: "",
        servicePost: "",
        bookPublished: "",
        servicePublished: "",
        bookFree: "",
        serviceFree: "",
        ads: "",
        singleAd: "",
        frequency: "",
        background: '#fff',
    }

    const [FormData, setFormData] = useState(initialstate);
    const { video, bookPost, servicePost, bookPublished, servicePublished, bookFree, serviceFree, ads, singleAd, frequency, color } = FormData;

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
                <div className="col-11 mx-auto pt-5">
                    <h1 className="text-center">App Configuration Section</h1>
                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>App Color</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Color Code"
                                name="color"
                                value={color}
                                onChange={onHandleChange} />
                        </div>
                        <div className=" col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Allowed Video Duration</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="video"
                                value={video}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>
                    <h4 className="pt-3">Book Posts</h4>
                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>No. of Images in Used Book Post</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="bookPost"
                                value={bookPost}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Time the used book post stay published</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="bookPublished"
                                value={bookPublished}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Number of Free Book Posts</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="bookFree"
                                value={bookFree}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>
                    <h4 className="pt-3">Service Provider Posts</h4>
                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>No. of Images in Service Provider Post</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="servicePost"
                                value={servicePost}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Time Service Provider post stay published</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="servicePublished"
                                value={servicePublished}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>


                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Number of Free Service Posts</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="serviceFree"
                                value={serviceFree}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>

                    <h4 className="pt-3">Ads</h4>
                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Number of Maximum Slot Ads</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="ads"
                                value={ads}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Single Ad Banner Time</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="singleAd"
                                value={singleAd}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Pop Native Ad Frequency</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Input type="text"
                                className="form-control Radius_20"
                                placeholder="Enter Number"
                                name="frequency"
                                value={frequency}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col col-12 col-md-3 pt-1">
                            <button type="button" className="border-0 rounded skyblue White">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col col-12 col-md-4">
                            <h6>Banner Ads</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Switch defaultChecked className="ml-auto" size="small" />
                        </div>
                    </div>

                    <div className="row pt-3 pb-5">
                        <div className="col col-12 col-md-4">
                            <h6>Pop Ads</h6>
                        </div>
                        <div className="col col-12 col-md-3">
                            <Switch defaultChecked className="ml-auto" size="small" />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AppConfig;