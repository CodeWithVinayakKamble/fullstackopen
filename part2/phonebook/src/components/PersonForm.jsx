const PersonForm = ({ onSubmit, newName, userNameHandler, newNumber, userNumberHandler }) => {
    return (
        <form onSubmit={onSubmit} >

            <div>
                name: <input value={newName} onChange={userNameHandler} />
            </div>

            <div>
                number : <input value={newNumber} onChange={userNumberHandler} />
            </div>

            <div>
                <button type="submit">add</button>
            </div>

        </form>
    )
};

export default PersonForm;