class TodoItem {
  constructor(title, description, dueDate, priority, project = 'Default') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.isCompleted = false;
    this.id = crypto.randomUUID();
  }

  toggleIsCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }
  //   I think I should add some methods here like a toggle for
  // isCompleted as well as a priority setter, but not sure yet
  // so adding comment
}

export { TodoItem };
