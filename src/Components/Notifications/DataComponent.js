import React from 'react';

export default function DataComponent(props) {
    const Data = props.Data
    return (
        <tr>
            <td><input type="checkbox"></input></td>
            <td>{Data.id}</td>
            <td>{Data.name}</td>
            <td>{Data.country}</td>
        </tr>
    )
}