import React, { useState } from 'react'
import './Todo.css'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  makeStyles,
  Input,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import DeleteIcon from '@material-ui/icons/Delete'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import { db } from './firebase'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
  },
}))

export const Todo = ({ id, todo, timestamp }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const updateTodo = () => {
    //alternative
    // db.collection('todos').doc(id).set({
    //   todo: input,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
    // },{merge:true})

    db.collection('todos').doc(id).update({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
    setOpen(false)
  }

  //console.log(id);
  return (
    <>
      {/* modal part */}
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper} >
          <h1>update</h1>
          <div>
            <FormControl className='form_control'>
              <InputLabel>Write a Todo</InputLabel>
              <Input placeholder={todo} value={input} onChange={(e) => setInput(e.target.value)} />
            </FormControl>

            <Button
              disabled={!input}
              variant='contained'
              color='primary'
              type='submit'
              onClick={updateTodo}
            >
              Update Todo
            </Button>
          </div>
          <div  className="cancel_button" >
          <CancelIcon 
    
            fontSize='large'
            style={{ color: '#f50057'}}
            onClick={(e) => setOpen(false)}
          />
          </div>
        </div>
      </Modal>

      {/* slide part */}
      <List className='todo_list'>
        <ListItem className='list_item'>
          <FormatListBulletedIcon
            fontSize='large'
            style={{ padding: '0px 10px', color: '#2196f3' }}
          />
          <ListItemText
            primary={todo}
            secondary={Date(timestamp).toLocaleString()}
          />

          <IconButton edge='end' aria-label='delete'>
            <EditIcon onClick={(e) => setOpen(true)} />
          </IconButton>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => db.collection('todos').doc(id).delete()}
          >
            <DeleteIcon
              className='waves-effect waves-light btn'
              fontSize='large'
              variant='contained'
              color='secondary'
            />
          </IconButton>
        </ListItem>
      </List>
    </>
  )
}
