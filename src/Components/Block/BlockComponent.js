import React from 'react';
import { Space, Table } from 'antd';

export default function BlockComponent(props) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: () => <Space size="middle">
                <button type="button" className="btn rounded-0 reject">Block</button>
                <button type="button" className="btn rounded-0 review">Unblock</button>
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
