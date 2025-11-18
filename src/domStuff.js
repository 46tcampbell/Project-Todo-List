import { TodoItem } from './todoItem';
import { Project } from './project';

class DOMStuff {
  constructor() {
    this.cacheDom();
    this.bindEvents();
  }
  cacheDom() {
    this.allProjectsBtn = document.querySelector('#all-projects');
    this.addTodoBtn = document.querySelector('#add-todo');
    this.contentDiv = document.querySelector('#content');
    this.addTodoModal = document.querySelector('#add-todo-modal');
    this.projectModalSelect = document.querySelector('#todoProject');
    this.todoSubmitModalBtn = document.querySelector('#todo-submit-modal-btn');
    this.addProjectBtn = document.querySelector('#add-project');
    this.addProjectModal = document.querySelector('#add-project-modal');
    this.projectSubmitModalBtn = document.querySelector(
      '#project-submit-modal-btn'
    );
    this.todoTitle = document.querySelector('#todoTitle');
    this.todoDescription = document.querySelector('#todoDescription');
    this.todoDueDate = document.querySelector('#dueDate');
    this.todoPriority = document.querySelector(
      'input[name="priority"]:checked'
    );
    this.todoProject = document.querySelector('#todoProject');
    this.dialogH2 = document.querySelector('#dialog-h2');
  }

  bindEvents() {
    this.allProjectsBtn.addEventListener(
      'click',
      this.showAllProjects.bind(this)
    );
    this.addTodoBtn.addEventListener('click', this.showAddTodoModal.bind(this));
    this.todoSubmitModalBtn.addEventListener(
      'click',
      this.submitAddTodoModal.bind(this)
    );
    this.addProjectBtn.addEventListener(
      'click',
      this.showAddProjectModal.bind(this)
    );
    this.projectSubmitModalBtn.addEventListener(
      'click',
      this.submitAddProjectModal.bind(this)
    );
  }

  showAllProjects() {
    this.contentDiv.textContent = '';
    const allProjectsDiv = document.createElement('div');
    const allProjectsH2 = document.createElement('h2');
    allProjectsH2.textContent = Project.getAllProjectsTitle();
    allProjectsDiv.appendChild(allProjectsH2);
    const allProjectsUl = document.createElement('ul');
    Project.getProjectListArray().forEach((project) => {
      const projectLi = document.createElement('li');
      const projectLiBtn = document.createElement('button');
      projectLiBtn.textContent = project.title;
      projectLiBtn.addEventListener('click', () => {
        this.showAllProjectTodos(project.todoListArray, project.title);
      });
      projectLi.appendChild(projectLiBtn);
      allProjectsUl.appendChild(projectLi);
    });
    allProjectsDiv.appendChild(allProjectsUl);
    this.contentDiv.appendChild(allProjectsDiv);
  }

  showAllProjectTodos(projectTodoListArray, projectTitle) {
    this.contentDiv.textContent = '';
    const allTodosDiv = document.createElement('div');
    const allTodosH2 = document.createElement('h2');
    allTodosH2.textContent = `${projectTitle} - All Todos`;
    allTodosDiv.appendChild(allTodosH2);
    const allTodosUl = document.createElement('ul');
    projectTodoListArray.forEach((todo) => {
      const todoLi = document.createElement('li');
      todoLi.classList.add('todoLi');
      const todoTitleDiv = document.createElement('div');
      const todoDueDateDiv = document.createElement('div');
      todoTitleDiv.textContent = todo.title;
      todoDueDateDiv.textContent = todo.dueDate;
      const todoProjectName = todo.project;
      //   likely need to add an event listener to this li in the
      // future to make it easy to click and open the modal for
      // editing the todo.
      todoLi.addEventListener('click', () => {
        this.showEditTodoModal(todo, todoProjectName);
      });
      todoLi.appendChild(todoTitleDiv);
      todoLi.appendChild(todoDueDateDiv);
      allTodosUl.appendChild(todoLi);
    });
    allTodosDiv.appendChild(allTodosUl);
    this.contentDiv.appendChild(allTodosDiv);
  }

  showEditTodoModal(todo, todoProjectName) {
    console.log(todo);
    this.addTodoModal.showModal();
    this.showTodoModalProjectSelectOptions();
    this.dialogH2.textContent = 'Edit Todo';
    this.todoTitle.value = todo.title;
    this.todoDescription.value = todo.description;
    this.todoDueDate.value = todo.dueDate;
    this.todoPriority.value = todo.priority;

    const selectedProject = Project.findByName(todoProjectName);
    const todoOptionToSelect = this.projectModalSelect.querySelector(
      `option[value='${selectedProject.id}']`
    );
    console.log(selectedProject);
    console.log(this.projectModalSelect.options);
    console.log(todoOptionToSelect);
    if (todoOptionToSelect) {
      todoOptionToSelect.selected = true;
    }
    // this.todoProject.value = todo.project;
    // 11/17/25: Left off here today and am getting stuck at populating the
    // current project in the edit modal. Just need to review what I'm doing
  }

  showAddTodoModal() {
    this.addTodoModal.showModal();
    this.dialogH2.textContent = 'Add New Todo';
    // Project.getProjectListArray().forEach((project) => {
    //   const option = document.createElement('option');
    //   option.value = project.id;
    //   option.textContent = project.title;
    //   this.projectModalSelect.appendChild(option);
    // });
    this.showTodoModalProjectSelectOptions();
  }

  submitAddTodoModal(e) {
    e.preventDefault();
    const title = this.todoTitle.value;
    const description = this.todoDescription.value;
    const dueDate = this.todoDueDate.value;
    const priority = this.todoPriority.value;
    const project = this.todoProject.value;
    const newTodo = new TodoItem(
      title,
      description,
      dueDate,
      priority,
      project
    );
    const selectedProject = Project.findById(project);
    // console.log(newTodo);
    // console.log(newTodo.project);
    // console.log(selectedProject);
    selectedProject.addTodo(newTodo);
    // console.log(selectedProject);
    console.log(dueDate);
    this.todoTitle.value = '';
    this.todoDescription.value = '';
    this.todoDueDate.value = '';
    this.todoPriority.value = '';
    this.todoProject.value = '';
    this.addTodoModal.close();
  }

  showAddProjectModal() {
    this.addProjectModal.showModal();
  }

  submitAddProjectModal(e) {
    e.preventDefault();
    const projectTitle = document.querySelector('#projectTitle');
    const projectDescription = document.querySelector('#projectDescription');
    const title = projectTitle.value;
    const description = projectDescription.value;
    const newProject = new Project(title, description);
    console.log(newProject);
    console.log(Project.getProjectListArray());
    projectTitle.value = '';
    projectDescription.value = '';
    this.addProjectModal.close();
  }
  showTodoModalProjectSelectOptions() {
    this.projectModalSelect.options.length = 0;
    Project.getProjectListArray().forEach((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.title;
      this.projectModalSelect.appendChild(option);
    });
  }
}

export { DOMStuff };
