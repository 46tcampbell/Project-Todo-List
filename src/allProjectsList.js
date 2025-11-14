// class ProjectList {
//   constructor(title, description) {
//     this.title = 'My Projects';
//     this.projectListArray = [];
//   }

//   addProject(projectArray) {
//     this.projectListArray.push(projectArray);
//   }

//   removeProject(projectArray) {
//     const newArray = this.projectListArray.filter(
//       (array) => array !== projectArray
//     );
//     this.projectListArray = newArray;
//   }
// }

// export { ProjectList };

const projectList = (function () {
  const title = 'My Projects';
  const projectListArray = [];

  const addProject = (projectArray) => {
    projectListArray.push(projectArray);
  };

  const removeProject = (projectArray) => {
    const newArray = projectListArray.filter((array) => array !== projectArray);
    projectListArray = newArray;
  };

  const getProjectListArray = () => {
    return projectListArray;
  };

  return { title, addProject, removeProject, getProjectListArray };
})();

export { projectList };
