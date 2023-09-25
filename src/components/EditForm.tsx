export default function EditForm() {
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
                }}>SUBMIT</button>
                <button type="button" className="cancel" onClick={(e) => {
                    console.log('cancel');
                }}>CANCEL</button>
            </div>
        </form>
    )
}