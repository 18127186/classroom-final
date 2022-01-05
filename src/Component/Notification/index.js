
import React from 'react';
import {Link} from 'react-router-dom';

export default function Notification (data) {
//    const url = '/classes/detail/' + data.url;    
    const url = '#';

    return( 
        <div className="noti">       
            <div> <span className="name">{data.data.name}</span> {data.data.content} </div>
            <div className='time'> 10:24 01/02/2022 </div>  
        </div>
    )
}