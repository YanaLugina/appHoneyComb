import React from 'react';
import Person from "../Person";

const Persons = ({ persons }) => {
    return (
        <div>

            <h2>Persons: </h2>
            {
                persons && persons.length > 0
                    ? persons.map(person => {
                        return (
                            <Person key={person.id} person={person} />
                        )
                    })
                    : ''
            }
        </div>
    )
}

export default Persons;
