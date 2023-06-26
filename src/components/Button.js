import React from 'react'

const Button = ({ setActionsChosen, actionsChosen, setActions }) => {
    return (
        <button
            onClick={() => setActionsChosen(setActions)}
            style={{ color: (actionsChosen === setActions) ? "var(--bright-blue)" : "" }}
        >{setActions}</button>)
}

export default Button