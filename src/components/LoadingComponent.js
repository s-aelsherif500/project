import React from 'react';
import {Spinner} from 'reactstrap';
//<div class="lds-circle"><div></div></div>
export const Loading = () => {
    return(
        <div class="text-center">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};