import React from 'react';
import ServicesData from './ServicesData';
import ServicesRequestComponent from './ServicesRequestComponent';
import { NavLink } from 'react-router-dom';

const ServiceRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto">Service Requests</h6>
                        <NavLink to="/services"> <button className="btn skyblue White ml-auto">Add Service</button></NavLink>
                    </div>
                    <div className="pt-2">
                        <ServicesRequestComponent data={ServicesData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ServiceRequests;