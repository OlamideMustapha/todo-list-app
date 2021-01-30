import React, { Component } from "react";
import './styles/css/App.css';

import Main from "./components/main.js";
import Header from "./components/header.js";




class App extends Component {
  constructor () {
    super ();

    this.state = {
      inputText: "",
      darkMode: false,
      dragSource: "",
      tasks: [
        {id: "item1", content: "Complete online JavaScript course", done: true },
        {id: "item2", content: "Jog around the park 3x", done: false },
        {id: "item3", content: "10 minutes meditation", done: false },
        {id: "item4", content: "Read for 1 hour", done: false },
        {id: "item5", content: "Pick up groceries", done: false },
        {id: "item6", content: "Complete Todo App on Frontent Mentor", done: false },
      ], 
      view: "all"
    };

    this.toggleTheme        = this.toggleTheme.bind (this);
    this.onChangeInput      = this.onChangeInput.bind (this);
    this.viewAllTask        = this.viewAllTask.bind (this);
    this.viewActiveTasks    = this.viewActiveTasks.bind (this);
    this.viewCompletedTasks = this.viewCompletedTasks.bind (this);
    this.clearCompleted     = this.clearCompleted.bind (this);
    this.createTask         = this.createTask.bind (this);
    this.toggleTaskStatus   = this.toggleTaskStatus.bind (this);
    this.removeTask         = this.removeTask.bind (this)
    this.draggingOver       = this.draggingOver.bind (this);
    this.dragStarted        = this.dragStarted.bind (this);
    this.dropped            = this.dropped.bind (this);
    this.retrieveState      = this.retrieveState.bind (this);
    this.storeState         = this.storeState.bind (this);
    this.generateID         = this.generateID.bind (this);

  }


  /* app's states are store in the local storage */

  retrieveState () {
    if (window.localStorage["LCGFZZHHMURKBVDWZ__TODO-APP"])
      this.setState ({ ...JSON.parse (window.localStorage.getItem ("LCGFZZHHMURKBVDWZ__TODO-APP")) });

  }

  storeState () {
    /* Storing state */
    window.localStorage.setItem ("LCGFZZHHMURKBVDWZ__TODO-APP", JSON.stringify (this.state));
  }

  /* handles toggle theme button */
  toggleTheme (event) {
    const app = document.querySelector ("#app");

    if (this.state.darkMode) {

      /* if dark mode is on */
      app.classList.remove ("dark");
      app.classList.add ("light");
    } else {

      /* if light mode is on */
      app.classList.remove ("light");
      app.classList.add ("dark");
    }
    
    /* Update app's state */
    this.setState (({darkMode}) => ({ darkMode: !darkMode }));
  }


  /* Handles input component change event */
  onChangeInput (event) {
    this.setState (({inputText}) => {

    return {inputText: event.target.value }
    });
  }

  toggleActiveState (event) {
    event.target.parentNode.childNodes
      .forEach (child => child.classList.remove ("active"))
    event.target.classList.add ("active")
  }


  /* Update app's state to show all tasks */
  viewAllTask (event) {
    this.toggleActiveState (event);

    this.setState ({view: "all"});
  }


  /* Update app's state to show only active tasks */
  viewActiveTasks (event) {
    this.toggleActiveState (event);

    this.setState ({view: "active"});
  }


  /* Update app's state to show completed tasks */
  viewCompletedTasks (event) {
    this.toggleActiveState (event);

    this.setState ({view: "completed"});
  }


  /**
   * Generate a random unique ID for each new task
   */
  generateID () {
    const randomID = () => {

      let value = "";
      for (let i = 0; i <= 10 ; i++) {
        let x = Math.floor (Math.random () * (90 - 65 + 1)) + 65;
        value = value.concat (String.fromCharCode (x));
      }
      return value
    }

    let id = randomID ();
    let idExist = this.state.tasks.find (task => task.id === id);
    while (idExist)
      id = randomID ();
  

    return id;
  }


  /**
   * creat a new task object
   */
  createTask () {

    /* Create a task ID */
    const taskId = this.generateID ();

    this.setState (({tasks, inputText}) => {

      /* Set empty task content to display "Empty task" */
      const taskContent = inputText === ""
                        ? "Empty task"
                        : inputText;

      /* Update tasks */
      const updatedTasks = tasks
        .concat ({id: taskId
                , content: taskContent
                , done: false});

      /* Set state */
      return { tasks: updatedTasks , inputText: ""};
    });
  }


  /**
   * Toggles the state of a task, set the task.done attribute
   * to true or false
   */
  toggleTaskStatus (event) {

    /* find index of task */
    const index = this.state.tasks.findIndex (task =>
      task.id === event.target.parentNode.id);

    const task = this.state.tasks[index];

    this.setState (state => {

      /* update task object */
      state.tasks[index] = { ...task, done: !task.done};

      /* adds a css class to the parent element */
      state.tasks[index].done
        ? event.target.parentNode.classList.add ("done")
        : event.target.parentNode.classList.remove ("done");

      /* update state */
      return {tasks: state.tasks};
    });

  }


  /* removes a task */
  removeTask (event) {
    /* removes task with id attribute */
    const updatedTasks = this.state.tasks.filter (task =>
      task.id !== event.target.parentNode.id);

    /* update state */
    this.setState ({tasks: updatedTasks});
  }


  /* clear all completed tasks */
  clearCompleted () {
    /* removes tasks that have been completed */
    const updatedTasks = this.state.tasks.filter (task =>
      !task.done);

    /* update state */
    this.setState ({tasks: updatedTasks});
  }


  /**
   * Drag and drop implementation
   * this implementation simply looks to swapping the position of
   * the drag task and drop task in this.state.task, causing react to
   * update the element nodes
   */
  dragStarted (event) {
    //start drag
    event.stopPropagation ();

    //set data
    event.dataTransfer.setData ("id", event.target.id);
    // //specify allowed transfer
    event.dataTransfer.effectAllowed = "move";
  }
  
  draggingOver (event) {
    //drag over
    event.preventDefault();
    event.stopPropagation();
    
    event.dataTransfer.dropEffect = "move";
  }
  

  dropped (event) {
    //drop
    event.stopPropagation();
    event.preventDefault();

    let currentId;
    let id = event.dataTransfer.getData ("id");

    // makes sure the drop event occurs on the parent div
    if (!event.target.id)
      currentId = event.target.parentNode.id;
    else currentId = event.target.id;

    // find index of tasks to swap
    let i = this.state.tasks.findIndex (t => t.id === currentId);
    let y = this.state.tasks.findIndex (t => t.id === id);

    const x = this.state.tasks[i];
    const z = this.state.tasks[y];

    
    this.setState (state => {
      // swap task data
      state.tasks[i] = z;
      state.tasks[y] = x;

      // update date
      return {tasks: state.tasks}
    });
  }
  
  
  render () {

    return (
      <div id="app" className={this.state.darkMode ? "dark" : "light"}>
        <Header />

        <Main 
          darkMode={this.state.darkMode}
          toggleTheme={this.toggleTheme}
          onChangeInput={this.onChangeInput}
          inputText={this.state.inputText}
          tasks={this.state.tasks}
          view={this.state.view}
          viewAllTask={this.viewAllTask}
          viewActiveTasks={this.viewActiveTasks}
          viewCompletedTasks={this.viewCompletedTasks}
          clearCompleted={this.clearCompleted}
          createTask={this.createTask}
          toggleTaskStatus={this.toggleTaskStatus}
          removeTask={this.removeTask}
          draggingOver={this.draggingOver}
          dragStarted={this.dragStarted}
          dropped={this.dropped} />

      </div>
    );
  }


  componentDidMount () {
    
    this.retrieveState ();

    const taskInput = document.querySelector (".main__input-component");
    /* Set focus on input component */
    taskInput.focus ();

    /* create tasks by pressing enter button */
    taskInput.addEventListener ("keypress", (event) => {
     if (event.key === "Enter") {
       this.createTask ();

       /* Update input element to show an empty string */
       this.setState ({inputText: ""});
     }  
   });
  }

  componentDidUpdate () {
    this.storeState ();
  }
}

export default App;
