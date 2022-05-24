import React, { useState } from 'react';
import { Space, Table, Modal, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default function BookComponent(props) {

    const initialstate = {
        _id: "",
        name: "",
        author: "",
        price: "",
        country: "",
        university: "",
        college: "",
        subject: "",
        postKind: "",
        contactMethod: "",
        contact: "",
        feature: "",
        bookCondition: "",
        searchText: '',
        searchedColumn: '',
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, name, author, price, postKind, contactMethod, contact, feature, bookCondition, searchText, searchedColumn } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "contact") {

            setFormData({
                ...FormData,
                contact: event.target.value.replace(/[^0-9]/ig, ''),
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
            _id: e._id,
            name: e.name,
            author: e.author,
            price: e.price,
            postKind: e.postKind,
            bookCondition: e.bookCondition,
            contactMethod: e.contactMethod,
            contact: e.contact,
            feature: e.feature,
            major: e.major
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
            sorter: {
                compare: (a, b) => a.university - b.university,
            },
            ...getColumnSearchProps('university')
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            sorter: {
                compare: (a, b) => a.subject - b.subject,
            },
            ...getColumnSearchProps('subject')
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
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => <Space size="middle">
                <button type="button" className="btn skyblue White border-0 rounded-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="Book Details" visible={isModalVisible} onOk={(e) => { handleOk(_id) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="pro" className="font-weight-bold">Book Name</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#pro"
                        value={name}
                        name="name"
                        onChange={onHandleChange} />

                    <label for="author" className="pt-2 font-weight-bold">Author</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#author"
                        value={author}
                        name="author"
                        onChange={onHandleChange} />

                    <label for="price" className="pt-2 font-weight-bold">Price</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#price"
                        value={price}
                        name="price"
                        onChange={onHandleChange} />

                    <label for="postKind" className="pt-2 font-weight-bold">Post Kind</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#postKind"
                        value={postKind}
                        name="postKind"
                        onChange={onHandleChange} />

                    <label for="contactMethod" className="pt-2 font-weight-bold">Contact Method</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#contactMethod"
                        value={contactMethod}
                        name="contactMethod"
                        onChange={onHandleChange} />

                    <label for="contact" className="pt-2 font-weight-bold">Contact</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#contact"
                        value={contact}
                        name="contact"
                        onChange={onHandleChange} />

                    <label for="bookCondition" className="pt-2 font-weight-bold">Book Condition</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#bookCondition"
                        value={bookCondition}
                        name="bookCondition"
                        onChange={onHandleChange} />

                    <label for="feature" className="pt-2 font-weight-bold">Feature</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#feature"
                        value={feature}
                        name="feature"
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
