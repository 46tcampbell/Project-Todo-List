import { TodoItem } from './todoItem';
import { Project } from './project';

class DOMStuff {
  constructor() {
    this.cacheDom();
    this.bindEvents();
  }
  cacheDom() {
    this.allProjectsBtn = document.querySelector('#all-projects');
    this.addTaskBtn = document.querySelector('#add-task');
    this.contentDiv = document.querySelector('#content');
    this.addTaskModal = document.querySelector('#add-task-modal');
    this.projectModalSelect = document.querySelector('#todoProject');
    this.todoSubmitModalBtn = document.querySelector('#todo-submit-modal-btn');
    this.addProjectBtn = document.querySelector('#add-project');
    this.addProjectModal = document.querySelector('#add-project-modal');
    this.projectSubmitModalBtn = document.querySelector(
      '#project-submit-modal-btn'
    );
  }

  bindEvents() {
    this.allProjectsBtn.addEventListener(
      'click',
      this.showAllProjects.bind(this)
    );
    this.addTaskBtn.addEventListener('click', this.showAddTaskModal.bind(this));
    this.todoSubmitModalBtn.addEventListener(
      'click',
      this.submitAddTaskModal.bind(this)
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
        this.showAllProjectTasks(project.todoListArray, project.title);
      });
      projectLi.appendChild(projectLiBtn);
      allProjectsUl.appendChild(projectLi);
    });
    allProjectsDiv.appendChild(allProjectsUl);
    this.contentDiv.appendChild(allProjectsDiv);
  }

  showAllProjectTasks(projectTodoListArray, projectTitle) {
    this.contentDiv.textContent = '';
    const allTodosDiv = document.createElement('div');
    const allTodosH2 = document.createElement('h2');
    allTodosH2.textContent = projectTitle;
    allTodosDiv.appendChild(allTodosH2);
    const allTodosUl = document.createElement('ul');
    projectTodoListArray.forEach((todo) => {
      const todoLi = document.createElement('li');
      const todoTitleDiv = document.createElement('div');
      const todoDescriptionDiv = document.createElement('div');
      todoTitleDiv.textContent = todo.title;
      todoDescriptionDiv.textContent = todo.description;
      //   likely need to add an event listener to this li in the
      // future to make it easy to click and open the modal for
      // editing the task.
      todoLi.appendChild(todoTitleDiv);
      todoLi.appendChild(todoDescriptionDiv);
      allTodosUl.appendChild(todoLi);
    });
    allTodosDiv.appendChild(allTodosUl);
    this.contentDiv.appendChild(allTodosDiv);
  }

  showAddTaskModal() {
    this.addTaskModal.showModal();
    this.projectModalSelect.options.length = 0;
    Project.getProjectListArray().forEach((project) => {
      const option = document.createElement('option');
      option.value = project.id;
      option.textContent = project.title;
      this.projectModalSelect.appendChild(option);
    });
  }

  submitAddTaskModal(e) {
    e.preventDefault();
    const todoTitle = document.querySelector('#todoTitle');
    const todoDescription = document.querySelector('#todoDescription');
    const todoDueDate = document.querySelector('#dueDate');
    const todoPriority = document.querySelector(
      'input[name="priority"]:checked'
    );
    const todoProject = document.querySelector('#todoProject');
    const title = todoTitle.value;
    const description = todoDescription.value;
    const dueDate = todoDueDate.value;
    const priority = todoPriority.value;
    const project = todoProject.value;
    const newTodo = new TodoItem(
      title,
      description,
      dueDate,
      priority,
      project
    );
    const selectedProject = Project.findById(project);
    console.log(newTodo);
    console.log(newTodo.project);
    console.log(selectedProject);
    selectedProject.addTodo(newTodo);
    console.log(selectedProject);
    todoTitle.value = '';
    todoDescription.value = '';
    todoDueDate.value = '';
    todoPriority.value = '';
    todoProject.value = '';
    this.addTaskModal.close();
    // project.todoListArray.push(newTodo);
    // projectList.getProjectListArray()
    // this.myLibrary.push(newBook);
    // bookTitle.value = '';
    // bookAuthor.value = '';
    // bookPages.value = '';
    // // bookRead.value = '';
    // this.addBookToTable();
    // this.dialog.close();
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
}

export { DOMStuff };
