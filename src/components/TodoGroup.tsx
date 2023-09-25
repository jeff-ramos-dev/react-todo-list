import { Todo, TodoList } from '../classes'
import TodoCard from './Todo'

interface TodoProps {
    list: TodoList
    filter: string
}

export default function TodoGroup({ list, filter }: TodoProps) {

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

    const cards = todoArray.map(todo => <TodoCard key={todo.id} todo={todo} />)
    return <>{cards}</>
}