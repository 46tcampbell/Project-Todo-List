import './styles.css';
import { TodoItem } from './todoItem';
import { Project } from './project';

const todo = new TodoItem('Test', 'Test', '1/24/25', 'p1');
console.log(todo);
const project = new Project('Test', 'Test');
console.log(project);
project.addTodo(todo);
console.log(project);
