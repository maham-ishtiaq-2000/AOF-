import React, { useState } from 'react';
import { Space, Table, Modal, Input } from 'antd';
const { TextArea } = Input;

export default function DocumentRequestComponent(props) {

    const initialstate = {
        _id: "",
        university: "",
        college: "",
        major: "",
        subject: "",
        fileTitle: "",
        fileType: "",
        description: "",
        date: "",
        status: "",
        searchText: '',
        searchedColumn: '',
        reason: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, university, college, major, subject, fileTitle, fileType, description, reason } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [isReasonModalVisible, setIsReasonModalVisible] = useState(false);

    const showModal = (e) => {
        console.log('show model', e)
        setIsModalVisible(true);
        setFormData({
            ...FormData,
            _id: e._id,
            university: e.university,
            college: e.college,
            major: e.major,
            subject: e.subject,
            fileTitle: e.fileTitle,
            fileType: e.fileType,
            description: e.description
        })
    };

    const showReviewModal = (e) => {
        console.log('show model', e)
        setIsReviewModalVisible(true);
        setFormData({
            ...FormData,
            _id: e._id,
            university: e.university,
            college: e.college,
            major: e.major,
            subject: e.subject,
            fileTitle: e.fileTitle,
            fileType: e.fileType,
            description: e.description
        })
    };

    const showReasonModal = (e) => {
        console.log('show model', e)
        setIsReasonModalVisible(true);
    };

    const handleOk = (id) => {
        setIsModalVisible(false);
    };

    const handleReviewOk = (id) => {
        setIsReviewModalVisible(false);
    };

    const handleReasonOk = (id) => {
        setIsReasonModalVisible(false);
    };

    const handleCancel = (e) => {
        setIsModalVisible(false);
        console.log(e)
    };

    const handleReviewCancel = (e) => {
        setIsReviewModalVisible(false);
        console.log(e)
    };

    const handleReasonCancel = (e) => {
        setIsReasonModalVisible(false);
        console.log(e)
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: {
                compare: (a, b) => a._id - b._id,
            },
        },
        {
            title: 'University',
            dataIndex: 'university',
        },
        {
            title: 'College',
            dataIndex: 'college',
        },
        {
            title: 'Major',
            dataIndex: 'major',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
        },
        {
            title: 'File Title',
            dataIndex: 'fileTitle',
        },
        {
            title: 'File Type',
            dataIndex: 'fileType',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (record) => <Space size="middle">

                <button type="button" className="btn review rounded-0 overflow-hidden" onClick={(e) => { showReviewModal(record) }}>Review</button>
                <Modal okText="Approve" title="Subject Document Details" visible={isReviewModalVisible} onOk={(e) => { handleReviewOk(_id) }} onCancel={(e) => { handleReviewCancel(record) }}>

                    <div className="row">
                        <div className="col-6">
                            <p><strong>File Title</strong></p>
                            <p><strong>File Type</strong></p>
                            <p><strong>Description</strong></p>
                            <p><strong>Subject Name</strong></p>
                            <p><strong>Major Name</strong></p>
                            <p><strong>College Name</strong></p>
                            <p><strong>University:</strong></p>
                        </div>
                        <div className="col-6">
                            <p>{fileTitle}</p>
                            <p>{fileType}</p>
                            <p>{description}</p>
                            <p>{subject}</p>
                            <p>{major}</p>
                            <p>{college}</p>
                            <p>{university}</p>
                        </div>
                    </div>
                </Modal>

                <button type="button" className="btn skyblue White border-0 rounded-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="Subject Document Details" visible={isModalVisible} onOk={(e) => { handleOk(_id) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="nameEN" className="font-weight-bold">File Title</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#nameEN"
                        value={fileTitle}
                        name="fileTitle"
                        onChange={onHandleChange} />

                    <label for="fileType" className="pt-2 font-weight-bold">File Type</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#fileType"
                        value={fileType}
                        name="fileType"
                        onChange={onHandleChange} />

                    <label for="description" className="pt-2 font-weight-bold">Description</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#description"
                        value={description}
                        name="description"
                        onChange={onHandleChange} />

                </Modal>

                <div className="dropdown">
                    <button className="btn reject dropdown-toggle rounded-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Reject
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item">Inappropriate</button>
                        <button className="dropdown-item">Already Exists</button>
                        <button className="dropdown-item" onClick={(e) => { showReasonModal(record) }}>Other Reasons</button>
                        <Modal okText="Submit" title="Reject Reason" visible={isReasonModalVisible} onOk={(e) => { handleReasonOk(_id) }} onCancel={(e) => { handleReasonCancel(record) }}>
                            <TextArea
                                value={reason}
                                name="reason"
                                onChange={onHandleChange}
                                placeholder="Type Reject Reasons"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Modal>
                    </div>
                </div>
            </Space>,

        },
    ];

    const data = props.data;

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <Table columns={columns} dataSource={data} onChange={onChange} className="table-responsive" />

    )
}

