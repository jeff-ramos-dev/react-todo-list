import { Todo, TodoList } from '../classes'
import TodoCard from './Todo'

interface TodoGroupProps {
    currList: TodoList
    selectedGroup: string
    todo: Todo;
    setCurrTodo: React.Dispatch<React.SetStateAction<Todo>>;
    setIsEditMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodoGroup({currList, selectedGroup, todo, setCurrTodo, setIsEditMenuVisible}: TodoGroupProps) {
    let todoArray: Todo[]

    if (!currList) return
    switch (selectedGroup) {
        case "All Todos":
            todoArray = currList.getAllTodos()
            break;
        case "Today":
            todoArray = currList.getTodayTodos()
            break;
        case "This Week":
            todoArray = currList.getWeekTodos()
            break;
        case "This Month":
            todoArray = currList.getMonthTodos()
            break;
        case "Urgent":
            todoArray = currList.getUrgentTodos()
            break;
        default:
            todoArray = currList.getAllTodos()
    }

    const cards = todoArray.map(elem => <TodoCard key={elem.id} todo={todo} setCurrTodo={setCurrTodo} setIsEditMenuVisible={setIsEditMenuVisible} />)
    return <>{cards}</>
  }