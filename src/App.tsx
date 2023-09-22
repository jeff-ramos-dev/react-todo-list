import './App.css'
import TodoGroup from './components/TodoGroup'
import TodoGroupMenu from './components/TodoGroupMenu';
import { User, TodoList, Todo } from './classes'
import { useState, useEffect } from 'react'

function App() {
  console.log('render');
  const [user, setUser] = useState(new User('Jeff'));
  const [todoList, setTodoList] = useState(new TodoList(user, `${user.name}'s List`));
  const [todos, setTodos] = useState(todoList.getAllTodos())
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
    const updatedTodoList = new TodoList(user, 'dummy list');
    updatedTodoList.createTodo("Groceries").urgent = true;
    updatedTodoList.createTodo("Send Email").urgent = true;
    updatedTodoList.createTodo("Take out Trash").complete = true;
    updatedTodoList.createTodo("Super long title that nobody should be trying to write here").complete = true;
    updatedTodoList.title = `${user.name}'s List`
    setTodoList(updatedTodoList);
  }, [])

  useEffect(() => {
    console.log('useEffect called');
    setTodos(todoList.getAllTodos());
  }, [todoList]);
/*
  function handleUpdateTodos(updatedTodos: Todo[]) {
    setTodos(updatedTodos)
  }
*/
  return (
    <>
      <h1>Lister</h1>
      {todoList && <h2 className="listTitle">{todoList.title}</h2>}
      <div className="todoGroupContainer">
        <h3 onClick={toggleMenu} className="todoGroup">{selectedGroup}</h3>
        {isMenuVisible && <TodoGroupMenu handleClick={selectGroup}/>}
      </div>
      {todoList ? <TodoGroup list={todoList} filter={selectedGroup} /* onUpdateTodos={handleUpdateTodos}*/ /> : <p>No Todos</p>}
    </>
  )
}

export default App
