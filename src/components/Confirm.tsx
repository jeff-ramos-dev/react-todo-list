import { DeleteTypes } from '../classes'

interface ConfirmProps {
    confirmDelete: Function
    itemToDelete: DeleteTypes | null
    setIsConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Confirm({ confirmDelete, itemToDelete, setIsConfirmVisible }: ConfirmProps) {
    return (
        <>
            <div className="overlay">
            </div>
            <div className="confirm">
                <h3 className="confirmMessage">Delete '{<span className="confirmItem">{itemToDelete && itemToDelete.title}</span>}'?</h3>
                <div className="buttonContainer">
                    <button onClick={() => {
                        setIsConfirmVisible(false);
                        confirmDelete(true, itemToDelete)
                    }}>Yes</button>
                    <button onClick={() => {
                        setIsConfirmVisible(false);
                        confirmDelete(false, itemToDelete)
                    }}>No</button>
                </div>
            </div>
        </>
    )
}