interface OverlayProps {
    setIsConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setIsGroupMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setIsListEditVisible:React.Dispatch<React.SetStateAction<boolean>>, 
    setIsTodoEditVisible:React.Dispatch<React.SetStateAction<boolean>>,
    setIsListMenuVisible:React.Dispatch<React.SetStateAction<boolean>>,
    setIsUsernameFormVisible:React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Overlay({
    children, 
    setIsConfirmVisible, 
    setIsGroupMenuVisible, 
    setIsListEditVisible, 
    setIsTodoEditVisible, 
    setIsListMenuVisible, 
    setIsUsernameFormVisible
}: React.PropsWithChildren<OverlayProps>) {
    return (
        <>
            <div className="overlay">
            </div>
            <div className="modal">
                <button type="button" className="close" onClick={() => {
                        setIsListMenuVisible(false);
                        setIsGroupMenuVisible(false);
                        setIsTodoEditVisible(false);
                        setIsConfirmVisible(false);
                        setIsListEditVisible(false);
                        setIsUsernameFormVisible(false);
                }}>X</button>
                {children}
            </div>
        </>
    )
}