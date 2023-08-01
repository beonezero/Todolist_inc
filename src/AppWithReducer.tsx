import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    createTheme,
    Grid,
    IconButton,
    Paper, Switch,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {orange, teal} from "@mui/material/colors";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./reducers/task-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistReducer
} from "./reducers/todolist-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export function AppWithReducer() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

 const [tasks, dispatchToTasks] = useReducer(taskReducer,{
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

    const [todolist, dispatchToTodolist] = useReducer(todolistReducer,[
        {id: todolistId_1, title: "What to learn?", filter: "all"},
        {id: todolistId_2, title: "What to buy?", filter: "all"}
    ])

    const [isLightMode, setIsLightMode] = useState<boolean>(true)


    const removeTodolist = (todolistId: string) => {
        dispatchToTodolist(removeTodolistAC(todolistId))
        dispatchToTasks(removeTodolistAC(todolistId))
    }


    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function changeTodolistFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolist(changeTodolistFilterAC(value, todolistId))
    }

    const changeTodolistTitle = (newTodolistTitle: string, todolistId: string) => {
        dispatchToTodolist(changeTodolistTitleAC(newTodolistTitle, todolistId))
    }


    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    const changeTaskTitle = (newTitle: string, taskId: string, todolistId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, todolistId, newTitle))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, todolistId, isDone))
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


    const todolistComponents: Array<JSX.Element> = todolist.map(tl => {
        const filteredTasks: TaskType[] = getFilteredTasks(tasks[tl.id], tl.filter)
        return <Grid item key={tl.id}>
            <Paper elevation={4} className={"todolist"}>
                <Todolist title={tl.title}
                          tasks={filteredTasks}
                          removeTask={removeTask}
                          removeTodolist={removeTodolist}
                          changeTodolistFilter={changeTodolistFilter}
                          addTask={addTask}
                          changeTaskStatus={changeStatus}
                          changeTaskTitle={changeTaskTitle}
                          changeTodolistTitle={changeTodolistTitle}
                          todolistId={tl.id}
                          todolistFilter={tl.filter}

                />
            </Paper>
        </Grid>
    })

    const mode = isLightMode ? "light" : "dark"

    const customTheme = createTheme({
        palette: {
            primary: teal,
            secondary: orange,
            mode
        }
    })

    const changeTheme = () => {
       setIsLightMode(!isLightMode)
    }
    return (
        <ThemeProvider theme={customTheme}>
            <div className="App">
                <AppBar position={"static"}>
                    <Toolbar>
                        <IconButton
                            size={"large"}
                            edge={"start"}
                            color={"inherit"}
                            aria-label={"menu"}
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant={"h6"} component={"div"} sx={{flexGrow: 1}}>
                            Todolists
                        </Typography>
                        <Button size={"small"} variant={"contained"} color={"secondary"}>Logout</Button>
                        <Switch onClick={changeTheme} sx={{ml: "15px"}} defaultChecked />{isLightMode ? "dark" : "light"}
                    </Toolbar>
                </AppBar>
                <Container className={"Container"}>
                    <Grid container>
                        <Paper elevation={4} className={"addTodolistForm"}>
                            <AddItemForm addNewItem={addTodolist} maxTasksTitleLength={15}/>
                        </Paper>
                    </Grid>
                    <Grid container spacing={5}>{todolistComponents}</Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

