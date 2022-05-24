import React from 'react';
import BooksData from './BooksData';
import BooksRequestComponent from './BooksRequestComponent';
import { NavLink } from 'react-router-dom';

const BookRequests = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <div className="row ">
                        <h6 className="mr-auto my-auto">Books Requests</h6>
                        <NavLink to="/books"> <button className="btn skyblue White ml-auto">Add Book</button></NavLink>
                    </div>
                    <div className="pt-3">
                        <BooksRequestComponent data={BooksData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BookRequests;