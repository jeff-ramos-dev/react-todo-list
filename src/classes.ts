import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths'
import isAfter from 'date-fns/isAfter'
import { v4 as uuidv4 } from 'uuid'

function compareDates(todo1: Todo, todo2: Todo) {
    return isAfter(todo1.dueDate, todo2.dueDate) ? 1 : -1;
}

interface UserTypes {
    name: string,
    listOfLists?: Map<string, TodoList>
}

class User {
    name: string;
    listOfLists: Map<string, TodoList>;

    constructor({name="User", listOfLists=new Map()}: UserTypes) {
            this.name = name;
            this.listOfLists = listOfLists;
    }

    createTodoList(title: string): void {
        this.listOfLists.set(title, new TodoList({title: title, todos: new Map(), user: this}));
    }

    deleteTodoList(title: string): void {
        this.listOfLists.delete(title)
    }
}

interface TodoListTypes {
    title: string,
    todos?: Map<string, Todo>,
    user: User
}
class TodoList {
    title: string;
    todos: Map<string, Todo>; 
    user: User;

    constructor({title="New Todo List", todos=new Map(), user }: TodoListTypes) {
        this.title = title;
        this.todos = todos; 
        this.user = user;
    }

    createTodo(title?: string): Todo {
        const newTodo = new Todo({
            id: uuidv4(), 
            title: title ? title : "New Todo", 
            description: "", 
            dueDate: new Date(), 
            urgent: false, 
            complete: false, 
            parentList: this
        });
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

interface TodoTypes {
    id?: string;
    title?: string;
    description?: string;
    dueDate?: Date;
    urgent?: boolean;
    complete?: boolean;
    parentList: TodoList | null;
}

class Todo {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    urgent: boolean;
    complete: boolean;
    parentList: TodoList | null;

    constructor({
        id=uuidv4(), 
        title= "New Todo", 
        description="New Description", 
        dueDate=new Date(), 
        urgent=false, 
        complete=false, 
        parentList
    }: TodoTypes) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.urgent = urgent;
        this.complete = complete;
        this.parentList = parentList;
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