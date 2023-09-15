import './App.css'
import { User } from './classes'

function App() {
  const user = new User();
  const myList = user.listOfLists.get('My List');
  if (!myList) return;
  const myTodo = myList?.createTodo();
  if (!myTodo) return;
  myTodo.description = "a new todo";

  function formatDate(date: Date): string{
    return date.toString().split(' ').slice(0, 4).join(' ');
  }


  return (
    <>
      <h1>Lister</h1>
      <h2>username : {user.name}</h2>
      <h3>listname : {myList.title}</h3>
      <ul>
        <li>todo id : {myTodo.id}</li>
        <li>todo title : {myTodo.title}</li>
        <li>todo description : {myTodo.description}</li>
        <li>todo date : {formatDate(myTodo.dueDate)}</li>
        <li>todo urgent? : {myTodo.urgent.toString()}</li>
        <li>todo complete? : {myTodo.complete.toString()}</li>
        <li>todo parent list: {myTodo.parentList?.title.toString()}</li>
      </ul>
    </>
  )
}

export default App
