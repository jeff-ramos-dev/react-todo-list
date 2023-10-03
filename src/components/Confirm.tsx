interface ConfirmProps {
    confirmDelete: Function
    listTitle: String | null
    setIsConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Confirm({ confirmDelete, listTitle, setIsConfirmVisible }: ConfirmProps) {
    return (
        <>
            <div className="overlay">
            </div>
            <div className="confirm">
                <h3 className="confirmMessage">Delete {listTitle}?</h3>
                <div className="buttonContainer">
                    <button onClick={() => {
                        setIsConfirmVisible(false);
                        confirmDelete(true, listTitle)
                    }}>Yes</button>
                    <button onClick={() => {
                        setIsConfirmVisible(false);
                        confirmDelete(false, listTitle)
                    }}>No</button>
                </div>
            </div>
        </>
    )
}