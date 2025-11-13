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
console.log(todo);
const project = new Project('Single Project', 'This is a single Project');
console.log(project);
project.addTodo(todo);
console.log(project);
const projectList = new ProjectList();
console.log(projectList);
projectList.addProject(project);
console.log(projectList);
