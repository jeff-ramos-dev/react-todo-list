import './App.css'
import editImg from './assets/editImg.png'
import { User, TodoList, Todo } from './classes'
import { useState, useEffect } from 'react'

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
        console.log(target.textContent, user.listOfLists);
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

  function TodoGroup() {
    let todoArray: Todo[]

    if (!currList) return
    switch (selectedGroup) {
      case "All Todos":
        todoArray = currList.getAllTodos()
        break;
      case "Today":
        todoArray = currList.getTodayTodos()
        break;
      case "This Week":
        todoArray = currList.getWeekTodos()
        break;
      case "This Month":
        todoArray = currList.getMonthTodos()
        break;
      case "Urgent":
        todoArray = currList.getUrgentTodos()
        break;
      default:
        todoArray = currList.getAllTodos()
    }

    const cards = todoArray.map(todo => <TodoCard key={todo.id} todo={todo} />)
    return <>{cards}</>
  }

  function TodoGroupMenu() {
    const menuOptions = ['All Todos', 'Today', 'This Week', 'This Month', 'Urgent'];

    const optionMap = menuOptions.map(opt => {
      return (
        <li key={opt}><button onClick={selectGroup}  className="todoGroupMenuOption">{opt}</button></li>
      )
    })

    return (
      <>
        <ul className={"todoGroupMenu"}>
          {optionMap}
        </ul> 
      </>
    )
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

  function TodoCard({ todo }: {todo: Todo} ) {
    const [currDate, setCurrDate] = useState(todo.dueDate);
    const [currCompleteStatus, setCurrCompleteStatus] = useState(todo.complete);

    return (
      <div 
        className={
          `todoContainer
          ${todo.urgent ? ' urgent' : ''}
          ${currCompleteStatus ? ' complete' : ''}`
        }
        key={todo.id}
        onClick={(e) => {
          const target = e.target as HTMLElement 
          if (!target.classList.contains('todoContainer')) return
          todo.complete = !todo.complete
          setCurrCompleteStatus(todo.complete);
        }}
      >
        <div className="todoRight">
          <input
            type="date" 
            className="picker"
            value={currDate.toISOString().slice(0,10)}
            onChange={(e) => {
              const target = e.target as HTMLInputElement
              const value = target.value
              todo.updateDueDate(new Date(value));
              setCurrDate(new Date(value));
            }}
          />
          <img src={editImg} className="edit" onClick={() => {
            console.log('clicked')
            setCurrTodo(todo);
            setIsEditMenuVisible(true);
          }}></img>
        </div>
        {currCompleteStatus ? <del className="todoTitle strikethrough">{todo.title}</del> : <p className="todoTitle">{todo.title}</p> }
      </div>
    )
  }

  function EditForm({ todo }: {todo: Todo}) {
    return (
      <form className="editForm">
        <label htmlFor="editTitle">Title</label>
        <input type="text" id="editTitle" name="editTitle" className="editTitle" defaultValue={currTodo.title}/>
        <label htmlFor="editDescription">Description</label>
        <textarea id="editDescription" name="editDescription" className="editDescription" defaultValue={currTodo.description} />
        <label htmlFor="editComplete">Complete?</label>
        <input type="checkbox" id="editComplete" name="editComplete" className="editComplete" defaultChecked={currTodo.complete} />
        <label htmlFor="editUrgent">Urgent?</label>
        <input type="checkbox" id="editUrgent" name="editUrgent" className="editUrgent" defaultChecked={currTodo.urgent} />
        <label htmlFor="editDueDate">Due Date</label>
        <input type="date" name="editDueDate" id="editDueDate" className="editDueDate" defaultValue={currTodo.dueDate.toISOString().slice(0, 10)} />
        <div className="buttonContainer">
          <button type="button" className="submit" onClick={() => {
            console.log('submit');
            const editTitle = document.querySelector('.editTitle') as HTMLInputElement
            const editDescription = document.querySelector('.editDescription') as HTMLInputElement;
            const editDueDate = document.querySelector('.editDueDate') as HTMLInputElement;
            const editComplete = document.querySelector('.editComplete') as HTMLInputElement;
            const editUrgent = document.querySelector('.editUrgent') as HTMLInputElement;
            const updatedTodo = new Todo(null);
            updatedTodo.updateTitle(editTitle.value);
            updatedTodo.updateDescription(editDescription.value);
            updatedTodo.complete = editComplete.checked;
            updatedTodo.urgent = editUrgent.checked;
            updatedTodo.dueDate = new Date(editDueDate.value);
            updatedTodo.parentList = todo.parentList;
            updatedTodo.id = todo.id;
            updateTodo(updatedTodo);
            setIsEditMenuVisible(false);
          }}>SUBMIT</button>
          <button type="button" className="cancel" onClick={() => {
            console.log('cancel');
            setIsEditMenuVisible(false);
          }}>CANCEL</button>
        </div>
      </form>
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
        {isGroupMenuVisible && <TodoGroupMenu />}
      </div>
      {currList ? <TodoGroup /> : <p>No Todos</p>}
      {isEditMenuVisible && <EditForm todo={currTodo} />}
      <button type="button" onClick={addNewTodo} className="addTodo addBtn">+</button>
    </>
  )
}

export default App
