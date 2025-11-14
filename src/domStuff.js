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
    const allProjectsUl = document.createElement('ul');
    projectList.getProjectListArray().forEach((project) => {
      const projectLi = document.createElement('li');
      projectLi.textContent = project.title;
      allProjectsUl.appendChild(projectLi);
    });
    allProjectsDiv.appendChild(allProjectsUl);
    this.contentDiv.appendChild(allProjectsDiv);
  }
}

export { DOMStuff };
