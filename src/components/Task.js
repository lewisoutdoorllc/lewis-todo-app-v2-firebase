import React, { useState } from 'react'
import Check from '../images/icon-check.svg'
import { setDoc, doc } from 'firebase/firestore'
import db from '../utils/firebase'

/* Task TODOS
How do we UPDATE a task status to true OR false (backend)?

- Import setDoc, doc from 'firebase/firestore'
- Import db from "../utils/firebase"
- use setDoc(docRef,payload)
- setDoc will UPDATE a document to whatever the payload is.
*/

export const Task = ({ text, task, tasks, setTasks, filteredTasks }) => {

  // Create a state variable to keep track of mutable task
  const [mutableTask, setMutableTask] = useState(task)

  const checked = mutableTask.status ? "checked" : "";
  const checkIcon = mutableTask.status ? (<img src={Check} alt="completed" />) : "";

  const markCompleted = () => {
    setMutableTask({ ...mutableTask, status: !mutableTask.status })

    const docRef = doc(db, 'tasks', mutableTask.id)
    const payload = { text: task.text, id: task.id, status: !mutableTask.status }
    setDoc(docRef, payload)
  }

  return (
    <div className='task-item'>
      <div className='check' onClick={markCompleted}>
        <div className={`check-mark ${checked}`}>
          {checkIcon}
        </div>
      </div>

      <div className={`task-text ${checked}`}>
        <p>{text}</p>
      </div>
    </div>
  )
}
