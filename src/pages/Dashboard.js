import React from 'react'
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { useState, useEffect } from 'react'
import { onSnapshot, collection, doc, setDoc } from 'firebase/firestore';
import db, { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

export const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    const [filterStatus, setFilterStatus] = useState("all")

    const [user, setUser] = useState({})

    const logout = async () => {
        await auth.signOut(auth)
        window.location = "/"
    }

    // useEffect(() => {
    //     const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
    //         let todos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //         setFilteredTasks(todos)
    //         const handleFilter = () => {
    //             if (filterStatus === "active") {
    //                 setFilteredTasks(todos.filter((task) => task.status === false))
    //             }
    //             else if (filterStatus === "completed") {
    //                 setFilteredTasks(todos.filter((task) => task.status === true))
    //             }
    //             else {
    //                 setFilteredTasks(todos)
    //             }
    //         }
    //         handleFilter()
    //     })
    //     // Clean up function when the component unmounts remove the sideEffect
    //     return unsub

    // }, [filterStatus])

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // KEEPS TRACK OF USER
                setUser(currentUser.uid)
            } else {
                // IF USER IS NOT LOGGED IN
                alert("You must be logged in to view this page")
                window.location = "/signin"
                // console.log("Please log in to view your dashboard")
            }
        })
        onSnapshot(doc(db, 'users', `${user}`), (snapshot) => {
            let todos = snapshot.data().tasks
            setFilteredTasks(todos)
        })
        return unsub
    }, [user])

    return (
        <div className="Dashboard">
            <div className='container'>
                <div className='header'>
                    <h1>TODO</h1>
                    <img src='./images/icon-sun.svg' alt='sun' />
                </div>

                {/* ADD TO TASK INPUT COMPONENT */}
                <TaskInput tasks={tasks} setTasks={setTasks} userId={user} filteredTasks={filteredTasks}/>

                {/* MAKE A TASK LIST COMPONENT */}
                <TaskList
                    tasks={tasks}
                    setTasks={setTasks}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filteredTasks={filteredTasks}
                />
            </div>
            <h1 onClick={logout}>Logout</h1>
        </div>
    )
}