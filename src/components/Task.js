import React, { useState } from 'react'
import Check from '../images/icon-check.svg'
import { setDoc, doc } from 'firebase/firestore'
import db from '../utils/firebase'

export const Task = ({ text, task, userId, filteredTasks }) => {

  // Create a state variable to keep track of mutable task
  const [mutableTask, setMutableTask] = useState(task)

  const checked = mutableTask.status ? "checked" : "";
  const checkIcon = mutableTask.status ? (<img src={Check} alt="completed" />) : "";

  const markCompleted = () => {
    setMutableTask({ ...mutableTask, status: !mutableTask.status })
    //  ======  UPDATE TASK IN FIREBASE TO TRUE OR FALSE DEPENDING ON STATUS  ======  
    const docRef = doc(db, "users", userId)
    const arrayRef = filteredTasks
    const index = filteredTasks.indexOf(task)
    arrayRef[index] = { ...task, status: !task.status }
    const payload = {
      tasks: arrayRef
    }
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
