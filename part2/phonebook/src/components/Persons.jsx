const Persons = ({ personsToShow, deleteHandler }) => {
    return (
        <div>
            {personsToShow.map(person => {
                const { id, name, number } = person;
                return (
                    <p key={id}>{name} {number} <button onClick={() => deleteHandler(id, name)}>delete</button></p>
                )
            })}
        </div>
    )
};


export default Persons;