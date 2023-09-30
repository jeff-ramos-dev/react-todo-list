import { Todo } from '../classes'

interface Props {
    currTodo: Todo 
    updateTodo: Function
    setIsEditMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditForm({ currTodo, updateTodo, setIsEditMenuVisible }: Props) {
    return (
      <form className="editForm">
        <label htmlFor="editTitle">Title</label>
        <input type="text" id="editTitle" name="editTitle" className="editTitle" defaultValue={currTodo.title}/>
        <label htmlFor="editDescription">Description</label>
        <textarea id="editDescription" name="editDescription" className="editDescription" defaultValue={currTodo.description} />
        <label htmlFor="editComplete">Complete?</label>
        <input type="checkbox" id="editComplete" name="editComplete" className="editComplete" defaultChecked={currTodo.complete} />
        <label htmlFor="editUrgent">Urgent?</label>
        <input type="checkbox" id="editUrgent" name="editUrgent" className="editUrgent" defaultChecked={currTodo.urgent} />
        <label htmlFor="editDueDate">Due Date</label>
        <input type="date" id="editDueDate" name="editDueDate" className="editDueDate" defaultValue={currTodo.dueDate.toISOString().slice(0, 10)} />
        <div className="buttonContainer">
          <button type="button" className="submit" onClick={() => {
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
            updatedTodo.parentList = currTodo.parentList;
            updatedTodo.id = currTodo.id;
            updateTodo(updatedTodo);
            setIsEditMenuVisible(false);
          }}>SUBMIT</button>
          <button type="button" className="cancel" onClick={() => {
            console.log('cancel');
            setIsEditMenuVisible(false);
          }}>CANCEL</button>
        </div>
      </form>
    )
  }