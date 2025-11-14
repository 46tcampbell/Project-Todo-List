import './styles.css';
import { TodoItem } from './todoItem';
import { Project } from './project';
import { ProjectList } from './allProjectsList';

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
console.log(todo);
console.log(todo2);
const project = new Project('Single Project', 'This is a single Project');
console.log(project);
project.addTodo(todo);
console.log(project);
project.addTodo(todo2);
console.log(project);
const projectList = new ProjectList();
console.log(projectList);
projectList.addProject(project);
console.log(projectList);
project.removeTodo(todo);
console.log(projectList);
projectList.removeProject(project);
console.log(projectList);
