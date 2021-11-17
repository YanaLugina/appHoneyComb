import React from 'react';
import style from './person.module.css';

const Person = ({ person }) => {
    return (
        <div id={person.id} >
            <div className={style.person} style={{ display: 'flex', flexFlow: 'row wrap' }} >
                <div>{ person.id }</div>
                <div>{ person.name }</div>
                <div>{ person.serName }</div>
                <div>{ person.phone }</div>
            </div>
        </div>
    )
};

export default Person;
