import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import BlockComponent from './BlockComponent';
import BlockData from './BlockData';
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;

const Block = () => {
    const initialstate = {
        id: "",
        name: "",
        users: []
    }

    const [FormData, setFormData] = useState(initialstate);
    const { id, name, users } = FormData;

    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get('https://reqres.in/api/users')
            console.log(response)
            setFormData({
                ...FormData,
                users: response.data.data
            })
        }
        loadUsers()
        // eslint-disable-next-line
    }, [])

    const onchange = (e, name) => {
        console.log('event', e, name)
        setFormData({
            ...FormData,
            [name]: e
        })
        console.log(FormData)
    }

    const displayList = () => {
        if (id === '') {
            alert('Please select ID')
        }
        else if (id !== '') {
            if (name === '') {
                alert('Please select Name')
            }
            else if (name !== '') {
                $('#userList').removeClass('d-none')
            }
        }
    }

    return (
        <React.Fragment>
            <div className="row mr-0">
                <form className="col-11 mx-auto pt-3">
                    <h6>User Block/Unblock Page</h6>
                    <form className="col-12 mx-auto pt-3">
                        <div className="row">
                            <div className="form-group col-md-4 col-12">
                                <Select
                                    showSearch
                                    placeholder="Select ID"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'id')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {users.map(item => {
                                        return <Option value={item.first_name}>{item.first_name}</Option>
                                    })}
                                </Select>
                            </div>
                            <div className="col-md-4 col-12">
                                <Select
                                    showSearch
                                    placeholder="Select Name"
                                    className="col-12"
                                    optionFilterProp="children"
                                    onChange={(e) => onchange(e, 'name')}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {users.map(item => {
                                        return <Option value={item.first_name}>{item.first_name}</Option>
                                    })}
                                </Select>
                            </div>
                            <button type="button" className="btn skyblue White mb-3" id="majorbtn" onClick={displayList}>
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="d-none" id="userList">
                        <BlockComponent data={BlockData} />
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Block;