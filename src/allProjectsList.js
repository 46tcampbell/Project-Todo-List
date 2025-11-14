class ProjectList {
  constructor(title, description) {
    this.title = 'My Projects';
    this.projectListArray = [];
  }

  addProject(projectArray) {
    this.projectListArray.push(projectArray);
  }

  removeProject(projectArray) {
    const newArray = this.projectListArray.filter(
      (array) => array !== projectArray
    );
    this.projectListArray = newArray;
  }
}

export { ProjectList };
