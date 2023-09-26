import { Todo, User } from '../classes'

interface FormProps {
    user: User
    updateTodo: Function
    todo: Todo
}
export default function EditForm({ user, updateTodo, todo}: FormProps) {
    const formElement = document.querySelector('.editForm');
    return (
        <form className="editForm">
            <label htmlFor="editTitle">Title</label>
            <input type="text" name="editTitle" className="editTitle"/>
            <label htmlFor="editDescription">Description</label>
            <input type="textarea" name="editDescription" className="editDescription"/>
            <label htmlFor="editComplete">Complete?</label>
            <input type="checkbox" name="editComplete" className="editComplete"/>
            <label htmlFor="editUrgent">Urgent?</label>
            <input type="checkbox" name="editUrgent" className="editUrgent"/>
            <label htmlFor="editDueDate">Due Date</label>
            <input type="date" name="editDueDate" className="editDueDate"/>
            <div className="buttonContainer">
                <button type="button" className="submit" onClick={(e) => {
                    console.log('submit');
                    const editTitle = document.querySelector('.editTitle') as HTMLInputElement
                    const editDescription = document.querySelector('.editDescription') as HTMLInputElement;
                    const editDueDate = document.querySelector('.editDueDate') as HTMLInputElement;
                    const editComplete = document.querySelector('.editComplete') as HTMLInputElement;
                    const editUrgent = document.querySelector('.editUrgent') as HTMLInputElement;
                    const updatedTodo = new Todo(null);
                    updatedTodo.updateTitle(editTitle.value);
                    updatedTodo.updateDescription(editDescription.value);
                    updatedTodo.complete = editComplete.checked;
                    updatedTodo.urgent = editUrgent.checked;
                    updatedTodo.dueDate = new Date(editDueDate.value);
                    updatedTodo.parentList = todo.parentList
                    updatedTodo.id = todo.id
                    updateTodo(updatedTodo)
                }}>SUBMIT</button>
                <button type="button" className="cancel" onClick={() => {
                    console.log('cancel');
                    if (formElement) {
                        const form = formElement as HTMLElement
                        form.style.display = 'none';
                    }
                }}>CANCEL</button>
            </div>
        </form>
    )
}