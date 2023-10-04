import { User, DeleteTypes } from '../classes'

interface ListMenuProps {
    user: User
    selectList: Function
    addNewList: Function
    setIsConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
    setToBeDeleted: React.Dispatch<React.SetStateAction<DeleteTypes | null>>
}

export default function ListMenu({user, selectList, addNewList, setIsConfirmVisible, setToBeDeleted}: ListMenuProps) {
    const menuOptions: string[] = [];

    user.listOfLists.forEach(list => {
        menuOptions.push(list.title);
    })

    const optionMap = menuOptions.map(opt => {
        return (
        <li key={opt} className="listOptionContainer">
            <button 
            className='deleteList' 
            onClick={() => {
                setIsConfirmVisible(true);
                setToBeDeleted({item: opt, type: 'list', title: opt})
            }}>X</button><button onClick={(e) => selectList(e)}  className="listMenuOption">{opt}</button></li>
        )
    })

    return (
      <div className="listMenu">
        <ul className="listOptions">
          {optionMap}
        </ul> 
        <button type="button" onClick={(e) => addNewList(e)} className="addList addBtn">+</button>
      </div>
    )
}
