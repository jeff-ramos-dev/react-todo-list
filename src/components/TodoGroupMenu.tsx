interface MenuProps {
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function TodoGroupMenu({handleClick}: MenuProps) {
    const menuOptions = ['All Todos', 'Today', 'This Week', 'This Month', 'Urgent'];

    const optionMap = menuOptions.map(opt => {
        return (
            <li key={opt}>
                <button 
                    onClick={handleClick} 
                    className="todoGroupMenuOption"
                >{opt}</button>
            </li>
        )
    })

    return (
        <>
            <ul className={"todoGroupMenu"}>
                {optionMap}
            </ul> 
        </>
    )
}
