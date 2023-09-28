import './App.css'
import { User, TodoList, Todo } from './classes'
import { useState, useEffect } from 'react'
import TodoGroup from './components/TodoGroup'
import TodoGroupMenu from './components/TodoGroupMenu'
import EditForm from './components/EditForm'

function App() {
  console.log('render');
  const [user, setUser] = useState(() => {
    const newUser = new User('Default');
    newUser.createTodoList(`${newUser.name}'s List`);
    const newTodoList = newUser.listOfLists.get(`${newUser.name}'s List`);
    if (newTodoList) {
      newTodoList.createTodo("Groceries").urgent = true;
      newTodoList.createTodo("Send Email").urgent = true;
      newTodoList.createTodo("Take Out Trash").complete = true;
      newTodoList.createTodo("Super long title that nobody should be trying to write here").complete = true;
    }
    return newUser;
  });
  const [currList, setCurrList] = useState(() => {
    let newList: TodoList | undefined = new TodoList(user, `${user.name}'s List`);
    newList = user.listOfLists.get(newList.title);
    return newList
  });
  const [selectedGroup, setSelectedGroup] = useState("All Todos");
  const [isListMenuVisible, setIsListMenuVisible] = useState(false);
  const [isGroupMenuVisible, setIsGroupMenuVisible] = useState(false);
  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);
  const [currTodo, setCurrTodo] = useState(new Todo(null));

  useEffect(() => {
    console.log('initial useEffect called');
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, [])

  useEffect(() => {
    console.log('useEffect called');
    if (currList) {
      const newList = user.listOfLists.get(currList.title);
      if (newList) {
        setCurrList(newList);
      }
    }
  }, [user, currList]);

  function toggleListMenu() {
    setIsListMenuVisible(prev => !prev)
  }

  function toggleGroupMenu() {
    setIsGroupMenuVisible(prev => !prev);
  }

  function selectGroup(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    if (target) {
      if (target.textContent) {
        setSelectedGroup(target.textContent);
      }
    }
  }

  function selectList(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    if (target) {
      if (target.textContent) {
        setCurrList(user.listOfLists.get(target.textContent));
        setIsListMenuVisible(false);
      }
    }
  }

  function handleDocumentClick(event: MouseEvent) {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    if (!target.classList.contains('todoGroupMenu') && 
    !target.classList.contains('todoGroup')) {
      setIsGroupMenuVisible(false);
    }
    if (!target.classList.contains('listMenu') &&
    !target.classList.contains('listTitle') &&
    !target.classList.contains('addList')) {
      setIsListMenuVisible(false);
    }
  }

  function updateTodo(updatedTodo: Todo) {
    const newList = currList as TodoList;
    newList.todos.set(updatedTodo.id, updatedTodo);
    const newUser = user;
    newUser.listOfLists.set(newList.title, newList);
    setUser(newUser);
  }

  function ListMenu() {
    const menuOptions: string[] = [];

    console.log(user.listOfLists);
    user.listOfLists.forEach(list => {
      menuOptions.push(list.title);
    })

    const optionMap = menuOptions.map(opt => {
      return (
        <li key={opt}><button onClick={selectList}  className="listMenuOption">{opt}</button></li>
      )
    })

    return (
      <div className="listMenu">
        <ul className="listOptions">
          {optionMap}
        </ul> 
        <button type="button" onClick={addNewList} className="addList addBtn">+</button>
      </div>
    )
  }
  
  function addNewList() {
    setUser(prevUser => {
      const newUser = new User(prevUser.name);
      newUser.listOfLists = new Map(prevUser.listOfLists);
      newUser.createTodoList(`List ${newUser.listOfLists.size + 1}`);
      return newUser;
    })
  }

  function addNewTodo() {
    setUser(prevUser => {
      const newUser = {...prevUser} as User;

      if (currList) {
        const newList = newUser.listOfLists.get(currList.title);
        if (newList) {
          newList.createTodo();
        }
      }
      return newUser
    })
  }

  return (
    <>
      <h1 className="appTitle">2do</h1>
      {currList && <h2 className="listTitle" onClick={toggleListMenu}>{currList.title}</h2>}
      {isListMenuVisible && <ListMenu />}
      <div className="todoGroupContainer">
        <h3 onClick={toggleGroupMenu} className="todoGroup">{selectedGroup}</h3>
        {isGroupMenuVisible && <TodoGroupMenu handleClick={selectGroup}/>}
      </div>
      {currList ? 
        <TodoGroup 
          currList={currList} 
          selectedGroup={selectedGroup} 
          setCurrTodo={setCurrTodo} 
          setIsEditMenuVisible={setIsEditMenuVisible} 
        /> : 
        <p>No Todos</p>}
      {isEditMenuVisible && <EditForm currTodo={currTodo} updateTodo={updateTodo} setIsEditMenuVisible={setIsEditMenuVisible}/>}
      <button type="button" onClick={addNewTodo} className="addTodo addBtn">+</button>
    </>
  )
}

export default App
