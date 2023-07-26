import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";

type AddItemFormPropsType = {
    maxTasksTitleLength: number
    addNewItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = ({
                                                          maxTasksTitleLength,
                                                          addNewItem
                                                      }) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isItemTitleLengthTooLong) {
            setTitle(e.currentTarget.value)
        }
    }

    const addItem = () => {
        if (title.trim() !== "") {
            addNewItem(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }

    const isItemTitleLengthTooLong = title.length > maxTasksTitleLength

    const isAddItemBtnDisabled = !title || isItemTitleLengthTooLong || error

    const userMaxLengthMessage = isItemTitleLengthTooLong && <h5>Task title is to long</h5>

    const userErrorMessage = error && <div className="error-message">Please, enter correct title</div>

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                size={"small"}
                id="outlined-basic"
                label="Add task"
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <AddIcon onClick={addItem}/>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};
