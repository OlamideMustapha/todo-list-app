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
      list: [
        {id: "item1", content: "Complete online JavaScript course", done: true },
        {id: "item2", content: "Jog around the park 3x", done: false },
        {id: "item3", content: "10 minutes meditation", done: false },
        {id: "item4", content: "Read for 1 hour", done: false },
        {id: "item5", content: "Pick up groceries", done: false },
        {id: "item6", content: "Complete Todo App on Frontent Mentor", done: false },
      ]
    }

    this.toggleTheme = this.toggleTheme.bind (this)
    this.onChangeInput = this.onChangeInput.bind (this)
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

  render () {
    return (
      <div id="app" className={this.darkMode ? "dark" : "light"}>
        <Header />

        <Main 
          darkMode={this.darkMode}
          toggleTheme={this.toggleTheme}
          onChangeInput={this.onChangeInput}
          inputText={this.inputText} />
      </div>
    )
  }

  componentDidMount () {

  }
}

export default App;
