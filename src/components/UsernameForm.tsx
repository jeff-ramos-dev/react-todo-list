import { User, TodoList } from '../classes'
import { saveToLocalStorage } from '../utils'

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
                    setCurrList(newUser.createTodoList(`${username}'s List`));
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