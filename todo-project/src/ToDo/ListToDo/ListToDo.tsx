import { ITodo, statusColorMap } from "../Todo.const";
import { useCallback } from 'react';

function ListToDo({ listTodo, setModalMode, setSelectedTodo, setOpenModal }: {
    listTodo: ITodo[], setModalMode: React.Dispatch<React.SetStateAction<string>>,
    setSelectedTodo: React.Dispatch<React.SetStateAction<ITodo>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    console.log('ListToDo');
    const handleTodoClick = useCallback((todo: ITodo, mode: string, openModal: boolean) => {
        setModalMode(mode);
        setSelectedTodo(todo);
        setOpenModal(openModal);
    }, [setModalMode, setSelectedTodo, setOpenModal]);

    return (
        <>
            <ul className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md max-w-md mx-auto mt-16">
                {listTodo.map((item) => (
                    <li key={item.id} className="border-t border-gray-200 dark:border-gray-700">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex items-center justify-between">
                                <h3 onClick={() => handleTodoClick(item, 'view', true)} className="text-lg leading-6 font-medium cursor-pointer text-gray-900 dark:text-gray-100">{item.title}</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status: <span className={statusColorMap[item.status]}>{item.status}</span></p>
                                <div>
                                    <a href="#" onClick={() => handleTodoClick(item, 'edit', true)} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Edit</a>
                                    <a href="#" onClick={() => handleTodoClick(item, 'delete', false)} className="font-medium ml-3 text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">Delete</a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ListToDo