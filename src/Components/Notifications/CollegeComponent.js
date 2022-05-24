import React from 'react';

export default function CollegeComponent(props) {
    const college = props.college
    return (
        <tr>
            <td>{college.id}</td>
            <td>{college.name}</td>
            <td>{college.country}</td>
        </tr>
    )
}