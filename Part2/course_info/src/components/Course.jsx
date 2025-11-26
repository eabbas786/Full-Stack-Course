const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {

    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}
const Content = ({ parts }) => {
    // console.log(props.parts[0].name)

    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </div>
    )


}

const Total = ({ parts }) => {
    // console.log(props)
    return (
        <div>
            <p>
                total of {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} exercises
            </p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>

    )
}

export default Course