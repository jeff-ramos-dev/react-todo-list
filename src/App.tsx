import './App.css'
import TodoCard from './components/Todo'
import AllUserTodos from './components/AllUserTodos'
import { User } from './classes'

function App() {
  const user = new User();
  const defaultList = user.listOfLists.get('My List');
  if (!defaultList) return;
  const myTodo = defaultList?.createTodo();
  if (!myTodo) return;
  myTodo.description = "a new todo";

  defaultList.createTodo();
  defaultList.createTodo();
  defaultList.createTodo();

  return (
    <>
      <h1>Lister</h1>
      <h3>{defaultList.title}</h3>
      <TodoCard
        todo={myTodo}
      />
      <AllUserTodos 
        list={defaultList} 
      />
    </>
  )
}

export default App
