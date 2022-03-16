import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import db from '../utils/firebase'

/* TASKINPUT TODOS
Need to ADD a document(task) to Firestore?

- import addDoc and collection from firebase/firestore
- import db from ../utils/firebase.js
- make handleForm async/await
- await addDoc()
- Pass collectionRef and payload to addDoc()
*/

export const TaskInput = ({ userId, filteredTasks }) => {

    const [input, setInput] = useState("")

    const handleChange = (e) => {
        setInput(e.target.value)
    }
    //  ===== GENERATE ID FOR NEW TASKS MADE BY USER =====  
    const generateId = (array) => {
        //  ===== NEW ARRAY THAT HOLDS ONLY THE IDS OF THE USERS TASK =====
        const taskIDs = array.map((item) => item.id)
        // console.log(taskIDs)
        if (taskIDs.length === 0) {
            return 0
        } else {
            //  ===== GETS OUR MAX ID AND ADDS 1 TO MAKE THE NEW TASKS THE HIGEST VAL =====
            return Math.max(...taskIDs) + 1
            // let maxId = Math.max(...taskIDs)
            // return maxId + 1
        }
    }

    const handleForm = async (e) => {
        e.preventDefault()
        //  ===== ADDS NEW TASK TO FIREBASE AND UPDATES USER'S TASKS =====
        if (input) {
            const newTask = {
                text: input.trim(),
                status: false,
                id: generateId(filteredTasks)
            }
            //  ===== PUSHES NEW TASK TO USER'S TASKS =====
            let taskRef = filteredTasks
            taskRef.push(newTask)

            const payload = {
                tasks: taskRef
            }
            setDoc(doc(db, "users", userId), payload)
            //  ===== THIS RESETS THE INPUT FIELD AFTER ENTERING A TASK =====
            setInput("")
        }
    }

    return (
        <div className='task-input'>
            <div className='check'>
                <div className='check-mark'>
                    {/* insert image here */}
                </div>
            </div>
            <div className='new-todo-input'>
                <form onSubmit={handleForm}>
                    <input value={input} onChange={handleChange} id='todo-input' type="text" placeholder='Create a new todo...' />
                </form>
            </div>
        </div>
    )
}
