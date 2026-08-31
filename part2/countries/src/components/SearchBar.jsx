const SearchBar = ({ value, searchHandler }) => {
    return (
        <>
            find Countries <input value={value} onChange={searchHandler} />
        </>
    )
};

export default SearchBar