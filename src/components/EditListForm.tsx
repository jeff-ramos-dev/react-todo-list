import { useState } from 'react'

interface ListFormProps {
    handleSubmit: Function
    currListTitle: string | undefined
    setIsListEditVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateListForm({ handleSubmit, currListTitle, setIsListEditVisible }: ListFormProps) {
    const [currTitle, setCurrTitle] = useState(currListTitle ? currListTitle : '');
    console.log('edit list', currListTitle);
    console.log('new title: ', currTitle);
    return (
        <div className="listForm">
            <label htmlFor="newListTitle">New List Title</label>
            <input type="text" id="newListTitle" name="newListTitle" placeholder="List Title" onChange={e => setCurrTitle(e.target.value)} value={currTitle}/>
            <button onClick={() => {
                console.log('new new title', currTitle);
                handleSubmit(currListTitle, currTitle);
                setIsListEditVisible(false);
            }}>Submit</button>
        </div>
    )
}