
import React from 'react';
import { Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Notification (data) {
//    const url = '/classes/detail/' + data.url;    
    const url = '#';

    return( 
        <div className="noti">       
            <div> <span className="name">A</span> da them 1 lop hoc </div>
            <div className='time'> 10:24 01/02/2022 </div>  
        </div>
    )
}