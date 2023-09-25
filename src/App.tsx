import './App.css'
import TodoGroup from './components/TodoGroup'
import TodoGroupMenu from './components/TodoGroupMenu';
import EditForm from './components/EditForm'
import { User } from './classes'
import { useState, useEffect } from 'react'

function App() {
  console.log('render');
  const [user, setUser] = useState(new User('Jeff'));
  const [currList, setCurrList] = useState(user.listOfLists.get(`${user.name}'s List`))
  const [selectedGroup, setSelectedGroup] = useState("All Todos");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function toggleMenu() {
    setIsMenuVisible((prev) => !prev);
  }

  function selectGroup(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement
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

  useEffect(() => {
    console.log('initial useEffect called');
    const newUser = new User(user.name);
    user.createTodoList(`${user.name}'s List`);
    const newTodoList = user.listOfLists.get(`${user.name}'s List`)
    if (newTodoList) {
      newTodoList.createTodo("Groceries").urgent = true;
      newTodoList.createTodo("Send Email").urgent = true;
      newTodoList.createTodo("Take out trash").complete = true;
      newTodoList.createTodo("Super long title that nobody should be trying to write here").complete = true;
    }
    setUser(newUser);
  }, [])

  useEffect(() => {
    console.log('useEffect called');
    const newList = user.listOfLists.get(`${user.name}'s List`);
    if (newList) {
      setCurrList(newList);
    }
  }, [user]);

  return (
    <>
      <h1>Lister</h1>
      {currList && <h2 className="listTitle">{currList.title}</h2>}
      <div className="todoGroupContainer">
        <h3 onClick={toggleMenu} className="todoGroup">{selectedGroup}</h3>
        {isMenuVisible && <TodoGroupMenu handleClick={selectGroup}/>}
      </div>
      {currList ? <TodoGroup list={currList} filter={selectedGroup} /> : <p>No Todos</p>}
      <EditForm />
    </>
  )
}

export default App
