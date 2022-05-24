import React, { useState } from 'react';
import { Space, Table, Modal, Input } from 'antd';
const { TextArea } = Input;

export default function BooksRequestComponent(props) {

    const initialstate = {
        _id: "",
        name: "",
        author: "",
        price: "",
        country: "",
        university: "",
        subject: "",
        postKind: "",
        contactMethod: "",
        contact: "",
        feature: "",
        bookCondition: "",
        reason: ""
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, name, author, price, country, university, subject, postKind, contactMethod, contact, feature, bookCondition, reason } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [isReasonModalVisible, setIsReasonModalVisible] = useState(false);

    const showReviewModal = (e) => {
        console.log('show model', e)
        setIsReviewModalVisible(true);
        setFormData({
            ...FormData,
            _id: e._id,
            name: e.name,
            author: e.author,
            price: e.price,
            postKind: e.postKind,
            bookCondition: e.bookCondition,
            contactMethod: e.contactMethod,
            contact: e.contact,
            feature: e.feature,
            country: e.country,
            university: e.university,
            subject: e.subject
        })
    };

    const showReasonModal = (e) => {
        console.log('show model', e)
        setIsReasonModalVisible(true);
    };

    const handleReviewOk = (id) => {
        setIsReviewModalVisible(false);
    };

    const handleReasonOk = (id) => {
        setIsReasonModalVisible(false);
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
                compare: (a, b) => a.id - b.id,
            },
        },
        {
            title: 'Country',
            dataIndex: 'country',
        },
        {
            title: 'University',
            dataIndex: 'university',
            sorter: {
                compare: (a, b) => a.university - b.university,
            },
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            sorter: {
                compare: (a, b) => a.subject - b.subject,
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
        },
        { 
            title: 'Post Kind',
            dataIndex: 'postKind',
        },
        {
            title: 'Book Condition',
            dataIndex: 'bookCondition',
        },
        {
            title: 'Contact Method',
            dataIndex: 'contactMethod',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
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
                <Modal okText="Approve" title="Book Details" visible={isReviewModalVisible} onOk={(e) => { handleReviewOk(_id) }} onCancel={(e) => { handleReviewCancel(record) }}>

                    <div className="row">
                        <div className="col-6">
                            <p><strong>Book Name</strong></p>
                            <p><strong>Author</strong></p>
                            <p><strong>Price</strong></p>
                            <p><strong>Post Kind</strong></p>
                            <p><strong>Contact Method</strong></p>
                            <p><strong>Phone No.</strong></p>
                            <p><strong>Book Condition</strong></p>
                            <p><strong>Feature</strong></p>
                            <p><strong>Subject</strong></p>
                            <p><strong>University:</strong></p>
                            <p><strong>Country:</strong></p>
                        </div>
                        <div className="col-6">
                            <p>{name}</p>
                            <p>{author}</p>
                            <p>{price}</p>
                            <p>{postKind}</p>
                            <p>{contactMethod}</p>
                            <p>{contact}</p>
                            <p>{bookCondition}</p>
                            <p>{feature}</p>
                            <p>{subject}</p>
                            <p>{university}</p>
                            <p>{country}</p>
                        </div>
                    </div>
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

