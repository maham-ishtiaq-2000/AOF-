import React, { useState } from 'react';
import { Input } from 'antd'

const BookPostPrice = (props) => {
    console.log(props)
    const initialstate = {
        title: "",
        price: "",
        files: [],
    }

    const [FormData, setFormData] = useState(initialstate);
    const { title, price, files } = FormData;

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const Uploader = () => {
        if (title !== "" && price !== "") {
            const random = Math.floor(100000 + Math.random() * 900000);

            const newService = {
                serviceid: random,
                title: title,
                price: price,
            }

            files.push(newService)
            setFormData({
                ...FormData,
                title: "",
                price: "",
            })
        }
    }

    const onUpdateTitle = (event) => {
        const id = event.target.id
        var array;
        // eslint-disable-next-line
        files.map((service, index) => {
            // eslint-disable-next-line
            if (service.serviceid == id) {
                array = files;
                array[index].title = event.target.value
                setFormData({
                    ...FormData,
                    files: array
                })
            }
        })
    }

    const onUpdateprice = (event) => {
        const id1 = event.target.id
        var array;
        // eslint-disable-next-line
        files.map((service, index) => {
            // eslint-disable-next-line
            if (service.serviceid == id1) {
                array = files;
                array[index].price = event.target.value
                setFormData({
                    ...FormData,
                    files: array
                })
            }
        })
    }

    const RenderMap = files.map((servicemap) => {
        return (
            <React.Fragment>
                <div className="row" >
                    <div className="col-md-6 col-12">
                        <Input type="text"
                            className="p-2 Radius_20"
                            name="title"
                            id={servicemap.serviceid}
                            value={servicemap.title}
                            onChange={onUpdateTitle}
                            placeholder="Title" />
                    </div>

                    <div className="col-md-6 col-12" >
                        <Input type="text"
                            className="p-2 Radius_20"
                            name="Price"
                            id={servicemap.serviceid}
                            value={servicemap.price}
                            onChange={onUpdateprice}
                            placeholder="price" />
                    </div>
                </div>
            </React.Fragment>
        )
    })

    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="row col-11 mx-auto pt-2">
                    <p className="mr-auto">Book Post Prices</p>
                </div>

                <form className="col-11 mx-auto pt-3">
                    {RenderMap}
                    <div className="row pt-2" >
                        <div className="col-md-6 col-12">
                            <Input type="text"
                                className="p-2 Radius_20"
                                name="title"
                                placeholder="Title"
                                value={title}
                                onChange={onHandleChange} />
                        </div>
                        <div className="col-md-6 col-12">
                            <Input type="text"
                                className="p-2 Radius_20"
                                placeholder="Price"
                                name="price"
                                value={price}
                                onChange={onHandleChange} />
                        </div>
                    </div>
                    <button type="button" className="btn skyblue White mt-3" onClick={Uploader}>
                        Add
                    </button>

                </form>
            </div>
        </React.Fragment>
    )
}

export default BookPostPrice;