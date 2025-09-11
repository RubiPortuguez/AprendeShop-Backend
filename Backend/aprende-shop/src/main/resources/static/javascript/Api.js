class ApiClient {
    static getBaseUrl() {
        return 'http://localhost:8080/api';
    }

    static getAuthHeaders() {
        const token = localStorage.getItem('accessToken');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer: ${token}`
        };
    }

    static async get(url) {
        const response = await fetch(`${this.getBaseUrl()}${url}`, {
            headers: this.getAuthHeaders()
        });
        return this.handleResponse(response);
    }

    static async post(url, data) {
        const response = await fetch(`${this.getBaseUrl()}${url}`, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    }

    static async put(url, data) {
        const response = await fetch(`${this.getBaseUrl()}${url}`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return this.handleResponse(response);
    }

    static async delete(url) {
        const response = await fetch(`${this.getBaseUrl()}${url}`, {
            method: 'DELETE',
            headers: this.getAuthHeaders()
        });
        return this.handleResponse(response);
    }

    static async handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            const error = await response.text();
            throw new Error(error);
        }
    }
}