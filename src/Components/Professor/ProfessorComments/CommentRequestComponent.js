import React, { useState } from 'react';
import { Space, Table, Modal, Input, message, Tag } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

export default function CommentRequestComponent(props) {

    const initialstate = {
        reason: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { commentID, reason } = FormData;

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

    const Approve = (id) => {
        const link = "api/admin/professor/comment/changeStatus"
        axios.post(link,
            {
                commentID: id,
                status: 1
            })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('Approved Successfully')
                    window.location = "/commentrequests"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }

    const Reject = (id, reason, rejectType) => {
        const link = "api/admin/professor/comment/rejectComment"
        axios.post(link,
            {
                commentID: id,
                reason: reason,
                rejectType: rejectType
            })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    message.success('Rejected Successfully')
                    setIsReasonModalVisible(false);
                    window.location = "/commentrequests"
                }
                else {
                    message.error(res.data.message)
                }
            })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'commentID',
            sorter: {
                compare: (a, b) => a.commentID - b.commentID,
            },
        },
        {
            title: 'Name',
            dataIndex: 'username',
        },
        // {
        //     title: 'Country',
        //     dataIndex: 'country',
        // },
        // {
        //     title: 'University',
        //     dataIndex: 'university',
        //     sorter: {
        //         compare: (a, b) => a.university - b.university,
        //     },
        // },
        // {
        //     title: 'College',
        //     dataIndex: 'college',
        //     sorter: {
        //         compare: (a, b) => a.college - b.college,
        //     },
        // },
        {
            title: 'Professor',
            dataIndex: 'profID',
        },
        {
            title: 'Subject',
            dataIndex: 'subjectID',
        },
        {
            title: 'Grade',
            dataIndex: 'grade'
        },
        {
            title: 'Year',
            dataIndex: 'year',
            sorter: {
                compare: (a, b) => a.year - b.year,
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: {
                compare: (a, b) => a.rating - b.rating,
            },
        },
        {
            title: 'Hardness Level',
            dataIndex: 'hardness'
        },
        {
            title: 'Teaching Style',
            dataIndex: 'style'
        },
        {
            title: 'Attendance',
            dataIndex: 'attendence',
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
        // {
        //     title: 'Tags',
        //     dataIndex: 'tags',
        // },
        {
            title: 'Exam From',
            dataIndex: 'exams'
        },
        // {
        //     title: 'Course Take with him?',
        //     dataIndex: 'takeWithHim',
        //     sorter: {
        //         compare: (a, b) => a.takeWithHim - b.takeWithHim,
        //     },
        // },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Date',
            dataIndex: 'addedDate'
        },
        {
            title: 'Status',
            render: (record) => <Space size="middle">
                {record.aprovedByAdmin===1?
                <Tag color="green">Approved</Tag>:
                record.aprovedByAdmin===0?
                <Tag color="orange">Pending</Tag>:
                record.aprovedByAdmin===2&&
                <Tag color="red">Rejected</Tag>
            }
                </Space>
        },

        {
            title: 'Comment',
            dataIndex: 'comment',
        },
        {
            title: 'Actions',
            key: 'x',
            render: (record) => <Space size="middle">
                {record.aprovedByAdmin!==1 &&
                <button type="button" className="btn review rounded-0" onClick={()=>Approve(record.commentID)}>Approve</button>
                }

                <div className="dropdown">
                    <button className="btn reject dropdown-toggle rounded-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Reject
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={()=>Reject(record.commentID, "", "Inappropriate")}>Inappropriate</button>
                        <button className="dropdown-item" onClick={()=>Reject(record.commentID, "", "Already Exists")}>Already Exists</button>
                        <button className="dropdown-item" onClick={(e) => { showReasonModal(record) }}>Other Reasons</button>
                        <Modal okText="Submit" title="Reject Reason" visible={isReasonModalVisible} onOk={()=>Reject(record.commentID, reason, "Other")} onCancel={(e) => { handleReasonCancel(record) }}>
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

