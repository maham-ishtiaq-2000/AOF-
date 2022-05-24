import React, { useState } from 'react';
import { Space, Table, Modal, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default function ClassComponent(props) {

    const initialstate = {
        _id: "",
        name: "",
        country: "",
        university: "",
        college: "",
        subject: "",
        kind: "",
        feature: "",
        searchText: '',
        searchedColumn: '',
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, name, country, university, college, subject, kind, feature, searchText, searchedColumn } = FormData;

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
            name: e.name,
            kind: e.kind,
            feature: e.feature,
            country: e.country,
            university: e.university,
            college: e.college,
            subject: e.subject
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
                compare: (a, b) => a.id - b.id,
            },
        },
        {
            title: 'Country',
            dataIndex: 'country',
            ...getColumnSearchProps('country')
        },
        {
            title: 'University',
            dataIndex: 'university',
            ...getColumnSearchProps('university')
        },
        {
            title: 'College',
            dataIndex: 'college',
            ...getColumnSearchProps('college')
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            ...getColumnSearchProps('subject'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Kind',
            dataIndex: 'kind',
        },
        {
            title: 'Feature',
            dataIndex: 'feature',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Space size="middle">
                <button type="button" className="btn skyblue White border-0 rounded-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="Classroom Details" visible={isModalVisible} onOk={(e) => { handleOk(_id) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="pro" className="font-weight-bold">Classroom Name</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#pro"
                        value={name}
                        name="name"
                        onChange={onHandleChange} />

                    <label for="kind" className="pt-2 font-weight-bold">Kind</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#kind"
                        value={kind}
                        name="kind"
                        onChange={onHandleChange} />

                    <label for="feature" className="pt-2 font-weight-bold">Feature</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#feature"
                        value={feature}
                        name="feature"
                        onChange={onHandleChange} />

                    <label for="subject" className="pt-2 font-weight-bold">Subject</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#subject"
                        value={subject}
                        name="subject"
                        onChange={onHandleChange} />

                    <label for="clg" className="pt-2 font-weight-bold">College Name</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#clg"
                        value={college}
                        name="college"
                        onChange={onHandleChange} />

                    <label for="uni" className="pt-2 font-weight-bold">University</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#uni"
                        value={university}
                        name="university"
                        onChange={onHandleChange} />

                    <label for="country" className="pt-2 font-weight-bold">Country</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#country"
                        value={country}
                        name="country"
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
