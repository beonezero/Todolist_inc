import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "Magnetic whiteboard", isDone: true},
            {id: v1(), title: "Ball", isDone: true},
            {id: v1(), title: "Costume", isDone: false},
            {id: v1(), title: "Eat", isDone: false},
            {id: v1(), title: "Dentist", isDone: false}
        ]
    });

    const [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn?", filter: "all"},
        {id: todolistId_2, title: "What to buy?", filter: "all"}
    ])

    function changeTodolistFilter(value: FilterValuesType, todolistId: string) {
        const updateTodolists: TodolistType[] = todolist.map(tl => tl.id === todolistId
            ? {...tl, filter: value} : tl)
        setTodolist(updateTodolists)
    }


    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId] : tasks[todolistId].filter(t => t.id != id)})
    }

    function addTask(title: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }


    const getFilteredTasks =
        (allTasks: TaskType[], currentFilteredValue: FilterValuesType): TaskType[] => {
            switch (currentFilteredValue) {
                case "completed":
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        }

    const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeTodolistFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
