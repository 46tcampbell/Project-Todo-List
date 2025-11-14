class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.todoListArray = [];
  }

  addTodo(todoObject) {
    this.todoListArray.push(todoObject);
  }

  removeTodo(todoObject) {
    const newArray = this.todoListArray.filter((obj) => obj !== todoObject);
    this.todoListArray = newArray;
  }
}

export { Project };
