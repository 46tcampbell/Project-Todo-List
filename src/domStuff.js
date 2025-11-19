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
    this.todoId = document.querySelector('#todoId');
    this.todoProjectId = document.querySelector('#todoProjectId');
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
      const todoButtonDiv = document.createElement('div');
      const todoEditBtn = document.createElement('button');
      const todoDeleteBtn = document.createElement('button');
      todoTitleDiv.textContent = todo.title;
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
    this.addTodoModal.close();
    this.showAllProjectTodos(
      selectedProject.todoListArray,
      selectedProject.title
    );
    Project.updateLocalStorage();
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
    projectTitle.value = '';
    projectDescription.value = '';
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
}

export { DOMStuff };
