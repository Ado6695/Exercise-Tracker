//create-exercise component allow us to add new exercises into databases.
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";//styling purpose
export default class CreateExercise extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        /*Setting initial state of component by assigning an object to this.state also we are going to create properties
         of the state that will correspond to the fields of the MongoDB document.*/
         /*State basically means how you create variables so whenever you update the values
          it will automatically update our page with the new values*/
        this.state = {
            username:'',
            description: '',
            duration: '',
            date: new Date(),
            //users is an array which contains all the list of existing users in the database.
            users: []
        }
    }

    /* This is react lifecycle method there are only few life cycle
    methods in react that react will automatically call at 
    different points so componentDidMount will be called right
    before anything displays on the page.*/
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
    //We are going to add methods which can be used to update the state properties
    /*When the username is being changed we're going to set the state*/

    onChangeUsername(e){
        this.setState({
            //setting the item that is going to change also target = textbox and value=value of the textbox
            username:e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            //setting the item that is going to change also target = textbox and value=value of the textbox
            description:e.target.value
        })
    }

    onChangeDuration(e){
        this.setState({
            //setting the item that is going to change also target = textbox and value=value of the textbox
            duration:e.target.value
        })
    }

    //date is a library which will open calender
    onChangeDate(date){
        this.setState({
            //setting the item that is going to change also target = textbox and value=value of the textbox
            date:date
        })
    }

    //Add the submit event to handle the form
    onSubmit(e){
        //this will prevent the default HTML form submit behaviour from taking place
        e.preventDefault()

        //We'll never just create variables normally we will create those variabe inside a methods
        //exercise method
        const exercise= {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        //we are going to submit the exercise to database
        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data));
        
        //home page list of exercises.
        window.location = '/';
    }

render() {
    return (
        <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                    //.map allows us to return something for each element in an array
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
