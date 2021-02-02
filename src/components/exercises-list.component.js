//exercises-list component allow us to add exercises into databases.
//Home Page Of The App
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//There are two components in this file which are Exercise component and ExercisesList component.
//Exercise component is implemented as functional react component and ExercisesList is implemented as Class Component.
//Functional react component only needs to accept props and return JSX.
/*The Key thing that makes a functional react component different from a class component is lack of state and life cycle methods */

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  /*Constructor to initialize the state with an empty exercise
  array*/
  constructor(props){
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    //intialize the state and only one item, exercises is an empty array
    this.state = {exercises: []};
  }

  //Get the list of exercises from databases
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
    .then(response => {
      this.setState({ exercises: response.data })
    })
    .catch((error) =>{
      console.log(error);
  })
}

deleteExercise(id) {
  axios.delete('http://localhost:5000/exercises/'+id)
    .then(response => { console.log(response.data)});

  this.setState({
    exercises: this.state.exercises.filter(el => el._id !== id)
  })
}

//For every currentexercise it's going to return a component
//Exercise component wiil be created by us.
exerciseList() {
  return this.state.exercises.map(currentexercise => {
    return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
  })
}

render() {
    return (
      //Returning the render function after update
      //exerciseList() is a method which is going to return the rows of table
      <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { this.exerciseList() }
        </tbody>
      </table>
    </div>
    )
  }
}
