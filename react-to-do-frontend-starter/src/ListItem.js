const ListItem = ({title, done, id, handleDeleteTodo, handleUpdateTodo}) => {
    return (
        <>
            <li>
                {title}
                <input type="checkbox" checked={done ? "checked" : ""} onChange={(e) => handleUpdateTodo(e, id)}/>
                <button onClick={(e) => handleDeleteTodo(e, id)}>X</button>
            </li>
        </>
    );
};

export default ListItem;