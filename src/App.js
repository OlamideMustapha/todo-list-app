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
      tasks: [
        {id: "item1", content: "Complete online JavaScript course", done: true },
        {id: "item2", content: "Jog around the park 3x", done: false },
        {id: "item3", content: "10 minutes meditation", done: false },
        {id: "item4", content: "Read for 1 hour", done: false },
        {id: "item5", content: "Pick up groceries", done: false },
        {id: "item6", content: "Complete Todo App on Frontent Mentor", done: false },
      ], 
      view: "all"
    }

    this.toggleTheme = this.toggleTheme.bind (this);
    this.onChangeInput = this.onChangeInput.bind (this);
    this.viewAll = this.viewAll.bind (this);
    this.viewActive = this.viewActive.bind (this);
    this.viewCompleted = this.viewCompleted.bind (this);
    this.clearCompleted = this.clearCompleted.bind (this);

  }

  /* handles toggle theme button */
  toggleTheme (event) {
    const app = document.querySelector ("#app");

    if (this.state.darkMode) {
      app.classList.remove ("dark");
      app.classList.add ("light");
    } else {
      app.classList.remove ("light");
      app.classList.add ("dark");
    }

    this.setState (({darkMode}) => ({ darkMode: !darkMode }));
  }

  /* Handle input */
  onChangeInput (event) {
    this.setState ({inputText: event.target.value });
  }

  /* Sorting list */
  viewAll () {
    this.setState ({view: "all"});
  }

  viewActive () {
    this.setState ({view: "active"});
  }

  viewCompleted () {
    this.setState ({view: "completed"});
  }

  clearCompleted () {

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
          viewAll={this.viewAll}
          viewActive={this.viewActive}
          viewCompleted={this.viewCompleted}
          clearCompleted={this.clearCompleted} />
      </div>
    );
  }

  componentDidMount () {

  }
}

export default App;
