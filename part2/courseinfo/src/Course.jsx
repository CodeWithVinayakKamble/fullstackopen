const SubHeading = ({ subTitle }) => {
    return <h2>{subTitle}</h2>
}

const Part = ({ name, exercises }) => {
    return (
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => {
                const { id: partKeyId, name, exercises } = part;
                return (
                    <Part key={partKeyId} name={name} exercises={exercises} />
                )
            })}
        </div>
    )
};

const Total = ({ parts }) => {
    let total = parts.reduce((sum, exercise) => sum + exercise.exercises, 0);
    return <strong>Total of {total} exercises</strong>
}

const Course = ({ course }) => {
    const { name: subHeading, parts } = course;
    return (
        <div>
            <SubHeading subTitle={subHeading} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course;