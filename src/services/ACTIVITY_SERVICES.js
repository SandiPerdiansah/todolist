import {api} from "./API_SERVICES.js";

export const ACTIVITY_SERVICES = {
    async getActivities() {
        try {
            const response = await fetch(`${api.url}/activity-groups?email=${api.email}`);
            return await response.json();
        } catch (e) {
            return `Error ${e.message}`;
        }
    },

    async addActivity() {
        try {
            const response = await fetch(`${api.url}/activity-groups`, {
                method: 'POST',
                headers: api.headers,
                body: JSON.stringify({
                    title: 'New Activity',
                    email: api.email
                })
            });

            return await response.json();
        } catch (e) {
            return `Error ${e.message}`;
        }
    },

    async updateActivity(id, newTitle) {
        try {
            const response = await fetch(`${api.url}/activity-groups/${id}`, {
                method: 'PATCH',
                headers: api.headers,
                body: JSON.stringify({
                    title: newTitle
                })
            });

            return await response.json();
        } catch (e) {
            return `Error ${e.message}`;
        }
    },

    async deleteActivity(id) {
        try {
            const response = await fetch(`${api.url}/activity-groups/${id}`, {
                method: 'DELETE',
                headers: this.headers
            });

            return await response.json();
        } catch (e) {
            return `Error ${e.message}`;
        }
    }
}