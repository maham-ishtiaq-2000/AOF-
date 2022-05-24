import React, { useState } from 'react';
import { Space, Table, Modal, Input, Button, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function SubjectComponent(props) {

    const initialstate = {
        subjectID: "",
        subjectName: "",
        subjectName_AR: "",
        subjectCode: "",
        subjectDescription: "",
        searchText: '',
        searchedColumn: '',
    }

    const [FormData, setFormData] = useState(initialstate);
    const { subjectID, subjectName, subjectName_AR, subjectCode, subjectDescription, searchText, searchedColumn } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "subjectCode") {

            setFormData({
                ...FormData,
                subjectCode: event.target.value.replace(/[^a-zA-Z0-9-\s]/ig, '')
            })
        }
        else if (event.target.name === "subjectName") {

            setFormData({
                ...FormData,
                subjectName: event.target.value.replace(/[^a-zA-Z0-9\s]/ig, '')
            })
        }
        else if (event.target.name === "subjectName_AR") {

            setFormData({
                ...FormData,
                subjectName_AR: event.target.value.replace(/[^\u0621-\u064A0-9\s]/ig, ''),
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

    const showModal = (e) => {
        console.log('show model', e)
        setIsModalVisible(true);
        setFormData({
            ...FormData,
            subjectID: e.subjectID,
            subjectName: e.subjectName,
            subjectName_AR: e.subjectName_AR,
            subjectCode: e.subjectCode,
            subjectDescription: e.subjectDescription,
        })
    };
    
    const handleOk = (e) => {
        setIsModalVisible(false);
        console.log(e)
        axios.put(`api/admin/subject/update`, {
            ID: subjectID,
            subjectCode:subjectCode,
            subjectName: subjectName,
            arsubjectName: subjectName_AR,
            subjectDescription: subjectDescription
        })
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success('Subject Information Updated Successfully')
                    props.getAllSubjects()
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
            dataIndex: 'subjectID',
            sorter: {
                compare: (a, b) => a.subjectID - b.subjectID,
            },
            ...getColumnSearchProps('subjectID')
        },
        // {
        //     title: 'Country',
        //     dataIndex: 'country',
        //     ...getColumnSearchProps('country')
        // },
        // {
        //     title: 'University',
        //     dataIndex: 'university',
        //     ...getColumnSearchProps('university')
        // },
        // {
        //     title: 'College',
        //     dataIndex: 'college',
        //     ...getColumnSearchProps('college')
        // },
        // {
        //     title: 'Major',
        //     dataIndex: 'major',
        //     ...getColumnSearchProps('major')
        // },
        {
            title: 'Code',
            dataIndex: 'subjectCode',
            sorter: {
                compare: (a, b) => a.subjectCode - b.subjectCode,
            },
            ...getColumnSearchProps('subjectCode')
        },
        {
            title: 'Name EN',
            dataIndex: 'subjectName',
            ...getColumnSearchProps('subjectName')
        },
        {
            title: 'Name AR',
            dataIndex: 'subjectName_AR',
            ...getColumnSearchProps('subjectName_AR')
        },
        {
            title: 'Description',
            dataIndex: 'subjectDescription',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Space size="middle">
                <button type="button" className="btn skyblue White border-0 rounded-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="Subject Details" visible={isModalVisible} onOk={(e) => { handleOk(subjectID) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="pro" className="font-weight-bold">Subject Code</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#pro"
                        value={subjectCode}
                        name="subjectCode"
                        onChange={onHandleChange} />

                    <label for="pro" className="pt-2 font-weight-bold">Subject Name EN</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#pro"
                        value={subjectName}
                        name="subjectName"
                        onChange={onHandleChange} />


                    <label for="pro" className="pt-2 font-weight-bold">Subject Name AR</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#pro"
                        value={subjectName_AR}
                        name="subjectName_AR"
                        onChange={onHandleChange} />

                    <label for="pro" className="font-weight-bold">Subject Description</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#pro"
                        value={subjectDescription}
                        name="subjectDescription"
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
