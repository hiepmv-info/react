import http from "../ToDo/http-common";
import { ITodo } from "./Todo.const";

class TodoService {
    getAll(search: string) {
        return http.get(`/todo_list?search=${search}`);
    }

    get(id: string) {
        return http.get(`/todo_list/${id}`);
    }

    create(data: ITodo) {
        return http.post("/todo_list", data);
    }

    update(id: number, data: ITodo) {
        return http.put(`/todo_list/${id}`, data);
    }

    delete(id: number) {
        return http.delete(`/todo_list/${id}`);
    }
}

export default new TodoService();