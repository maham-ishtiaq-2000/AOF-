import React, { useState } from 'react';
import { Space, Table, Modal, Input, Button, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function UniversityComponent(props) {
    console.log(props)

    const initialstate = {
        univID: "",
        univName: "",
        univName_AR: "",
        active: true,
        searchText: '',
        searchedColumn: '',
    }

    const [FormData, setFormData] = useState(initialstate);
    const { univID, univName, univName_AR, searchText, searchedColumn, active } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "univName") {

            setFormData({
                ...FormData,
                univName: event.target.value.replace(/[^a-zA-Z\s]/ig, ''),
            })
        }
        else if (event.target.name === "univName_AR") {

            setFormData({
                ...FormData,
                univName_AR: event.target.value.replace(/[^\u0621-\u064A\s]/ig, ''),
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
            univID: e.univID,
            univName: e.univName,
            univName_AR: e.univName_AR,
            country: e.country,
        })
    };

    const deleteUniv = (e) => {
        console.log(e)
        const link = "api/admin/universities/delete"
        axios.delete(link,
            {
                ID: e.univID
            })
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success("Deleted Successfull")
                    props.GetAllUniv()
                }
                else {
                    message.error(response.data.message)
                }
            })
    }

    const handleOk = (e) => {
        setIsModalVisible(false);
        console.log(e)
        axios.put(`api/admin/universities/update`, {
            ID: univID,
            name: univName,
            arName: univName_AR,
            status: active
        })
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    message.success('University Information upda')
                    props.GetAllUniv()
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
            dataIndex: 'univID',
            sorter: {
                compare: (a, b) => a.univID - b.univID,
            },
            ...getColumnSearchProps('univID'),
        },
        // {
        //     title: 'Country',
        //     dataIndex: 'country',
        //     ...getColumnSearchProps('country'),
        // },
        {
            title: 'Name EN',
            dataIndex: 'univName',
            ...getColumnSearchProps('univName'),
        },
        {
            title: 'Name AR',
            dataIndex: 'univName_AR',
            ...getColumnSearchProps('univName_AR'),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Space size="middle">
                <button type="button" className="btn rounded-0 skyblue White border-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="University Details" visible={isModalVisible} onOk={(e) => { handleOk(univID) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="name" className="font-weight-bold">University Name EN</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#name"
                        value={univName}
                        name="univName"
                        onChange={onHandleChange} />

                    <label for="name" className="pt-2 font-weight-bold">University Name AR</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#name"
                        value={univName_AR}
                        name="univName_AR"
                        onChange={onHandleChange} />
                </Modal>

                <button type="button" className="btn reject rounded-0" onClick={(e) => { deleteUniv(record) }}>Delete</button>
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
