import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'
import isAfter from 'date-fns/isAfter'
import { v4 as uuidv4 } from 'uuid'

function compareDates(todo1: Todo, todo2: Todo) {
    return isAfter(todo1.dueDate, todo2.dueDate) ? 1 : -1;
}

class User {
    name: string;
    listOfLists: Map<string, TodoList>;

    constructor(name="New User") {
            this.name = name;
            this.listOfLists = new Map();
    }

    createTodoList(title: string): void {
        this.listOfLists.set(title, new TodoList(this, title));
    }

    deleteTodoList(title: string): void {
        this.listOfLists.delete(title)
    }
}

class TodoList {
    title: string;
    todos: Map<string, Todo>; 
    user: User;

    constructor(user: User, title: string="New Todo List") {
        this.title = title;
        this.todos = new Map(); 
        this.user = user;
    }

    createTodo(title?: string): Todo {
        const newTodo = new Todo(this, title);
        this.todos.set(newTodo.id, newTodo);
        return newTodo;
    }

    deleteTodo(todoId: string): void {
        this.todos.delete(todoId);
    }

    getAllTodos(): Todo[] {
        const todoArray: Todo[] = [];
        this.todos.forEach(todo => {
            todoArray.push(todo);
        })
        return todoArray;
    }

    getCompleteTodos(): Todo[] {
        const completedTodos: Todo[] = [];
        this.todos.forEach(todo => {
            if (todo.complete) {
                completedTodos.push(todo)
            }
        })
        return completedTodos;
    }

    getIncompleteTodos(): Todo[] {
        const incompleteTodos: Todo[] = [];
        this.todos.forEach(todo => {
            if (!todo.complete) {
                incompleteTodos.push(todo)
            }
        })
        return incompleteTodos;
    }

    getUrgentTodos(): Todo[] {
        const urgentTodos: Todo[] = [];
        this.todos.forEach(todo => {
            if (todo.urgent) {
                urgentTodos.push(todo)
            }
        })
        return urgentTodos;
    }
    
    getTodayTodos(): Todo[] {
        const todayTodos: Todo[] = [];
        const today = new Date();
        this.todos.forEach(todo => {
            if (differenceInCalendarDays(todo.dueDate, today) === 0) {
                todayTodos.push(todo);
            }
        })
        todayTodos.sort();
        return todayTodos;
    }

    getWeekTodos(): Todo[] {
        const weekTodos: Todo[] = [];
        const today = new Date();
        this.todos.forEach(todo => {
            if (differenceInCalendarWeeks(todo.dueDate, today) === 0) {
                weekTodos.push(todo);
            }
        })
        weekTodos.sort(compareDates);
        return weekTodos; 
    }

    getMonthTodos(): Todo[] {
        const monthTodos: Todo[] = []; 
        const today = new Date();
        this.todos.forEach(todo => {
            if (differenceInCalendarMonths(todo.dueDate, today) === 0) {
                monthTodos.push(todo);
            }
        })
        monthTodos.sort(compareDates);
        return monthTodos;
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

    constructor(parent: TodoList | null, title: string = "New Todo") {
        this.id = uuidv4();
        this.title = title;
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

    toggleUrgent(): void {
        this.urgent = !this.urgent;
    }

    toggleComplete(): void {
        this.complete = !this.complete;
    }

    setParent(newParent: TodoList): void {
        this.parentList = newParent;
    }
}

export {
    User,
    TodoList,
    Todo
};