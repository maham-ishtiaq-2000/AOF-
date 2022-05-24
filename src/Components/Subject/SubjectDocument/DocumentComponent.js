import React, { useState } from 'react';
import { Space, Table, Modal, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default function DocumentComponent(props) {

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
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, fileTitle, fileType, description, searchText, searchedColumn } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
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

    const showModal = (e) => {
        console.log('show model', e)
        setIsModalVisible(true);
        setFormData({
            ...FormData,
            _id: e._id,
            fileTitle: e.fileTitle,
            fileType: e.fileType,
            description: e.description
        })
    };


    const handleOk = (id) => {
        setIsModalVisible(false);
    };

    const handleCancel = (e) => {
        setIsModalVisible(false);
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
            title: 'University',
            dataIndex: 'university',
            sorter: {
                compare: (a, b) => a.university - b.university,
            },
            ...getColumnSearchProps('university')
        },
        {
            title: 'College',
            dataIndex: 'college',
            sorter: {
                compare: (a, b) => a.college - b.college,
            },
            ...getColumnSearchProps('college')
        },
        {
            title: 'Major',
            dataIndex: 'major',
            ...getColumnSearchProps('major')
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            ...getColumnSearchProps('subject')
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
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Space size="middle">
                <button type="button" className="btn skyblue White border-0 rounded-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title=" Subject Document Details" visible={isModalVisible} onOk={(e) => { handleOk(_id) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="name" className="font-weight-bold">File Title</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#name"
                        value={fileTitle}
                        name="fileTitle"
                        onChange={onHandleChange} />

                    <label for="uni" className="pt-2 font-weight-bold">File Type</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#uni"
                        value={fileType}
                        name="fileType"
                        onChange={onHandleChange} />

                    <label for="uni" className="pt-2 font-weight-bold">Description</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#uni"
                        value={description}
                        name="description"
                        onChange={onHandleChange} />
                </Modal>

                <button type="button" className="btn reject rounded-0" >Delete</button>
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
