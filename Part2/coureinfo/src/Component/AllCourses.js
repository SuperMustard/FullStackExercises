function Header(props) {
    return (
        <h1>
          {props.courseName}
        </h1>
    )
  }
  
  function Part({part}) {
    return (
      <p> {part.name} {part.exercises} </p>
    );
  }
  
  function Content(props) {
    return (
      <div>
        {props.parts.map(part => 
          <Part key={part.id} part={part} />  
        )}
      </div>
    )
  }
  
  const Total = ({totalNum}) => {
    return (
      <p> total of {totalNum} exercises </p>
    )
  }
  
  const Course = ({name, parts}) => {
    const totalNum = parts.reduce((s, p)=> {
      return s + p.exercises;
    }, 0);
  
    return (
      <div>
        <Header courseName = {name} />
        <Content parts = {parts} />
        <Total totalNum = {totalNum}/>
      </div>
    )
  }
  
  const AllCourses = ({courses}) => {
    return (
      <div>
        {courses.map(course =>
          <Course key={course.id} name={course.name} parts={course.parts}/>  
        )}
      </div>
    )
  }

  export default AllCourses