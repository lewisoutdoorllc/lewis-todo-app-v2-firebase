import React from 'react'
import { FilterControl } from './FilterControl'
import { Task } from './Task'
import { doc, setDoc } from 'firebase/firestore'
import db from '../utils/firebase'

export const TaskList = ({ tasks, setTasks, filterStatus, setFilterStatus, filteredTasks, userId }) => {

  // =====  DELETE TASK FROM FIREBASE  =====
  // ===== CLEAR TASK WITH THE STATUS OF TRUE OR IN OTHER WORDS COMPLETED =====
  const clearCompleted = () => {
    const docRef = doc(db, "users", userId)
    let arrayRef = filteredTasks.filter((item) => item.status === false)
    const payload = {
      tasks: arrayRef
    }
    // ====  UPDATES THE DOCUMENT IN FIREBASE  ====
    setDoc(docRef, payload)
  }

  let itemsLeft = filteredTasks.length

  return (

    <div className='task-list-wrapper'>
      {/* TASKLIST */}
      <div className='task-list'>
        {filteredTasks.map((task) => {
          return <Task
            text={task.text}
            status={task.status}
            tasks={tasks}
            setTasks={setTasks}
            task={task}
            key={task.id}
            filteredTasks={filteredTasks}
            userId={userId}
          />
        })}
      </div>
      {/* TASKLIST ITEMS LEFT COUNTER */}
      <div className='task-items-info'>
        <div className='items-left'>
          {itemsLeft} items left
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
