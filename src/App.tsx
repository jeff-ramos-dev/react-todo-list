import './App.css'
import { User, TodoList, Todo } from './classes'
import { useState, useEffect } from 'react'
import TodoGroup from './components/TodoGroup'
import TodoGroupMenu from './components/TodoGroupMenu'
import EditForm from './components/EditForm'
import { saveToLocalStorage, loadFromLocalStorage, generateNewListName } from './utils'

function App() {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('user')) {
      console.log('user found')
      const savedUser = new User(JSON.parse(localStorage.getItem('user') as string));
      return loadFromLocalStorage(savedUser);
    } else {
      const newUser = new User({name: 'User'});
      newUser.createTodoList(`${newUser.name}'s List`);
      const newTodoList = newUser.listOfLists.get(`${newUser.name}'s List`);
      if (newTodoList) {
        newTodoList.createTodo("Groceries").urgent = true;
        newTodoList.createTodo("Send Email").urgent = true;
        newTodoList.createTodo("Take Out Trash").complete = true;
        newTodoList.createTodo("Super long title that nobody should be trying to write here").complete = true;
      }
      saveToLocalStorage(newUser);
      return newUser;
    } 
  });
  const [currList, setCurrList] = useState(() => {
    let newList: TodoList | undefined = new TodoList({user: user, title: `${user.name}'s List`});
    newList = user.listOfLists.get(newList.title);
    return newList
  });
  const [selectedGroup, setSelectedGroup] = useState("All Todos");
  const [isListMenuVisible, setIsListMenuVisible] = useState(false);
  const [isGroupMenuVisible, setIsGroupMenuVisible] = useState(false);
  const [isEditMenuVisible, setIsEditMenuVisible] = useState(false);
  const [currTodo, setCurrTodo] = useState(new Todo({parentList: currList ? currList.title : null}));

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, [])

  useEffect(() => {
    if (currList) {
      const newList = user.listOfLists.get(currList.title);
      if (newList) {
        setCurrList(newList);
      }
    }
    saveToLocalStorage(user);
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
    !target.classList.contains('addList') &&
    !target.classList.contains('deleteList')) {
      setIsListMenuVisible(false);
    }
  }

  function updateTodo(updatedTodo: Todo) {
    setUser(prevUser => {
      const newUser = new User({name: prevUser.name});
      prevUser.listOfLists.forEach((list, title) => {
        const newList = new TodoList({user: newUser, title: title});
        list.todos.forEach((todo) => {
          if (todo.id === updatedTodo.id) {
            newList.todos.set(todo.id, updatedTodo);
          } else {
            (newList.todos.set(todo.id, todo))
          }
        })
        newUser.listOfLists.set(title, newList);
      })
      return newUser;
    })
  }

  function ListMenu() {
    const menuOptions: string[] = [];

    user.listOfLists.forEach(list => {
      menuOptions.push(list.title);
    })

    const optionMap = menuOptions.map(opt => {
      return (
        <li key={opt} className="listOptionContainer"><button className='deleteList' onClick={() => deleteList(opt)} >X</button><button onClick={selectList}  className="listMenuOption">{opt}</button></li>
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
    console.log('adding list')
    setUser(prevUser => {
      const newUser = new User({name: prevUser.name});
      newUser.listOfLists = new Map(prevUser.listOfLists);
      newUser.createTodoList(generateNewListName(newUser.listOfLists));
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

  function deleteTodo(todoId: string) {
    setUser(prevUser => {
      const newUser = new User({name: prevUser.name});
      prevUser.listOfLists.forEach((list, title) => {
        const newList = new TodoList({user: newUser, title: title});
        list.todos.forEach((todo, id) => {
          if (id !== todoId) {
            newList.todos.set(id, todo);
          }
        })
        newUser.listOfLists.set(title, newList);
      })
      return newUser;
    })
  }

  function deleteList(listTitle: string) {
    setUser(prevUser => {
      const newUser = new User({name: prevUser.name});
      prevUser.listOfLists.forEach((list, title) => {
        if (title !== listTitle) {
          const newList = new TodoList({user: newUser, title: title});
          list.todos.forEach((todo, id) => {
              newList.todos.set(id, todo);
          })
          newUser.listOfLists.set(title, newList);
        }
      })
      return newUser;
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
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        /> : 
        <p>No Todos</p>}
      {isEditMenuVisible && <EditForm currTodo={currTodo} updateTodo={updateTodo} setIsEditMenuVisible={setIsEditMenuVisible}/>}
      <button type="button" onClick={addNewTodo} className="addTodo addBtn">+</button>
    </>
  )
}

export default App;
