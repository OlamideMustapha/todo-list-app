import '../styles/css/App.css';

const ThemeToggleComponent = (props) => {
  return (
    <button className= {`main__btn btn ${props.mode}`} onClick={props.toggle}>
    </button>
  )
}


const TaskInputComponent = (props) => {
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


const TaskSortComponent = (props) => {
  return (
    <div className= {`main__sortList ${props.className}`}>
      <ul>
        <li onClick={props.viewAll}>All</li>
        <li onClick={props.viewActive}>Active</li>
        <li onClick={props.viewCompleted}>Completed</li>
      </ul>
    </div>
  );
}

const TaskControlComponent = (props) => {
  const value = props.value > 1 
        ? `${props.value} items left`
        : `${props.value} item left`;

  return (
    <div className="main__task-controls">
      <div className="main__task-items-left">
        {value}
      </div>

    <TaskSortComponent
      className={"hide-desktop"}
      viewAll={props.viewAll}
      viewACtive={props.viewACtive}
      viewCompleted={props.viewCompleted} />

      <button
        className="main__task-clear-completed--btn btn"
        onClick={props.clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}


const TaskList = (props) => {
  const view = props.view;
  const tasks = props.tasks;
  const task = task =>
    <div id={task.id} className="main__task-item">
      <div className="main__task-checkBox"></div>
      <h3 className="main__task-title">{task.content}</h3>
    </div>;

  return (
    <section className="main__task">
      {
        view === "all" ? tasks.map (task)
      : view === "active" ? tasks.filter (task => task.done === false).map (task)
      : tasks.filter (task => task.done === true).map (task)
      }

      <TaskControlComponent
        viewAll={props.viewAll}
        viewACtive={props.viewACtive}
        viewCompleted={props.viewCompleted}
        value={tasks.filter (t => t.done === false).length}
        clearCompleted={props.clearCompleted}/>
    </section>
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
          <TaskInputComponent
            onChangeInput={props.onChangeInput}
            inputText={props.inputText} />
        </div>
      </section>
      {/* Section End */}
      <TaskList
        view={props.view}
        tasks={props.tasks}
        viewAll={props.viewAll}
        viewACtive={props.viewACtive}
        viewCompleted={props.viewCompleted}/>


      <TaskSortComponent
        className={"hide-mobile"}
        viewAll={props.viewAll}
        viewACtive={props.viewACtive}
        viewCompleted={props.viewCompleted} />


    </main>
  )
}

export default Main;
