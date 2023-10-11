import { useState } from 'react'

interface ListFormProps {
    handleSubmit: Function
    currListTitle: string | undefined
    setIsListEditVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateListForm({ handleSubmit, currListTitle, setIsListEditVisible }: ListFormProps) {
    const [currTitle, setCurrTitle] = useState(currListTitle ? currListTitle : '');
    return (
        <form 
            className="listForm"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(currListTitle, currTitle);
                setIsListEditVisible(false);
            }}
        >
            <label htmlFor="newListTitle">New List Title</label>
            <input
                type="text" 
                id="newListTitle" 
                name="newListTitle" 
                placeholder="List Title" 
                autoFocus={true}
                onChange={e => setCurrTitle(e.target.value)}
                value={currTitle}/>
            <button>Submit</button>
        </form>
    )
}