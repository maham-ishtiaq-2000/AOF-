import React from 'react';

export default function MajorComponent(props) {
    const major = props.major
    return (
        <tr>
            <td>{major.id}</td>
            <td>{major.name}</td>
            <td>{major.country}</td>
        </tr>
    )
}