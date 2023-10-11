import { Todo, TodoList, DeleteTypes } from '../classes'
import TodoCard from './Todo'

interface TodoGroupProps {
    currList: TodoList
    selectedGroup: string
    setCurrTodo: React.Dispatch<React.SetStateAction<Todo>>;
    setIsEditMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
    setToBeDeleted: React.Dispatch<React.SetStateAction<DeleteTypes | null>>
    updateTodo: Function
}

export default function TodoGroup({ currList, selectedGroup, setCurrTodo, setIsEditMenuVisible, setIsConfirmVisible, setToBeDeleted, updateTodo }: TodoGroupProps) {
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

    const cards = todoArray.map(elem => {
        return (
            <TodoCard 
                key={elem.id} 
                todo={elem} 
                setCurrTodo={setCurrTodo} 
                setIsConfirmVisible={setIsConfirmVisible} 
                setIsEditMenuVisible={setIsEditMenuVisible} 
                setToBeDeleted={setToBeDeleted} 
                updateTodo={updateTodo}
            />
        )
    });

    return (
        <>
            {cards.length ? cards : <p>No Todos</p>}
        </>
    )
  }