import './styles.css';
import { TodoItem } from './todoItem';
import { Project } from './project';
import { DOMStuff } from './domStuff';

const todo = new TodoItem(
  'Single TodoItem',
  'This is a single todo item',
  '1/24/25',
  'p1'
);
const todo2 = new TodoItem(
  'Single TodoItem #2',
  'This is a single todo item #2',
  '1/24/25',
  'p2'
);
// console.log(todo);
// console.log(todo2);
const default1 = new Project('Default', 'This is a single Project');
// const project2 = new Project('Single Project - 2', 'This is a single Project');
// const project3 = new Project('Single Project - 3', 'This is a single Project');
// console.log(default1);
default1.addTodo(todo);
// console.log(default1);
default1.addTodo(todo2);
// console.log(default1);
// const projectList = new ProjectList();

// console.log(projectList);
// projectList.addProject(default1);
// projectList.addProject(project2);
// projectList.addProject(project3);
// console.log(projectList);
// console.log(projectList.getProjectListArray());
const domStuff = new DOMStuff();
// domStuff.showAddTaskModal();
// domStuff.showAllProjects(projectList.projectListArray);

// project.removeTodo(todo);
// console.log(projectList);
// projectList.removeProject(project);
// console.log(projectList);
// todo.toggleIsCompleted();
// console.log(todo);
// todo.updatePriority('p4');
// console.log(todo);
