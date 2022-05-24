import React from 'react';
import { NavLink } from 'react-router-dom';
import professorBtn from '../assests/professorBtn.png'
import subjectBtn from '../assests/subjectBtn.png';
import bookBtn from '../assests/bookBtn.png';
import classroomBtn from '../assests/classroomBtn.png';
import serviceBtn from '../assests/serviceBtn.png';
// import Chart from 'react-google-charts';
const Dashboard = () => {

    return (
        <React.Fragment>
            <div className="row mr-0">
                <h2 className=" pt-3 col-11 mx-auto">Dashboard</h2>
                <div className="row pt-3 mr-0 col-11 mx-auto">
                    <div className="col-md-3 col-12">
                        <NavLink to="/professor">
                            <div className="card Radius_10 mt-1">
                                {/* <sup><span class="badge badge-success">1</span></sup> */}
                                <button className="bg-white Black border-0 Radius_20">
                                    <div className="card-body">
                                        <img src={professorBtn} alt="" className="w-25"></img>
                                        <h6 className="pt-3">Professor</h6>
                                    </div>
                                </button>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-md-3 col-12 mt-1">
                        <NavLink to="/subject">
                            <div className="card Radius_10">
                                {/* <sup><span class="badge badge-success">8</span></sup> */}
                                <button className="bg-white Black border-0 Radius_20">
                                    <div className="card-body">
                                        <img src={subjectBtn} alt="" className="w-25"></img>
                                        <h6 className="pt-3">Subject</h6>
                                    </div>
                                </button>
                            </div>
                        </NavLink>

                    </div>
                    <div className="col-md-3 col-12 mt-1">
                        <NavLink to="/books">
                            <div className="card Radius_10">
                                {/* <sup><span class="badge badge-success">6</span></sup> */}
                                <button className="bg-white Black border-0 Radius_20">
                                    <div className="card-body">
                                        <img src={bookBtn} alt="" className="w-25"></img>
                                        <h6 className="pt-3">Books</h6>
                                    </div>
                                </button>
                            </div>
                        </NavLink>

                    </div>
                    <div className="col-md-3 col-12 mt-1">
                        <NavLink to="/services">
                            <div className="card Radius_10">
                                {/* <sup><span class="badge badge-success">12</span></sup> */}
                                <button className="bg-white Black border-0 Radius_20">
                                    <div className="card-body">
                                        <img src={serviceBtn} alt="" className="w-25"></img>
                                        <h6 className="pt-3">Services</h6>
                                    </div>
                                </button>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="row pt-4 col-11 mx-auto">
                    <div className="col-md-3 col-12 ">
                        <NavLink to="/classroom">
                            <div className="card Radius_10 ">
                                {/* <sup><span class="badge badge-success">4</span></sup> */}
                                <button className="bg-white Black border-0 Radius_20">
                                    <div className="card-body">
                                        <img src={classroomBtn} alt="" className="w-25"></img>
                                        <h6 className="pt-3">Classroom</h6>
                                    </div>
                                </button>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="row pt-5 mr-0 col-11 mx-auto">
                    <div className="col-md-3 col-12 mt-1">
                        <div className="card Radius_10">
                            <div className="card-body">
                                <h6 className="card-title text-center">Total Viewrs</h6>
                                <p className="card-text text-center">840</p>
                                {/* <Chart
                                    width={300}
                                    height={200}
                                    chartType="LineChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        [
                                            { type: 'number', label: 'x' },
                                            { type: 'number', label: 'values' },
                                            { id: 'i0', type: 'number', role: 'interval' },
                                            { id: 'i1', type: 'number', role: 'interval' },
                                            { id: 'i2', type: 'number', role: 'interval' },
                                            { id: 'i2', type: 'number', role: 'interval' },
                                            { id: 'i2', type: 'number', role: 'interval' },
                                            { id: 'i2', type: 'number', role: 'interval' },
                                        ],
                                        [1, 100, 90, 110, 85, 96, 104, 120],
                                        [2, 120, 95, 130, 90, 113, 124, 140],
                                        [3, 130, 105, 140, 100, 117, 133, 139],
                                        [4, 90, 85, 95, 85, 88, 92, 95],
                                        [5, 70, 74, 63, 67, 69, 70, 72],
                                        [6, 30, 39, 22, 21, 28, 34, 40],
                                        [7, 80, 77, 83, 70, 77, 85, 90],
                                        [8, 100, 90, 110, 85, 95, 102, 110],
                                    ]}
                                    options={{
                                        intervals: { style: 'sticks' },
                                        legend: 'none',
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-12 mt-1">
                        <div className="card Radius_10">
                            <div className="card-body">
                                <h6 className="card-title text-center">Total Income</h6>
                                <p className="card-text text-center">$750</p>
                                {/* <Chart
                                    width={300}
                                    height={200}
                                    chartType="ColumnChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['City', '', ''],
                                        ['', 8175000, 8008000],
                                        ['', 3792000, 3694000],
                                        ['', 2695000, 2896000],
                                        ['', 2099000, 1953000],
                                        ['', 1526000, 1517000],
                                    ]}
                                    legendToggle
                                /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-12 mt-1">
                        <div className="card Radius_10">
                            <div className="card-body">
                                <h6 className="card-title text-center">App Native Ads Stats</h6>
                                <p className="card-text text-center">70</p>
                                {/* <Chart
                                    width={200}
                                    height={'200px'}
                                    chartType="AreaChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Year', 'Sales', 'Expenses'],
                                        ['2013', 1000, 400],
                                        ['2014', 1170, 460],
                                        ['2015', 660, 1120],
                                        ['2016', 1030, 540],
                                    ]}
                                    options={{
                                        // title: 'Company Performance',
                                        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                                        vAxis: { minValue: 0 },
                                        // For the legend to fit, we make the chart area smaller
                                        chartArea: { width: '100%', height: '50%' },
                                        // lineWidth: 25
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard;