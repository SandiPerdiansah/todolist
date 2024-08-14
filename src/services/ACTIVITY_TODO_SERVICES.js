import {api} from "./API_SERVICES.js";

export const ACTIVITY_TODO_SERVICES = {

    async getTodoItem(id) {
        const response = await fetch(`${api.url}/todo-items?activity_group_id=${id}`);
        return response.json();
    },

    async addTodoItem(data) {
        const response = await fetch(`${api.url}/todo-items`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                activity_group_id: data.id,
                title: data.title,
            })
        });

        return response.json();
    },

    async getDetailTodoItem(id) {
        const response = await fetch(`${api.url}/todo-items/${id}`, {
            method: 'GET',
            headers: api.headers,

        });

        return response.json()
    },

    async updateTodo(data) {
        const response = await fetch(`${api.url}/todo-items/${data.id}`, {
            method: 'PATCH',
            headers: api.headers,
            body: JSON.stringify({
                title: data.title,
                is_active: data.is_active,
                priority:data.priority
            })
        });
    },

    async deleteTodoItem(id) {
        const response = await fetch(`${api.url}/todo-items/${id}`, {
            method: 'DELETE',
            headers: api.headers,
        });

        return response.json();
    },

}