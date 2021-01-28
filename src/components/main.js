import '../styles/css/App.css';

const ThemeToggleComponent = (props) => {
  return (
    <button className= {`main__btn ${props.mode}`} onClick={props.toggle}>
    </button>
  )
}


const TodoInputComponent = (props) => {
  return (
    <div className="main__input">
      <div className="main__input-checkBox"></div>
      <label className="main__input-label">
        <input
          className="main__input-component"
          type="text"
          onChange={props.onChangeInput}
          value={props.inputText}
          placeholder={"Create a new todo..."}/>
      </label>
    </div>
  )
}


const Main = (props) => {
  return (
    <main className="main  container">
      {/* The header section */}
      <section className="main__header">
        <div className="main__title-toggle--wrapper">
          <h1 className="main__title">
            ToDo
          </h1>

          <ThemeToggleComponent
            mode={props.darkMode ? "dark" : "light"}
            toggle={props.toggleTheme}/>
        </div>

        <div>
          <TodoInputComponent
            onChangeInput={props.onChangeInput}
            inputText={props.inputText} />
        </div>
      </section>
      {/* Section End */}

    </main>
  )
}

export default Main;
