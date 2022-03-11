import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import db from '../utils/firebase'

/* TASKINPUT TODOS
Need to ADD a document(task) to Firestore?

- import addDoc and collection from firebase/firestore
- import db from ../utils/firebase.js
- make handleForm async/await
- await addDoc()
- Pass collectionRef and payload to addDoc()
*/

export const TaskInput = () => {

    const [input, setInput] = useState("")

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        // How do I add a new task to the list
        if (input) {
            const collectionRef = collection(db, 'tasks')

            const payload = {
                text: input.trim(),
                status: false
            }

            await addDoc(collectionRef, payload)
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
