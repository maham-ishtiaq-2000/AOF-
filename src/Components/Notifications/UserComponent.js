import React from 'react';

export default function UserComponent(props) {
    const user = props.user
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.country}</td>
        </tr>
    )
}