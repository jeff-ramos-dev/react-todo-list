import './App.css'
import AllUserTodos from './components/AllUserTodos'
import { User } from './classes'

function App() {
  const user = new User('Jeff');
  const defaultList = user.listOfLists.get(`${user.name}'s List`);
  if (!defaultList) return;
  const myTodo = defaultList?.createTodo();
  if (!myTodo) return;
  myTodo.description = "a new todo";

  defaultList.createTodo("Groceries");
  defaultList.createTodo("Send Email");
  defaultList.createTodo("Take out Trash");
  defaultList.createTodo("Super long title that nobody should be trying to write here");

  return (
    <>
      <h1>Lister</h1>
      <h2>{defaultList.title}</h2>
      <AllUserTodos 
        list={defaultList} 
      />
    </>
  )
}

export default App
