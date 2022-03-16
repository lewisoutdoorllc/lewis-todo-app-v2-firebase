import React, { useState } from 'react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import db from '../utils/firebase'

/* TASKINPUT TODOS
Need to ADD a document(task) to Firestore?

- import addDoc and collection from firebase/firestore
- import db from ../utils/firebase.js
- make handleForm async/await
- await addDoc()
- Pass collectionRef and payload to addDoc()
*/

export const TaskInput = (task, setTasks, userId, filteredTasks) => {

    const [input, setInput] = useState("")

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const generateId = (array) => {
        // This variable should hold an array of all the ids
        const taskIDs = array.map((item) => item.id)

        console.log(taskIDs)
        if(taskIDs.length === 0) {
            return 0
        } else {
            // This variable should hold the highest id
            let maxId = Math.max(...taskIDs)
            return maxId + 1
        }
        // return Math.max(...taskIDs) + 1
    }

    const handleForm = async (e) => {
        e.preventDefault()
        // How do I add a new task to the list
        if (input) {
            const newTask = {
                text: input.trim(),
                status: false,
                id: generateId(filteredTasks)
            }
            filteredTasks.push(newTask)
            let taskRef = filteredTasks

            taskRef.push(newTask)

            const payload = {
                tasks: taskRef
            }
            setDoc(doc(db, 'users', {}), payload)
            // THIS RESETS THE INPUT FIELD AFTER ENTERING A TASK
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
