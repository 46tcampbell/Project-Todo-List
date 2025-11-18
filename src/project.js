class Project {
  static #allProjectsTitle = 'My Projects';
  static #projectListArray = [];

  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.id = crypto.randomUUID();
    this.todoListArray = [];
    Project.#projectListArray.push(this);
  }

  static findById(id) {
    return Project.#projectListArray.find((instance) => instance.id === id);
  }

  static findByName(title) {
    return Project.#projectListArray.find(
      (instance) => instance.title === title
    );
  }

  static getProjectListArray() {
    return Project.#projectListArray;
  }

  static getAllProjectsTitle() {
    return Project.#allProjectsTitle;
  }

  static removeProject(projectArray) {
    const newArray = projectListArray.filter((array) => array !== projectArray);
    Project.#projectListArray = newArray;
  }

  addTodo(todoObject) {
    this.todoListArray.push(todoObject);
  }

  removeTodo(todoObject) {
    const newArray = this.todoListArray.filter((obj) => obj !== todoObject);
    this.todoListArray = newArray;
  }

  moveTodo(todo, newProjectArray) {
    const todoToMoveIndex = this.todoListArray.findIndex(
      (currProjectTodo) => currProjectTodo.id === todo
    );
    const todoToMove = this.todoListArray.splice(todoToMoveIndex, 1);
    console.log(todoToMove[0]);
    todoToMove[0].project = newProjectArray.id;
    newProjectArray.todoListArray.push(todoToMove[0]);
    // const newArray = this.todoListArray.filter((obj) => obj !== todoObject);
    // this.todoListArray = newArray;
  }

  updateTodo(todoId, title, description, dueDate, priority) {
    const todoToEdit = this.findById(todoId);
    console.log(todoToEdit);
    todoToEdit.title = title;
    todoToEdit.description = description;
    todoToEdit.dueDate = dueDate;
    todoToEdit.priority = priority;
  }

  findById(id) {
    return this.todoListArray.find((instance) => instance.id === id);
  }
}

export { Project };
