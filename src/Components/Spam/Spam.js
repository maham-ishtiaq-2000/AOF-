import React from 'react';
import SpamComponent from './SpamComponent';
import SpamData from './SpamData';

const Spam = () => {
    return (
        <React.Fragment>
            <div className="row mr-0">
                <div className="col-11 mx-auto pt-3">
                    <h6>Spam Reports</h6>
                    <SpamComponent data={SpamData} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Spam;