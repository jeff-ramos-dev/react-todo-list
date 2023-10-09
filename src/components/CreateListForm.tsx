import { useState } from 'react'

interface ListFormProps {
    handleSubmit: Function,
    setIsListCreateVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateListForm({ handleSubmit, setIsListCreateVisible }: ListFormProps) {
    const [currTitle, setCurrTitle] = useState('');
    return (
        <div className="listForm">
            <label htmlFor="newListTitle">New List Title</label>
            <input type="text" id="newListTitle" name="newListTitle" placeholder="List Title" onChange={e => setCurrTitle(e.target.value)} value={currTitle}/>
            <button onClick={() => {
                handleSubmit(currTitle);
                setIsListCreateVisible(false);
            }}>Create List</button>
        </div>
    )
}