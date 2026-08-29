const Filter = ({ value, handler }) => {
    return (
        <>
            Filter shown with <input value={value} onChange={handler} />
        </>
    )
};

export default Filter;