import React, { useState } from 'react';
import { Space, Table, Modal, Input, Button, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function CollegeComponent(props) {
    console.log(props)

    const initialstate = {
        collegeID: "",
        collegeName: "",
        collegeName_AR: "",
        searchText: '',
        searchedColumn: '',
    }

    const [FormData, setFormData] = useState(initialstate);
    const { collegeID, collegeName, collegeName_AR, searchText, searchedColumn } = FormData;

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

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "collegeName") {

            setFormData({
                ...FormData,
                collegeName: event.target.value.replace(/[^a-zA-Z\s]/ig, ''),
            })
        }
        else if (event.target.name === "collegeName_AR") {

            setFormData({
                ...FormData,
                collegeName_AR: event.target.value.replace(/[^\u0621-\u064A\s]/ig, ''),
            })
        }
        else {
            setFormData({
                ...FormData,
                [name]: value
            })
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (e) => {
        console.log('show model', e)
        setIsModalVisible(true);
        setFormData({
            ...FormData,
            collegeID: e.collegeID,
            collegeName: e.collegeName,
            collegeName_AR: e.collegeName_AR,
        })
    };

    const handleOk = (e) => {
        setIsModalVisible(false);
        console.log(e)
        axios.put(`api/admin/college/update`, { 
            name: collegeName,
            arName: collegeName_AR
        })
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success('College Updated Successfully')
                    props.getAllColleges()
                }
                else {
                    message.error(response.data.message)
                }
            })
    };

    const handleCancel = (e) => {
        setIsModalVisible(false);
        console.log(e)
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'collegeID',
            sorter: {
                compare: (a, b) => a.collegeID - b.collegeID,
            },
            ...getColumnSearchProps('collegeID'),
        },
        // {
        //     title: 'Country',
        //     dataIndex: 'country',
        //     sorter: {
        //         compare: (a, b) => a.country - b.country,
        //     },
        //     ...getColumnSearchProps('country'),
        // },
        // {
        //     title: 'University',
        //     dataIndex: 'university',
        //     sorter: {
        //         compare: (a, b) => a.university - b.university,
        //     },
        //     ...getColumnSearchProps('university'),
        // },
        {
            title: 'Name EN',
            dataIndex: 'collegeName',
            ...getColumnSearchProps('collegeName'),
        },
        {
            title: 'Name AR',
            dataIndex: 'collegeName_AR',
            ...getColumnSearchProps('collegeName_AR'),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Space size="middle">
                <button type="button" className="btn rounded-0 skyblue White border-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="College Details" visible={isModalVisible} onOk={(e) => { handleOk(collegeID) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="name" className="font-weight-bold">College Name EN</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#name"
                        value={collegeName}
                        name="collegeName"
                        onChange={onHandleChange} />

                    <label for="name" className="pt-2 font-weight-bold">College Name AR</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#name"
                        value={collegeName_AR}
                        name="collegeName_AR"
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
