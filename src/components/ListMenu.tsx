import { User, DeleteTypes, TodoList } from '../classes'

interface ListMenuProps {
    user: User
    selectList: Function
    setIsConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>
    setToBeDeleted: React.Dispatch<React.SetStateAction<DeleteTypes | null>>
    setIsListCreateVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsListEditVisible: React.Dispatch<React.SetStateAction<boolean>>
    setCurrListEdit: React.Dispatch<React.SetStateAction<TodoList | undefined>>
}

export default function ListMenu({ user, selectList, setIsConfirmVisible, setToBeDeleted, setIsListEditVisible, setIsListCreateVisible, setCurrListEdit }: ListMenuProps) {
    const menuOptions: string[] = [];

    console.log('list menu');

    user.listOfLists.forEach(list => {
        menuOptions.push(list.title);
    })

    const optionMap = menuOptions.map(opt => {
      console.log(opt);
        return (
        <li key={opt} className="listOptionContainer">
            {opt !== `${user.name}'s List` && <button 
              className='deleteList' 
              onClick={() => {
                setIsConfirmVisible(true);
                setToBeDeleted({item: opt, type: 'list', title: opt})
            }}>X</button>}

            <button 
              onClick={(e) => selectList(e)}
              className="listMenuOption"
            >{opt}</button>

            <span
              className="listEdit" 
              onClick={() => {
                setIsListEditVisible(true);
                const list = user.listOfLists.get(opt);
                setCurrListEdit(list);
              }}>...</span>
        </li>
        )
    })

    return (
      <div className="listMenu">
        <ul className="listOptions">
          {optionMap}
        </ul> 
        <button
          type="button" 
          onClick={() => setIsListCreateVisible(true)} 
          className="addList addBtn"
        >+</button>
      </div>
    )
}
