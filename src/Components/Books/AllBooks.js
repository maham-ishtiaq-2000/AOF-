
import React from 'react';
import { NavLink } from 'react-router-dom';
import BookComponent from './BookComponent';
import BooksData from './BooksData';

const AllBooks = () => {
    return (
        <React.Fragment>
            <div className="container-fluid mb-6 p-4">
                <div className="row col-11 mx-auto pt-2">
                    <h4 className="mr-auto my-auto">All Books</h4>
                    <NavLink to="/bookrequests"> <button className="btn skyblue White ml-auto rounded-0">Book Requests</button></NavLink>
                    <NavLink to="/books"> <button className="btn review ml-auto rounded-0">Add Book</button></NavLink>
                </div>
                <div>
                    {/* <h6>All Books</h6> */}
                    <div className="mt-3">
                        <BookComponent data={BooksData} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AllBooks;