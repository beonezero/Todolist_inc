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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./App";
import {tasksSelector} from "./selectors/tasksSelector";
import {todolistsSelector} from "./selectors/todolistsSelector";

export type FilterValuesType = "all" | "active" | "completed";

export function AppWithRedux() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    let tasks = useSelector<AppRootStateType, TasksStateType>(tasksSelector)

    let todolist = useSelector<AppRootStateType, TodolistType[]>(todolistsSelector)

    let dispatch = useDispatch()

    const [isLightMode, setIsLightMode] = useState<boolean>(true)


    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        dispatch(removeTodolistAC(todolistId))
    }


    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    function changeTodolistFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }

    const changeTodolistTitle = (newTodolistTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newTodolistTitle, todolistId))
    }


    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    const changeTaskTitle = (newTitle: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, todolistId, newTitle))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, todolistId, isDone))
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

