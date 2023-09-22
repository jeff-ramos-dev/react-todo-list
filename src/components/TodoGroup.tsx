import { Todo, TodoList } from '../classes'
import TodoCard from './Todo'

interface TodoProps {
    list: TodoList
    filter: string
    //onUpdateTodos: Function
}

export default function TodoGroup({ list, filter, /*onUpdateTodos*/}: TodoProps) {
/*
    function handleDueDateUpdate(todoId: string, newDueDate: Date) {
        const updatedTodos = list.getAllTodos().map(todo => {
            return todo.id === todoId ? {...todo, dueDate: newDueDate} : todo
        })

        onUpdateTodos(updatedTodos)
    }
*/
    let todoArray: Todo[]

    switch (filter) {
        case "All Todos":
            todoArray = list.getAllTodos()
            break;
        case "Today":
            todoArray = list.getTodayTodos()
            break;
        case "This Week":
            todoArray = list.getWeekTodos()
            break;
        case "This Month":
            todoArray = list.getMonthTodos()
            break;
        case "Urgent":
            todoArray = list.getUrgentTodos()
            break;
        default:
            todoArray = list.getAllTodos()
    }

    const cards = todoArray.map(todo => <TodoCard key={todo.id} todo={todo} /*onUpdateDueDate={handleDueDateUpdate} *//>)
    return <>{cards}</>
}