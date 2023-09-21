import './App.css'
import TodoGroup from './components/TodoGroup'
import TodoGroupMenu from './components/TodoGroupMenu';
import { User, TodoList } from './classes'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(new User('Jeff'));
  const [currList, setCurrList] = useState<TodoList | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState("All Todos");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (!currList) {
      const list = user.listOfLists.get(`${user.name}'s List`);
      if (list) {
        setCurrList(list);
        list.createTodo("Groceries");
        list.createTodo("Send Email");
        list.createTodo("Take out Trash");
        list.createTodo("Super long title that nobody should be trying to write here");
      }
    }
  }, [])

  function toggleMenu() {
    setIsMenuVisible((prev) => !prev);
  }

  function selectGroup(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    if (target) {
      if (target.textContent) {
        setSelectedGroup(target.textContent);
      }
    }
  }

  function handleDocumentClick(event: MouseEvent) {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    if (!target.classList.contains('todoGroupMenu') && 
    !target.classList.contains('todoGroup')) {
      setIsMenuVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, []);

  return (
    <>
      <h1>Lister</h1>
      {currList && <h2 className="listTitle">{currList.title}</h2>}
      <div className="todoGroupContainer">
        <h3 onClick={toggleMenu} className="todoGroup">{selectedGroup}</h3>
        {isMenuVisible && <TodoGroupMenu handleClick={selectGroup}/>}
      </div>
      {currList ? <TodoGroup list={currList} filter={selectedGroup} /> : <p>No Todos</p>}
    </>
  )
}

export default App
