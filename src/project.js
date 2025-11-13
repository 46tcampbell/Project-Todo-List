class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.todoListArray = [];
  }

  addTodo(todoObject) {
    this.todoListArray.push(todoObject);
  }
}

export { Project };
