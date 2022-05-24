import React, { useState } from 'react';
import { Space, Table, Modal } from 'antd';

export default function ClassRequestComponent(props) {

    const initialstate = {
        _id: "",
        name: "",
        kind: "",
    }

    const [FormData, setFormData] = useState(initialstate);
    const { _id, name, kind} = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

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
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (record) => <Space size="middle">
                <button type="button" className="btn skyblue White border-0 rounded-0" >Keep</button>
                <button type="button" className="btn review rounded-0" >Relist</button>
                <button type="button" className="btn skyblue White border-0 rounded-0" onClick={(e) => { showModal(record) }}>Edit</button>
                <Modal okText="Update" title="Professor Details" visible={isModalVisible} onOk={(e) => { handleOk(_id) }} onCancel={(e) => { handleCancel(record) }}>

                    <label for="nameEN" className="font-weight-bold">Book Title</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#nameEN"
                        value={name}
                        name="name"
                        onChange={onHandleChange} />

                    <label for="nameEN" className="pt-2 font-weight-bold">Kind</label>
                    <input className="col-12 rounded-0 p-3 bordercolor" id="#nameEN"
                        value={kind}
                        name="kind"
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

