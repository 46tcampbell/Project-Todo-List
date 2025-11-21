import { TodoItem } from './todoItem';
import { Project } from './project';
import { format, formatDistanceToNow } from 'date-fns';

class DOMStuff {
  constructor() {
    this.cacheDom();
    this.bindEvents();
    this.initialPageLoad();
  }
  cacheDom() {
    this.allProjectsBtn = document.querySelector('#all-projects');
    this.addTodoBtn = document.querySelector('#add-todo');
    this.contentDiv = document.querySelector('#content');
    this.addTodoModal = document.querySelector('#add-todo-modal');
    this.addTodoForm = document.querySelector('#add-todo-form');
    this.projectModalSelect = document.querySelector('#todoProject');
    this.todoSubmitModalBtn = document.querySelector('#todo-submit-modal-btn');
    this.todoCloseModalBtn = document.querySelector('#todo-close-modal-btn');
    this.addProjectBtn = document.querySelector('#add-project');
    this.addProjectModal = document.querySelector('#add-project-modal');
    this.addProjectForm = document.querySelector('#add-project-form');
    this.projectSubmitModalBtn = document.querySelector(
      '#project-submit-modal-btn'
    );
    this.projectCloseModalBtn = document.querySelector(
      '#project-close-modal-btn'
    );
    this.todoTitle = document.querySelector('#todoTitle');
    this.todoDescription = document.querySelector('#todoDescription');
    this.todoDueDate = document.querySelector('#dueDate');
    this.todoPriority = document.querySelector(
      'input[name="priority"]:checked'
    );
    this.todoProject = document.querySelector('#todoProject');
    this.todoId = document.querySelector('#todoId');
    this.todoProjectId = document.querySelector('#todoProjectId');
    this.dialogH2 = document.querySelector('#dialog-h2');
    this.todoErrorContainer = document.querySelector('.todo-error-messages');
    this.projectErrorContainer = document.querySelector(
      '.project-error-messages'
    );
    this.projectTitle = document.querySelector('#projectTitle');
    this.projectDescription = document.querySelector('#projectDescription');
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
    this.todoCloseModalBtn.addEventListener(
      'click',
      this.closeTodoModal.bind(this)
    );
    this.addProjectBtn.addEventListener(
      'click',
      this.showAddProjectModal.bind(this)
    );
    this.projectSubmitModalBtn.addEventListener(
      'click',
      this.submitAddProjectModal.bind(this)
    );
    this.projectCloseModalBtn.addEventListener(
      'click',
      this.closeAddProjectModal.bind(this)
    );
  }

  showAllProjects() {
    this.contentDiv.textContent = '';
    const allProjectsDiv = document.createElement('div');
    const allProjectsH2 = document.createElement('h2');
    allProjectsH2.textContent = Project.getAllProjectsTitle();
    allProjectsDiv.classList.add('all-projects-div');
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
    allTodosDiv.classList.add('all-project-todos-div');
    allTodosDiv.appendChild(allTodosH2);
    const allTodosUl = document.createElement('ul');
    projectTodoListArray.forEach((todo) => {
      const todoLi = document.createElement('li');
      todoLi.classList.add('todoLi');
      const todoTitleDiv = document.createElement('div');
      todoTitleDiv.classList.add('todo-title');
      const todoDueDateDiv = document.createElement('div');
      todoDueDateDiv.classList.add('todo-due-date');
      const todoButtonDiv = document.createElement('div');
      const todoEditBtn = document.createElement('button');
      const todoDeleteBtn = document.createElement('button');
      todoButtonDiv.classList.add('todo-li-div');
      todoTitleDiv.textContent = todo.title;
      console.log(todo.dueDate);
      const formattedDate = format(todo.dueDate, 'PPPP');
      const distanceToDueDate = formatDistanceToNow(todo.dueDate);
      todoDueDateDiv.textContent = `${formattedDate} (Due in ${distanceToDueDate})`;
      todoEditBtn.textContent = 'See Details/Edit Todo';
      todoDeleteBtn.textContent = 'Delete Todo';
      const todoProjectId = todo.project;
      todoEditBtn.addEventListener('click', () => {
        this.showEditTodoModal(todo, todoProjectId);
      });
      todoDeleteBtn.addEventListener('click', () => {
        this.deleteTodo(todo, todoProjectId);
      });
      todoButtonDiv.appendChild(todoEditBtn);
      todoButtonDiv.appendChild(todoDeleteBtn);
      todoLi.appendChild(todoTitleDiv);
      todoLi.appendChild(todoDueDateDiv);
      todoLi.appendChild(todoButtonDiv);
      allTodosUl.appendChild(todoLi);
    });
    allTodosDiv.appendChild(allTodosUl);
    this.contentDiv.appendChild(allTodosDiv);
  }

  showEditTodoModal(todo, todoProjectId) {
    this.addTodoModal.showModal();
    this.showTodoModalProjectSelectOptions();
    this.dialogH2.textContent = 'Edit Todo';
    this.todoTitle.value = todo.title;
    this.todoDescription.value = todo.description;
    this.todoDueDate.value = todo.dueDate;
    this.todoPriority.value = todo.priority;
    this.todoId.value = todo.id;
    this.todoProjectId.value = todoProjectId;

    const selectedProject = Project.findById(todoProjectId);
    console.log(selectedProject);
    console.log(this.projectModalSelect);

    const todoOptionToSelect = this.projectModalSelect.querySelector(
      `option[value='${selectedProject.id}']`
    );

    if (todoOptionToSelect) {
      todoOptionToSelect.selected = true;
    }
  }

  showAddTodoModal() {
    this.addTodoModal.showModal();
    this.dialogH2.textContent = 'Add New Todo';
    this.showTodoModalProjectSelectOptions();
  }

  submitAddTodoModal(e) {
    e.preventDefault();
    let isValid = true;
    const errorMessages = [];
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (this.todoTitle.value.trim() === '') {
      isValid = false;
      errorMessages.push('Title is required.');
    }

    if (this.todoDescription.value.trim() === '') {
      isValid = false;
      errorMessages.push('Description is required.');
    }

    if (!dateRegex.test(this.todoDueDate.value)) {
      isValid = false;
      errorMessages.push('Please choose a due date');
    }

    if (!isValid) {
      this.todoErrorContainer.innerHTML = errorMessages.join('<br>');
      this.todoErrorContainer.style.display = 'block';
      this.todoErrorContainer.style.color = 'red';
      return;
    }
    const title = this.todoTitle.value;
    const description = this.todoDescription.value;
    const dueDate = this.todoDueDate.value;
    const priority = this.todoPriority.value;
    const project = this.todoProject.value;
    const selectedProject = Project.findById(project);
    const previousProject = Project.findById(this.todoProjectId.value);
    console.log(selectedProject);
    if (this.todoId.value) {
      console.log(this.todoId.value);
      previousProject.updateTodo(
        this.todoId.value,
        title,
        description,
        dueDate,
        priority
      );
      if (this.todoProjectId.value !== selectedProject.id) {
        const projectToRemoveTodo = Project.findById(this.todoProjectId.value);
        projectToRemoveTodo.moveTodo(this.todoId.value, selectedProject);
      }
    } else {
      const newTodo = new TodoItem(
        title,
        description,
        dueDate,
        priority,
        project
      );
      selectedProject.addTodo(newTodo);
    }
    this.todoTitle.value = '';
    this.todoDescription.value = '';
    this.todoDueDate.value = '';
    this.todoPriority.value = '';
    this.todoProject.value = '';
    this.todoId.value = '';
    this.todoProjectId.value = '';
    this.todoErrorContainer.innerHTML = '';
    this.addTodoModal.close();
    this.showAllProjectTodos(
      selectedProject.todoListArray,
      selectedProject.title
    );
    Project.updateLocalStorage();
  }

  closeTodoModal() {
    this.addTodoModal.close();
    this.addTodoForm.reset();
    this.todoErrorContainer.innerHTML = '';
  }

  closeAddProjectModal() {
    this.addProjectModal.close();
    this.addProjectForm.reset();
    this.projectErrorContainer.innerHTML = '';
  }

  showAddProjectModal() {
    this.addProjectModal.showModal();
  }

  submitAddProjectModal(e) {
    e.preventDefault();
    let isValid = true;
    const errorMessages = [];

    if (this.projectTitle.value.trim() === '') {
      isValid = false;
      errorMessages.push('Title is required.');
    }

    if (this.projectDescription.value.trim() === '') {
      isValid = false;
      errorMessages.push('Description is required.');
    }

    if (!isValid) {
      this.projectErrorContainer.innerHTML = errorMessages.join('<br>');
      this.projectErrorContainer.style.display = 'block';
      this.projectErrorContainer.style.color = 'red';
      return;
    }
    const title = this.projectTitle.value;
    const description = this.projectDescription.value;
    const newProject = new Project(title, description);
    this.projectTitle.value = '';
    this.projectDescription.value = '';
    this.addProjectModal.close();
    this.showAllProjects();
    Project.updateLocalStorage();
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

  deleteTodo(todo, todoProjectId) {
    const projectToRemoveTodo = Project.findById(todoProjectId);
    projectToRemoveTodo.removeTodo(todo);
    this.showAllProjectTodos(
      projectToRemoveTodo.todoListArray,
      projectToRemoveTodo.title
    );
    Project.updateLocalStorage();
  }

  initialPageLoad() {
    Project.checkLocalStorage();
  }

  checkAddTodoValidity() {}
}

export { DOMStuff };
