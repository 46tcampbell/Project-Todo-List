import './styles.css';
import { TodoItem } from './todoItem';
import { Project } from './project';
import { DOMStuff } from './domStuff';

// const todo = new TodoItem(
//   'Single TodoItem',
//   'This is a single todo item',
//   '2025-11-18',
//   'p1'
// );
// const todo2 = new TodoItem(
//   'Single TodoItem #2',
//   'This is a single todo item #2',
//   '2025-11-18',
//   'p2'
// );

const default1 = new Project('Default', 'This is a single Project');
// default1.addTodo(todo);
// default1.addTodo(todo2);
console.log(default1);
const domStuff = new DOMStuff();
