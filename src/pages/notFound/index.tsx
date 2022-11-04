import React from "react";
import error from './404.png';
import Button from '@mui/material/Button';

import './For404.css'
import { Link,Navigate } from "react-router-dom";

const NotFound : React.FC = () => {
    return(
        <>
            <div className="back">
                <Link to="/" className="norm-button">
                    <Button
                        className="forButton"
                        variant="contained"
                        >
                            GO BACK
                    </Button>
                </Link>
            </div>
        </>
    )
}
export default NotFound;