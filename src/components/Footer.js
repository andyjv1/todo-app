import React from 'react'

const Footer = ({ setActionsChosen, actionsChosen, color }) => {
    return (
        <footer
            className={(color === "light" ? '' : 'footer--dark')}>
            <div
                className={(color === "light" ? 'buttons' : 'buttons buttons--dark')}>
                <button
                    onClick={() => setActionsChosen("all")}
                    style={{ color: (actionsChosen === "all") ? "var(--bright-blue)" : "" }}
                >All</button>
                <button
                    onClick={() => setActionsChosen("active")}
                    style={{ color: (actionsChosen === "active") ? "var(--bright-blue)" : "" }}
                >Active</button>
                <button
                    onClick={() => setActionsChosen("completed")}
                    style={{ color: (actionsChosen === "completed") ? "var(--bright-blue)" : "" }}
                >Completed</button>
            </div>
            <p>Drag and drop to reorder list</p>
        </footer>
    )
}

export default Footer