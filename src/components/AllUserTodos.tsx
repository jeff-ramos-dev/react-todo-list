import TodoCard from './Todo'
import { TodoList } from '../classes'

interface TodoListProps {
    list: TodoList
}

export default function AllUserTodos({ list }: TodoListProps) {
    const iterator = list.todos.values();
    const todos= []
    for (let i = 0; i < list.todos.size; i++) {
        todos.push(iterator.next().value)
    }
    const cards = todos.map(todo => {
        return (
            <TodoCard
                todo={todo} 
            />
        )
    })
    return (
        <>
            <h3 className="pageTitle">All Todos</h3>
            {cards}
        </>
    )
}