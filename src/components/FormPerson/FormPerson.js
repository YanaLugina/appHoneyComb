import React, { useState } from 'react';

const FormPerson = ({ handleCreate }) => {
    const initialPerson = { name: '', serName: '', phone: '' };
    const [person, setPerson] = useState(initialPerson);

    const handleCreatePerson = (e) => {
        e.stopPropagation();
        handleCreate(person);
        setPerson(initialPerson);
    }

    const handleChange = (value, field) => {
        setPerson(s => ({ ...s, [field]: value }));
    }

    return (
        <form onSubmit={handleCreatePerson} style={{ display: 'flex', flexFlow: 'column wrap', width: '400px' }}>
            <input type="text" value={ person?.name } onChange={e => handleChange(e.target.value, 'name')} />
            <input type="text" value={ person?.serName } onChange={e => handleChange(e.target.value, 'serName')} />
            <input type="phone" value={ person?.phone } onChange={e => handleChange(e.target.value, 'phone')} />
            <input type='submit' />
        </form>
    );
}

export default FormPerson;

