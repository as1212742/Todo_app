import './App.css'
import { useState, preventDefault ,useEffect } from 'react'
import { Button, Input } from '@material-ui/core'
import { FormControl, InputLabel } from '@material-ui/core'
import {Todo} from './Todo'
import {db} from './firebase';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
     db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      //  console.log(snapshot.docs.map(doc => doc.data()))
       setTodos(snapshot.docs.map((doc) =>({id: doc.id ,todo: doc.data().todo})));
     });
  },[])

  const addTodo = (e) => {
    e.preventDefault()
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className='App'>
      <h1 style={{color:"#616161"}}>TODO Tracker App</h1>
      <form >
        <FormControl className="form_control">
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>

        <Button
          disabled={!input}
          variant='contained'
          color='primary'
          type='submit'
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>
      <ul className="list">
        {todos.map(item => (
           <Todo key={item.id} {...item}/>
        ))}
      </ul>
    </div>
  )
}

export default App
