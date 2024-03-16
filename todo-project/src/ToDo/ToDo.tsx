import { useCallback, useEffect, useMemo, useState } from "react";
import ListToDo from "./ListToDo/ListToDo";
import Search from "./SearchBox/Search";
import TodoService from "./Todo.service";
import { ITodo, StatusEnum, modalBlockColumnsCreate, modalBlockColumnsEdit, modalBlockColumnsView } from "./Todo.const";
import ModalTodo from "./ModalToDo/ModalTodo";
import Cookies from 'js-cookie';

function ToDo() {
    const [search, setSearch] = useState('');
    const [listTodo, setListTodo] = useState([]);
    const [modalMode, setModalMode] = useState('');
    const [selectedTodo, setSelectedTodo] = useState<ITodo>({
        id: 0,
        title: '',
        description: '',
        status: StatusEnum.ACTIVE,
        done: false
    });
    const [openModal, setOpenModal] = useState(false);

    const userName = useMemo(() => (
        JSON.parse(Cookies.get('user') as string).name
    ), []);


    const fetchListTodo = useCallback(async (search: string) => {
        try {
            const response = await TodoService.getAll(search);
            setListTodo(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchListTodo(search);
    }, [search, fetchListTodo]);

    const handleTodo = useCallback(async (action: string, todo: ITodo) => {
        let promise;
        if (action === 'edit') {
            promise = TodoService.update(todo.id, todo);
        } else if (action === 'create') {
            promise = TodoService.create(todo);
        } else if (action === 'delete') {
            promise = TodoService.delete(todo.id);
        }

        try {
            await promise;
            fetchListTodo(search);
        } catch (error) {
            console.log(error);
        }
    }, [fetchListTodo, search]);

    const getModalColumns = () => {
        switch (modalMode) {
            case 'view':
                return modalBlockColumnsView;
            case 'edit':
                return modalBlockColumnsEdit;
            default:
                return modalBlockColumnsCreate;
        }
    }

    return (
        <>
            <Search setSearch={setSearch} setModalMode={setModalMode} setOpenModal={setOpenModal} setSelectedTodo={setSelectedTodo} />
            <p className="text-center text-2xl font-bold text-gray-800 mt-16 dark:text-gray-200">Hello {userName}</p>
            <ListToDo listTodo={listTodo} setModalMode={setModalMode} setSelectedTodo={setSelectedTodo} setOpenModal={setOpenModal} />
            {openModal && <ModalTodo onSubmit={(todo) => handleTodo(modalMode, todo)} todo={selectedTodo} open={openModal} onClose={() => setOpenModal(false)}
                column={getModalColumns()} />}
        </>
    );
}

export default ToDo;