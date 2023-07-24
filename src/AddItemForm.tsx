import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button disabled={isAddItemBtnDisabled} onClick={addItem}>+</button>
            {userMaxLengthMessage}
            {userErrorMessage}
        </div>
    );
};
