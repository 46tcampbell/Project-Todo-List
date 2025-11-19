class TodoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    project = 'Default',
    id = crypto.randomUUID()
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.isCompleted = false;
    this.id = id;
  }

  toggleIsCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  editTodo(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
}

export { TodoItem };
