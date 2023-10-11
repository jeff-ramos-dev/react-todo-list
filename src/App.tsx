import './App.css'
import { useState, useEffect } from 'react'
import { User, TodoList, Todo, DeleteTypes } from './classes'
import { add, nextSunday } from 'date-fns'
import TodoGroup from './components/TodoGroup'
import TodoGroupMenu from './components/TodoGroupMenu'
import TodoEditForm from './components/TodoEditForm'
import Confirm from './components/Confirm'
import ListMenu from './components/ListMenu'
import EditListForm from './components/EditListForm'
import CreateListForm from './components/CreateListForm'
import Overlay from './components/Overlay'
import UsernameForm from './components/UsernameForm'
import { saveToLocalStorage, loadFromLocalStorage, generateNewListName } from './utils'

function App() {
  const [isUsernameFormVisible, setIsUsernameFormVisible] = useState(true);
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('user')) {
      const savedUser = new User(JSON.parse(localStorage.getItem('user') as string));
      setIsUsernameFormVisible(false);
      return loadFromLocalStorage(savedUser);
    } else {
      setIsUsernameFormVisible(true);
      const newUser = new User({name: 'User'});
      newUser.createTodoList(`${newUser.name}'s List`);
      const newTodoList = newUser.listOfLists.get(`${newUser.name}'s List`);
      if (newTodoList) {
        const newTodo1 = newTodoList.createTodo("Groceries")
        newTodo1.dueDate = add(new Date(), {days: 1})
        newTodo1.description = '- Bananas\n- Milk\n - Cereal\n - Bagels'
        const newTodo2 = newTodoList.createTodo("Send Email")
        newTodo2.urgent = true;
        newTodo2.complete = true;
        newTodo2.description = 'Share the schedule for next week with Devraj'
        const newTodo3 = newTodoList.createTodo("Take Out Trash")
        newTodo3.complete = true;
        newTodo3.urgent = true;
        newTodo3.description = 'Trash truck comes at 7am tomorrow'
        const newTodo4 = newTodoList.createTodo("Meal Prep")
        newTodo4.description = 'Chicken, Rice, and Broccoli bowls.'
        newTodo4.dueDate = nextSunday(new Date())
      }
      return newUser;
    } 
  });
  const [currList, setCurrList] = useState(() => {
    let newList: TodoList | undefined = new TodoList({user: user, title: `${user.name}'s List`});
    newList = user.listOfLists.get(newList.title);
    return newList
  });
  const [currListEdit, setCurrListEdit] = useState<TodoList | undefined>(undefined)
  const [selectedGroup, setSelectedGroup] = useState("All Todos");
  const [isListMenuVisible, setIsListMenuVisible] = useState(false);
  const [isGroupMenuVisible, setIsGroupMenuVisible] = useState(false);
  const [isTodoEditVisible, setIsTodoEditVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isListEditVisible, setIsListEditVisible] = useState(false);
  const [isListCreateVisible, setIsListCreateVisible] = useState(false);
  const [currTodo, setCurrTodo] = useState(new Todo({parentList: currList ? currList.title : null}));
  const [toBeDeleted, setToBeDeleted] = useState<DeleteTypes | null>(null);

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

    if (target.classList.contains('overlay')) {
      setIsListMenuVisible(false);
      setIsGroupMenuVisible(false);
      setIsListEditVisible(false);
      setIsTodoEditVisible(false);
      setIsConfirmVisible(false);
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

  function confirmDelete(response: boolean, itemToDelete: DeleteTypes) {
    if (response) {
      itemToDelete.type === 'list' ? deleteList(itemToDelete.item) : deleteTodo(itemToDelete.item);
    }
    setToBeDeleted(null);
  }

  function addNewList() {
    setUser(prevUser => {
      const newUser = new User({name: prevUser.name});
      newUser.listOfLists = new Map(prevUser.listOfLists);
      newUser.createTodoList(generateNewListName(newUser.listOfLists));
      return newUser;
    })
  }

  function addNewTodo() {
    console.log('add new todo called');
    setUser(prevUser => {
      const newUser = new User({name: prevUser.name});
      prevUser.listOfLists.forEach((list, title) => {
        const newList = new TodoList({user: newUser, title: title});
        list.todos.forEach((todo, id) => {
          newList.todos.set(id,todo);
        })
          if (currList && currList.title === title) {
            newList.createTodo();
          }
        newUser.listOfLists.set(title, newList);
      })
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
      let validList;
      prevUser.listOfLists.forEach((list, title) => {
        if (title !== listTitle) {
          const newList = new TodoList({user: newUser, title: title});
          validList = newList;
          list.todos.forEach((todo, id) => {
              newList.todos.set(id, todo);
          })
          newUser.listOfLists.set(title, newList);
        }
      })
      if (currList?.title === listTitle) {
        setCurrList(validList);
      }
      return newUser;
    })
  }

  function handleListEdit(prevListTitle: string, newListTitle: string) {
    setUser(prevUser => {
      const newUser = new User({name: prevUser.name});
      prevUser.listOfLists.forEach((list, title) => {
        const newList = new TodoList({
          user: newUser, 
          title: title === prevListTitle ? newListTitle : title
        })
        list.todos.forEach((todo, id) => {
          newList.todos.set(id, todo);
        })
        newUser.listOfLists.set(newList.title, newList);
      })
      if (currList?.title === prevListTitle) {
        setCurrList(newUser.listOfLists.get(newListTitle));
      }
      return newUser;
    })
  }

  function handleListCreate(listTitle: string) {
    if (user.listOfLists.has(listTitle)) {
      console.log(listTitle, 'already exists');
    } else if (listTitle === '') {
      addNewList();
    } else {
      setUser(prevUser => {
        const newUser = new User({name: prevUser.name});
        prevUser.listOfLists.forEach((list, title) => {
          const newList = new TodoList({user: newUser, title: title})
          list.todos.forEach((todo, id) => {
            newList.todos.set(id, todo);
          })
          newUser.listOfLists.set(title, newList);
        });
        newUser.createTodoList(listTitle);
        return newUser;
        })
      };
    }

    const overlayProps = {
      setIsConfirmVisible: setIsConfirmVisible,
      setIsGroupMenuVisible: setIsGroupMenuVisible,
      setIsListEditVisible: setIsListEditVisible,
      setIsTodoEditVisible: setIsTodoEditVisible,
      setIsListMenuVisible: setIsListMenuVisible,
      setIsUsernameFormVisible: setIsUsernameFormVisible
    }

  return (
    <>
      <h1 className="appTitle">2do</h1>
      {currList && <h2 className="listTitle" onClick={toggleListMenu}>{currList.title}</h2>}
      {isListMenuVisible &&
        <Overlay {...overlayProps}>
          <ListMenu 
            user={user}
            selectList={selectList} 
            setIsConfirmVisible={setIsConfirmVisible}
            setToBeDeleted={setToBeDeleted}
            setIsListCreateVisible={setIsListCreateVisible}
            setIsListEditVisible={setIsListEditVisible}
            setCurrListEdit={setCurrListEdit}
          />
        </Overlay>
      }
      <div className="todoGroupContainer">
        <h3 onClick={toggleGroupMenu} className="todoGroup">{selectedGroup}</h3>
        {isGroupMenuVisible && 
        <Overlay {...overlayProps}>
          <TodoGroupMenu handleClick={selectGroup}/>
        </Overlay>}
      </div>
      {currList && 
        <TodoGroup 
          currList={currList} 
          selectedGroup={selectedGroup} 
          setCurrTodo={setCurrTodo} 
          setIsEditMenuVisible={setIsTodoEditVisible} 
          setIsConfirmVisible={setIsConfirmVisible}
          setToBeDeleted={setToBeDeleted}
          updateTodo={updateTodo}
        />
      }
      {isUsernameFormVisible && 
      <Overlay {...overlayProps}>
        <UsernameForm 
          setUser={setUser}
          setCurrList={setCurrList}
          setIsUsernameFormVisible={setIsUsernameFormVisible}
        />
      </Overlay>}
      {isTodoEditVisible &&
        <Overlay {...overlayProps}>
          <TodoEditForm 
            currTodo={currTodo} 
            updateTodo={updateTodo} 
            setIsEditMenuVisible={setIsTodoEditVisible}
          />
        </Overlay>
      }
      <button 
        type="button" 
        onClick={addNewTodo} 
        className="addTodo addBtn"
      >+</button>
        {isConfirmVisible &&
          <Overlay {...overlayProps}>
            <Confirm 
              confirmDelete={confirmDelete}
              itemToDelete={toBeDeleted}
              setIsConfirmVisible={setIsConfirmVisible}
            />
          </Overlay>}
      {isListCreateVisible &&
        <Overlay {...overlayProps}>
          <CreateListForm 
            handleSubmit={handleListCreate}
            setIsListCreateVisible={setIsListCreateVisible}
          />
        </Overlay>
      }
      {isListEditVisible &&
        <Overlay {...overlayProps}>
          <EditListForm 
            handleSubmit={handleListEdit}
            currListTitle={currListEdit?.title}
            setIsListEditVisible={setIsListEditVisible}
          />
        </Overlay>
      }
    </>
  )
}

export default App;
