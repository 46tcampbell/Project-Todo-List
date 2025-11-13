class ProjectList {
  constructor(title, description) {
    this.title = 'My Projects';
    this.projectListArray = [];
  }

  addProject(projectArray) {
    this.projectListArray.push(projectArray);
  }
}

export { ProjectList };
