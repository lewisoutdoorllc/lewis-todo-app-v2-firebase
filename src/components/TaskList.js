import React from 'react'
import { FilterControl } from './FilterControl'
import { Task } from './Task'
import { deleteDoc, doc } from 'firebase/firestore'
import db from '../utils/firebase'

/* TASKLIST TODOS
Need to DELETE a collection from our Firestore db?

- import deleteDoc, and doc from 'firebase/firestore'
- import db from '../utils/firebase'
- use deleteDoc in clearCompleted
- deleteDoc(docRef, id) 
*/

export const TaskList = ({ tasks, setTasks, filterStatus, setFilterStatus, filteredTasks }) => {

  const clearCompleted = () => {
    //Clear's Tasks by deleting from Firestore
    filteredTasks.forEach((task) => {
      if (task.status === true) {
        deleteDoc(doc(db, 'tasks', task.id))
        // console.log(filteredTasks)
      }
    })
  }

  return (

    <div className='task-list-wrapper'>
      {/* TASKLIST */}
      <div className='task-list'>
        {filteredTasks.map((task) => {
          return <Task
            text={task.text}
            status={task.staus}
            tasks={tasks}
            setTasks={setTasks}
            task={task}
            key={task.id}
            filteredTasks={filteredTasks}
          />
        })}
      </div>
      {/* TASKLIST ITEMS LEFT COUNTER */}
      <div className='task-items-info'>
        <div className='items-left'>
          5 items left
        </div>

        <FilterControl
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        {/* CLEAR THE COMPLETED TASKS */}
        <div className='items-clear'>
          <span onClick={clearCompleted}>Clear Completed</span>
        </div>
      </div>
    </div>
  )
}
