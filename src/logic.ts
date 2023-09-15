// import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
// import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
// import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'
// import isAfter from 'date-fns/isAfter'
import { v4 as uuidv4 } from 'uuid'

class User {
    name: string;
    listOfLists: Map<string, TodoList>;

    constructor(name="New User") {
            this.name = name;
            this.listOfLists = new Map().set("My List", new TodoList(this));
    }

    createTodoList(): TodoList {
        const newTodoList = new TodoList(this);
        return newTodoList;
    }
}

class TodoList {
    title: string;
    todos: Todo[];
    user: User;

    constructor(user: User, title="New Todo List") {
        this.title = title;
        this.todos = [];
        this.user = user;
    }

    createTodo(): Todo {
        const newTodo = new Todo(this);
        return newTodo;
    }
}

class Todo {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    urgent: boolean;
    complete: boolean;
    parentList: TodoList | null;

    constructor(parent: TodoList | null) {
        this.id = uuidv4();
        this.title = "New Todo";
        this.description = "";
        this.dueDate = new Date();
        this.urgent = false;
        this.complete = false;
        this.parentList = parent;
    }

    updateTitle(newTitle: string): void {
        this.title = newTitle;
    }

    updateDescription(newDescription: string): void {
        this.description = newDescription;
    }

    updateDueDate(newDate: Date): void {
        this.dueDate = newDate;
    }
}

export {User};
// export default function Lister() {

//   const todoLists = {
//     // "My List": [
//     //   {
//     //     "id": 1234,
//     //     "title": "My Title",
//     //     "description": "My Description",
//     //     "dueDate": new Date(),
//     //     "urgent": false,
//     //     "complete": false,
//     //     "parentList": "My List"
//     //   },
//     // ]
//   }

//   function compare(date1, date2) {
//     return isAfter(date1.dueDate, date2.dueDate) ? 1 : -1
//   }

//   const getAllLists = () => {
//     // for (const list in todoLists) {
//     //   todoLists[list].sort(compare)
//     // }
//     return todoLists
//   }


//   const getTodayList = () => {
//     let todayList = []
//     const today = new Date()
//     for (const list in todoLists) {
//       let numOfTodos = todoLists[list].length
//       for (let i = 0; i < numOfTodos; i++) {
//         const currTodo = todoLists[list][i]
//         if (differenceInCalendarDays(currTodo.dueDate, today) === 0) {
//           todayList.push(currTodo)
//         }
//       }
//     }
//     todayList.sort()
//     return todayList
//   }

//   const getWeekList = () => {
//     let weekList = []
//     const today = new Date()
//     for (const list in todoLists) {
//       let numOfTodos = todoLists[list].length
//       for (let i = 0; i < numOfTodos; i++) {
//         const currTodo = todoLists[list][i]
//         if (differenceInCalendarWeeks(currTodo.dueDate, today) === 0) {
//           weekList.push(currTodo);
//         }
//       }
//     }
//     weekList.sort(compare)
//     return weekList
//   }

//   const getMonthList = () => {
//     let monthList = []
//     const today = new Date()
//     for (const list in todoLists) {
//       let numOfTodos = todoLists[list].length
//       for (let i = 0; i < numOfTodos; i++) {
//         const currTodo = todoLists[list][i]
//         if (differenceInCalendarMonths(currTodo.dueDate, today) === 0) {
//           monthList.push(currTodo)
//         }
//       }
//     }
//     function compare(date1, date2) {
//       return isAfter(date1.dueDate, date2.dueDate) ? 1 : -1
//     }
//     monthList.sort(compare)
//     return monthList
//   }

//   const createNewList = (title = 'My List') => {
//     const count = Object.keys(todoLists).length

//     const uniqueId = uuidv4()

//     if (title === 'My List' && count > 0) {
//       title += ` ${count + 1}`
//     }

//     const list = [
//       {
//         "id": uniqueId,
//         "title": "My Title",
//         "description": "My Description",
//         "dueDate": new Date(),
//         "urgent": false,
//         "complete": false,
//         "parentList": title
//       }
//     ]

//     todoLists[title] = list

//     return "List created successfully"
//   }

//   const addTodo = (listName) => {
//     const uniqueId = uuidv4()
//     const newTodo = {
//       "id": uniqueId,
//       "title": "My Title",
//       "description": "My Description",
//       "dueDate": new Date(),
//       "urgent": false,
//       "complete": false,
//       "parentList": listName
//     }

//     if (todoLists[listName]) {
//       todoLists[listName].push(newTodo);
//     } else {
//       todoLists[listName] = [];
//       todoLists[listName].push(newTodo);
//     }

//     return "Item added successfully"
//   }

//   const updateTitle = (todo, newTitle) => {
//     todo.title = newTitle

//     return 'Title updated successfully'
//   }

//   const updateDescription = (todo, newDesc) => {
//     todo.description = newDesc

//     return 'Description updated successfully'
//   }

//   const updateDueDate = (todo, newDate) => {
//     todo.dueDate = newDate

//     return 'Date updated successfully'
//   }

//   const updateUrgency = (todo, newUrgency) => {
//     todo.urgent = newUrgency 

//     return 'Urgency updated successfully'
//   }

//   const updateCompletion = (todo, newCompletion) => {
//     todo.complete = newCompletion

//     return 'Completion updated successfully'
//   }


//   const updateTodo = (
//     listName,
//     index,
//     title = todoLists[listName][index].title,
//     description = todoLists[listName][index].description,
//     dueDate = todoLists[listName][index].dueDate,
//     urgent = todoLists[listName][index].urgent,
//     complete = todoLists[listName][index].complete
//   ) => {
//     todoLists[listName][index] = {
//       "id": todoLists[listName][index].id,
//       "title": title,
//       "description": description,
//       "dueDate": dueDate,
//       "urgent": urgent,
//       "complete": complete,
//       "parentList": listName
//     }

//     return 'Todo updated successfully'
//   }

//   const deleteTodo = (listName, id) => {
//     for (const index in todoLists[listName]) {
//       if (todoLists[listName][index].id === id) {
//         todoLists[listName].splice(index, 1)
//       }
//     }

//     return 'Todo deleted successfully'
//   }

//   const deleteList = (listName) => {
//     delete todoLists[listName]

//     return 'List deleted successfully'
//   }

//   return {
//     getAllLists,
//     getTodayList,
//     getMonthList,
//     getWeekList,
//     createNewList,
//     addTodo,
//     updateTodo,
//     updateTitle,
//     updateDescription,
//     updateDueDate,
//     updateUrgency,
//     updateCompletion,
//     deleteTodo,
//     deleteList,
//   }
// }