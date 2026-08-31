const Languages = ({ langObj }) => {
    let langList = Object.values(langObj);
    return (
        <>
            {langList.map(lang => (
                <li key={lang}>{lang}</li>
            ))}
        </>
    )
};

export default Languages;