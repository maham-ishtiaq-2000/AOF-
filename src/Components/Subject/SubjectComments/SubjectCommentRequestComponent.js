import React, { useState } from 'react';
import { Space, Table, Modal, Input } from 'antd';
const { TextArea } = Input;

export default function SubjectCommentRequestComponent(props) {
    const initialstate = {
        reason: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, reason } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const [isReasonModalVisible, setIsReasonModalVisible] = useState(false);

    const showReasonModal = (e) => {
        console.log('show model', e)
        setIsReasonModalVisible(true);
    };

    const handleReasonOk = (id) => {
        setIsReasonModalVisible(false);
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
            title: 'Country',
            dataIndex: 'country',
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
            title: 'Subject',
            dataIndex: 'subject',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
        },
        {
            title: 'Year',
            dataIndex: 'year',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Hardness Level',
            dataIndex: 'hardness',
        },
        {
            title: 'Teaching Style',
            dataIndex: 'teachingStyle',
        },
        {
            title: 'Attendance',
            dataIndex: 'attendance',
        },
        {
            title: 'Homework',
            dataIndex: 'homework',
        },
        {
            title: 'Projects',
            dataIndex: 'projects',
        },
        {
            title: 'Curve',
            dataIndex: 'curve',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
        },
        {
            title: 'Exam From',
            dataIndex: 'examFrom',
        },
        {
            title: 'Course Take with him?',
            dataIndex: 'takeWithHim',
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
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
            title: 'Comment',
            dataIndex: 'comment',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (record) => <Space size="middle">
                <button type="button" className="btn review rounded-0">Approve</button>

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

