const ListItem = ({title, done, id, handleDeleteTodo, handleUpdateTodo}) => {
    return (
        <>
            <li>
                {title}
                <input type="checkbox" checked={done ? "checked" : ""} onChange={(e) => handleUpdateTodo(e, id)}/>
            </li>
            <button onClick={(e) => handleDeleteTodo(e, id)}>X</button>
        </>
    );
};

export default ListItem;