import {User, TodoList, Todo} from './classes'

function formatDate(date: Date): string{
    return date.toISOString().slice(0,10);
}

function saveToLocalStorage(updatedUser: User) {
  const lol: any = {};
  updatedUser.listOfLists.forEach(list => {
  lol[list.title] = {
      title: list.title,
      todos: Array.from(list.todos.values()).map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          complete: todo.complete,
          urgent: todo.urgent,
          parentList: todo.parentList ? todo.parentList : null
        }
      })
    }
  })
  const userJSON = JSON.stringify({
    name: updatedUser.name,
    listOfLists: lol
  });
  localStorage.setItem('user', userJSON);
}

function loadFromLocalStorage(savedUser: any): User {
  const lolMap = new Map(Object.entries(savedUser.listOfLists));
  savedUser.listOfLists = lolMap;
  savedUser.listOfLists.forEach((list: { title: any; todos: any }) => {
    const savedList = new TodoList({title: list.title, todos: list.todos, user: savedUser});
    savedUser.listOfLists.set(list.title, savedList);
    const curr = savedUser.listOfLists.get(list.title)
    const todoMap = new Map();
    if (curr) {
      curr.todos.forEach((todo: { id: any; title: any; description: any; dueDate: string | number | Date; urgent: any; complete: any; parentList: any }) => {
        const savedTodo = new Todo({id: todo.id, title: todo.title, description: todo.description, dueDate: new Date(todo.dueDate), urgent: todo.urgent, complete: todo.complete, parentList: todo.parentList})
        todoMap.set(todo.id, savedTodo);
      })
      curr.todos = todoMap
    }
  })
  return savedUser;   
}

function generateNewListName(listOfLists: Map<string, TodoList>): string {
  let listNum = 1;
  let newListTitle = `Untitled List ${listNum}`
  let unique;
  let allTitlesChecked = false;
  while (!allTitlesChecked) {
    unique = true;
    for (const [listTitle, list] of listOfLists) {
      if (listTitle === newListTitle) {
        unique = false;
        listNum++
        newListTitle = `Untitled List ${listNum}`;
        break;
      }
    }
    if (unique) {
      allTitlesChecked = true;
    }
  }
  return newListTitle;
}

export {
    formatDate,
    saveToLocalStorage,
    loadFromLocalStorage,
    generateNewListName
}