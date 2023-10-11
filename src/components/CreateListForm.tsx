import { useState } from 'react'

interface ListFormProps {
    handleSubmit: Function,
    setIsListCreateVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateListForm({ handleSubmit, setIsListCreateVisible }: ListFormProps) {
    const [currTitle, setCurrTitle] = useState('');
    return (
        <form 
            className="listForm"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(currTitle);
                setIsListCreateVisible(false);
            }} 
        >
            <label htmlFor="newListTitle">New List Title</label>
            <input type="text" id="newListTitle" name="newListTitle" placeholder="List Title" onChange={e => setCurrTitle(e.target.value)} value={currTitle}/>
            <button>Create List</button>
        </form>
    )
}