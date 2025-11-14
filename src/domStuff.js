import { projectList } from './allProjectsList';

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
    this.projectModalSelect = document.querySelector('#project');
  }

  bindEvents() {
    this.allProjectsBtn.addEventListener(
      'click',
      this.showAllProjects.bind(this)
    );
  }

  showAllProjects() {
    this.contentDiv.textContent = '';
    const allProjectsDiv = document.createElement('div');
    const allProjectsH2 = document.createElement('h2');
    allProjectsH2.textContent = projectList.title;
    allProjectsDiv.appendChild(allProjectsH2);
    const allProjectsUl = document.createElement('ul');
    projectList.getProjectListArray().forEach((project) => {
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
    projectList.getProjectListArray().forEach((project) => {
      const option = document.createElement('option');
      option.value = project.title;
      option.textContent = project.title;
      this.projectModalSelect.appendChild(option);
    });
  }
}

export { DOMStuff };
