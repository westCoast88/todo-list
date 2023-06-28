import React, { ChangeEvent, KeyboardEvent } from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void,
}

function AddItemForm(props: addItemFormPropsType) {
    let [title, setTitle] = React.useState<string>('')
    let [error, setError] = React.useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(title)
            setTitle('')
        }
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('title is required')
        }
    }

    return <div className="card_addBlock">
        <div>
            <input type="text"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""} />

            <button onClick={addItem} className="btn">+</button>
        </div>
        {error && <div className={'error-message'}>field is required</div>}
    </div>
}

export default AddItemForm