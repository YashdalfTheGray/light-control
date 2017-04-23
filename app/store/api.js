export async function loginUser(name) {
    const response = await fetch(`/api/users/login?name=${name}`);

    if (response.status === 400) {
        throw new Error('Bad login request');
    }
    else if (response.status === 403) {
        throw new Error('Login error');
    }
    else if (response.status === 500) {
        throw new Error('Server error');
    }
    else {
        return response.json();
    }
}

export async function getRooms(apiKey) {
    const response = await fetch('/api/rooms', {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });
    return response.json();
}
