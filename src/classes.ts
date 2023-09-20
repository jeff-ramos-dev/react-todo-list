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
            const listTitle = `${name}'s List`
            this.listOfLists = new Map().set(listTitle, new TodoList(this, listTitle));
    }

    createTodoList(title: string): void {
        this.listOfLists.set(title, new TodoList(this));
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
        for (const value of Object.values(this.todos)) {
            todoArray.push(value);
        }
        return todoArray;
    }

    getCompleteTodos(): Todo[] {
        const completedTodos: Todo[] = [];
        for (const value of Object.values(this.todos)) {
            if (value.complete) {
                completedTodos.push(value)
            }
        }
        return completedTodos;
    }

    getIncompleteTodos(): Todo[] {
        const incompleteTodos: Todo[] = [];
        for (const value of Object.values(this.todos)) {
            if (!value.complete) {
                incompleteTodos.push(value)
            }
        }
        return incompleteTodos;
    }

    getUrgentTodos(): Todo[] {
        const urgentTodos: Todo[] = [];
        for (const value of Object.values(this.todos)) {
            if (value.urgent) {
                urgentTodos.push(value)
            }
        }
        return urgentTodos;
    }
    
    getTodayTodos(): Todo[] {
        const todayTodos: Todo[] = [];
        const today = new Date();
        for (const value of Object.values(this.todos)) {
            if (differenceInCalendarDays(value.dueDate, today) === 0) {
                todayTodos.push(value);
            }
        }
        todayTodos.sort();
        return todayTodos;
    }

    getWeekTodos(): Todo[] {
        const weekTodos: Todo[] = [];
        const today = new Date();
        for (const value of Object.values(this.todos)) {
            if (differenceInCalendarWeeks(value.dueDate, today) === 0) {
                weekTodos.push(value);
            }
        }
        weekTodos.sort(compareDates);
        return weekTodos; 
    }

    getMonthTodos(): Todo[] {
        const monthTodos: Todo[] = []; 
        const today = new Date();
        for (const value of Object.values(this.todos)) {
            if (differenceInCalendarMonths(value.dueDate, today) === 0) {
                monthTodos.push(value);
            }
        }
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