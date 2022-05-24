import React, { useState } from 'react';
import { Space, Table, Modal, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
const { TextArea } = Input;

export default function SubjectRequestComponent(props) {

    const initialstate = {
        _id: "",
        name: "",
        nameAr: "",
        code: "",
        country: "",
        university: "",
        college: "",
        major: "",
        reason: "",
        searchText: '',
        searchedColumn: '',
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, name, nameAr, code, description, country, university, college, major, reason, searchedColumn, searchText } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "code") {

            setFormData({
                ...FormData,
                code: event.target.value.replace(/[^a-zA-Z0-9-\s]/ig, '')
            })
        }
        else if (event.target.name === "name") {

            setFormData({
                ...FormData,
                name: event.target.value.replace(/[^a-zA-Z0-9\s]/ig, '')
            })
        }
        else if (event.target.name === "nameAr") {

            setFormData({
                ...FormData,
                nameAr: event.target.value.replace(/[^\u0621-\u064A0-9\s]/ig, ''),
            })
        }
        else {
            setFormData({
                ...FormData,
                [name]: value
            })
        }
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setFormData({
                                ...FormData,
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            })
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#7aacb3' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setFormData({
            ...FormData,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        })
    };

    const handleReset = clearFilters => {
        clearFilters();
        setFormData({
            ...FormData,
            searchText: ''
        })
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [isReasonModalVisible, setIsReasonModalVisible] = useState(false);

    const showModal = (e) => {
        console.log('show model', e)
        setIsModalVisible(true);
        setFormData({
            ...FormData,
            _id: e._id,
            name: e.name,
            nameAr: e.nameAr,
            code: e.code,
            description: e.description,
        })
    };

    const showReviewModal = (e) => {
        console.log('show model', e)
        setIsReviewModalVisible(true);
        setFormData({
            ...FormData,
            _id: e._id,
            name: e.name,
            nameAr: e.nameAr,
            code: e.code,
            description: e.description,
            country: e.country,
            university: e.university,
            college: e.college,
            major: e.major
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
            ...getColumnSearchProps('_id')
        },
        {
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Name EN',
            dataIndex: 'name',
        },
        {
            title: 'Name AR',
            dataIndex: 'nameAr',
        },
        {
            title: 'Description',
            dataIndex: 'description',
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
            title: 'Major',
            dataIndex: 'major',
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

                <button type="button" className="btn review rounded-0" onClick={(e) => { showReviewModal(record) }}>Review</button>
                <Modal okText="Approve" title="Subject Details" visible={isReviewModalVisible} onOk={(e) => { handleReviewOk(_id) }} onCancel={(e) => { handleReviewCancel(record) }}>

                    <div className="row">
                        <div className="col-6">
                            <p><strong>Subject Code</strong></p>
                            <p><strong>Subject Name EN</strong></p>
                            <p><strong>Subject Name AR</strong></p>
                            <p><strong>Description</strong></p>
                            <p><strong>Major Name</strong></p>
                            <p><strong>College Name</strong></p>
                            <p><strong>University:</strong></p>
                            <p><strong>Country:</strong></p>
                        </div>
                        <div className="col-6">
                            <p>{code}</p>
                            <p>{name}</p>
                            <p>{nameAr}</p>
                            <p>{description}</p>
                            <p>{major}</p>
                            <p>{college}</p>
                            <p>{university}</p>
                            <p>{country}</p>
                        </div>
                    </div>
                </Modal>

                <button type="button" className="btn skyblue White border-0 rounded-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="Subject Details" visible={isModalVisible} onOk={(e) => { handleOk(_id) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="nameEN" className="font-weight-bold">Subject Code</label>
                    <input className="col-12 rounded-0 p-3 bordercolor"
                        value={code}
                        name="code"
                        onChange={onHandleChange} />

                    <label for="nameEN" className="pt-2 font-weight-bold">Subject Name EN</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#nameEN"
                        value={name}
                        name="name"
                        onChange={onHandleChange} />

                    <label for="nameEN" className="pt-2 font-weight-bold">Subject Name AR</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#nameEN"
                        value={nameAr}
                        name="nameAr"
                        onChange={onHandleChange} />

                    <label for="uni" className="pt-2 font-weight-bold">Description</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#uni"
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

