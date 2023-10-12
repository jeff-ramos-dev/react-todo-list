import { User, TodoList } from '../classes'
import { saveToLocalStorage } from '../utils'
import { add, nextSunday } from 'date-fns'

interface UsernameFormProps {
    setUser: React.Dispatch<React.SetStateAction<User>>
    setCurrList: React.Dispatch<React.SetStateAction<TodoList | undefined>>
    setIsUsernameFormVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UsernameForm({ setUser, setCurrList, setIsUsernameFormVisible}: UsernameFormProps) {
    return (
        <form
            className="usernameForm" 
            onSubmit={(e) => {
                e.preventDefault();
                setUser(() => {
                    const usernameInput: HTMLInputElement | null = document.querySelector('.usernameInput');
                    const username = usernameInput ? usernameInput.value : 'User'
                    const newUser = new User({name: username});
                    const newTodoList = newUser.createTodoList(`${newUser.name}'s List`);
                    if (newTodoList) {
                        const newTodo1 = newTodoList.createTodo("Groceries")
                        newTodo1.dueDate = add(new Date(), {days: 1})
                        newTodo1.description = '- Bananas\n- Milk\n- Cereal\n- Bagels'
                        const newTodo2 = newTodoList.createTodo("Send Email")
                        newTodo2.urgent = true;
                        newTodo2.complete = true;
                        newTodo2.description = 'Share the schedule for next week with Devraj'
                        const newTodo3 = newTodoList.createTodo("Take Out Trash")
                        newTodo3.complete = true;
                        newTodo3.urgent = true;
                        newTodo3.description = 'Trash truck comes at 7am tomorrow'
                        const newTodo4 = newTodoList.createTodo("Meal Prep")
                        newTodo4.description = 'Chicken, Rice, and Broccoli bowls.'
                        newTodo4.dueDate = nextSunday(new Date())
                    }
                    setCurrList(newTodoList);
                    saveToLocalStorage(newUser);
                    return newUser
                })
                setIsUsernameFormVisible(false);
            }}
        >
            <label>
                Username
                <input type="text" autoFocus={true} placeholder="Enter your name" className="usernameInput"></input>
            </label>
            <button className="submitUsername">SUBMIT</button>
        </form>
    )
}