import '../styles/css/App.css';


const TaskSortComponent = (props) => {
  return (
    <div className= {`main__sortList ${props.className}`}>

      <ul>
        <li className="active" onClick={props.viewAllTask}>All</li>
        <li onClick={props.viewActiveTasks}>Active</li>
        <li onClick={props.viewCompletedTasks}>Completed</li>
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
      className={"hide-mobile"}
      viewAllTask={props.viewAllTask}
      viewActiveTasks={props.viewActiveTasks}
      viewCompletedTasks={props.viewCompletedTasks} />

      <button
        className="main__task-clear-completed--btn btn"
        onClick={props.clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}





const EmptyList = (props) => <div className="main__task-empty">{props.value}</div>;

const TaskList = (props) => {
  const view = props.view;
  const tasks = props.tasks;


  /* adds a css class to tasks that are completed before rendering */
  const task = task =>
    <div
      draggable="true"
      onDragStart={props.dragStarted}
      onDragOver={props.draggingOver}
      onDrop={props.dropped}
      id={task.id} 
      key={task.id}
      
      className={`main__task-item ${task.done ? "done" : ""}`}>

      <button
        className="main__task-btn btn" 
        onClick={props.toggleTaskStatus}>
      </button>
      <h3
        className="main__task-title done"
        >{task.content}</h3>

      <button
        className="main__task-delete-btn btn"
        onClick={props.removeTask}>
      
      </button>
    </div>

  let list = [];

  if (view === "all") {
    
    const t = tasks.map (task);
    list = t.length === 0 ? <EmptyList value="Empty List" /> : t;
  } else if (view === "active") {

    const t = tasks.filter (task => task.done === false).map (task);
    list = t.length === 0 ? <EmptyList value="No active task" /> : t;
  } else {
    
    const t = tasks.filter (task => task.done === true).map (task);
    list = t.length === 0 ? <EmptyList value="No completed task" /> : t;
  }

  return (
    <section className="main__task">

      { list }

      <TaskControlComponent
        viewAllTask={props.viewAllTask}
        viewActiveTasks={props.viewActiveTasks}
        viewCompletedTasks={props.viewCompletedTasks}
        value={tasks.filter (t => t.done === false).length}
        clearCompleted={props.clearCompleted}/>
    </section>
  )
}

const Main = (props) => {

  const themeToggleBtn = <button className= {`main__btn btn ${props.darkMode ? "dark" : "light"}`} onClick={props.toggleTheme}> </button>;

  const taskInput = 
    <div className="main__input">
      <button 
        className="main__input-btn btn"
        onClick={props.createTask}>
      </button>
      
      <label className="main__input-label">
        <input
          className="main__input-component"
          type="text"
          onChange={props.onChangeInput}
          value={props.inputText}
          placeholder={"Create a new todo..."}/>
      </label>
    </div>
  
  
  return (
    <main className="main  container">

      {/* The header section */}
      <section className="main__header">
        <div className="main__title-toggle--wrapper">

          <h1 className="main__title">
            ToDo
          </h1>

          { themeToggleBtn }

        </div>

        <div>

          { taskInput }

        </div>
      </section>
      {/* Section End */}


      {/* Task list Section */}
      <TaskList
        view={props.view}
        tasks={props.tasks}
        viewAllTask={props.viewAllTask}
        viewActiveTasks={props.viewActiveTasks}
        viewCompletedTasks={props.viewCompletedTasks}
        toggleTaskStatus={props.toggleTaskStatus}
        removeTask={props.removeTask}
        clearCompleted={props.clearCompleted}
        draggingOver={props.draggingOver}
        dragStarted={props.dragStarted}
        dropped={props.dropped}/>
      {/* Section end */}


      <TaskSortComponent
        className={"hide-desktop"}
        viewAllTask={props.viewAllTask}
        viewActiveTasks={props.viewActiveTasks}
        viewCompletedTasks={props.viewCompletedTasks} />


      <div className="main__instruction">Drag and drop to reorder list</div>
    </main>
  )
}

export default Main;