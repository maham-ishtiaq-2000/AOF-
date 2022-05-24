import React, { useState } from 'react';
import $ from 'jquery';
const Chat = () => {
    const initialstate = {
        userid: "",
        chatid: "",
    }

    const [FormData, setFormData] = useState(initialstate);
    const { userid, chatid } = FormData;
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const conditionAvailable = () => {
        if (userid !== '') {
            $('#chatid').removeClass('d-none')
        }
    }

    const displayList = () => {
        if (userid === '') {
            alert('Please select User ID')
        }
        else if (userid !== '') {
            if (chatid !== '') {
                $('#classList').removeClass('d-none')
            }
        }
    }
    return (
        <React.Fragment>
            {conditionAvailable()}
            <div className="row mr-0">
                <form className="col-11 mx-auto pt-3">
                    <div className="">
                        <h6>User Chats</h6>
                        <form className="col-11 mx-auto pt-3">
                            <div className="row">
                                <div className="form-group col">
                                    <select id="userid" className="form-control Radius_20"
                                        name="userid"
                                        value={userid}
                                        onChange={onHandleChange}>
                                        <option selected value="">User ID</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                                <div className="form-group col">
                                    <select id="chatid" className="form-control d-none Radius_20"
                                        name="chatid"
                                        value={chatid}
                                        onChange={onHandleChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                                <button type="button" className="btn skyblue White mb-3" id="majorbtn" onClick={displayList}>
                                    Search
                                </button>
                            </div>
                        </form>
                        <div className="d-none" id="classList">
                            <h1>Chats Here</h1>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Chat;