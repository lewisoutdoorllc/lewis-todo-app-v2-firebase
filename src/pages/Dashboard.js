import React from 'react'
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { useState, useEffect } from 'react'
import { onSnapshot, doc } from 'firebase/firestore';
import db, { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

export const Dashboard = () => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    const [filterStatus, setFilterStatus] = useState("all")

    const [user, setUser] = useState({})
    //  ===== LOGOUT =====
    const logout = async () => {
        await signOut(auth)
        window.location = "/"
    }

    useEffect(() => {
        auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // KEEPS TRACK OF USER
                setUser(currentUser.uid)
            } else {
                // IF USER IS NOT LOGGED IN
                alert("You must be logged in to view this page")
                window.location = "/"
                // console.log("Please log in to view your dashboard")
            }
        })
        onSnapshot(doc(db, "users", `${user}`), (snapshot) => {
            let todos = snapshot.data().tasks
            const handleFilter = () => {
                if (filterStatus === "active") {
                    return setFilteredTasks(todos.filter((task) => task.status === false))
                } else if (filterStatus === "completed") {
                    return setFilteredTasks(todos.filter((task) => task.status === true))
                } else {
                    return setFilteredTasks(todos)
                }
            }
            handleFilter()
        })
    }, [user, filterStatus, tasks])

    return (
        <div className="Dashboard">
            <div className='container'>
                <div className='header'>
                    <h1>TODO</h1>
                    <img src='./images/icon-sun.svg' alt='sun' />
                </div>

                {/* ADD TO TASK INPUT COMPONENT */}
                <TaskInput
                    tasks={tasks}
                    setTasks={setTasks}
                    userId={user}
                    filteredTasks={filteredTasks}
                />

                {/* MAKE A TASK LIST COMPONENT */}
                <TaskList
                    tasks={tasks}
                    setTasks={setTasks}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filteredTasks={filteredTasks}
                    userId={user}
                />
            </div>
            <h3 onClick={logout}>Logout</h3>
        </div>
    )
}