export async function loginUser(name) {
  const response = await fetch(`/api/users/login?name=${name}`);

  if (response.status === 400) {
    throw new Error('Bad login request');
  } else if (response.status === 403) {
    throw new Error('Login error');
  } else if (response.status === 500) {
    throw new Error('Server error');
  } else {
    return response.json();
  }
}

export async function registerUser(name) {
  const response = await fetch('/api/users/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  if (response.status === 500) {
    throw new Error('Server error');
  } else if (response.status === 400) {
    throw new Error('Bad request');
  } else {
    return response.text();
  }
}

export async function deleteAccount(userToken, name) {
  const response = await fetch(`/api/users/${name}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  });

  if (response.status === 500) {
    throw new Error('Server error');
  } else if (response.status === 400) {
    throw new Error('Bad Request');
  } else if (response.status === 401) {
    throw new Error('Unauthorized');
  } else {
    return response.json();
  }
}

export async function getRooms(userToken) {
  const response = await fetch('/api/rooms', {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  });
  return response.json();
}

export async function getOneRoom(userToken, roomId) {
  const response = await fetch(`/api/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  });
  return response.json();
}

export async function setOneRoom(userToken, roomId, state) {
  await fetch(`/api/rooms/${roomId}`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state)
  });

  return getOneRoom(userToken, roomId);
}

async function getOneLightState(userToken, id) {
  const response = await fetch(`/api/lights/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    }
  });
  const light = await response.json();
  return { [light.id]: light.state.on };
}

export async function getLightStates(userToken, ...lightIds) {
  const lightStates = await Promise.all(
    lightIds.map(i => getOneLightState(userToken, i))
  );
  return lightStates.reduce((acc, light) => ({ ...acc, ...light }), {});
}

export async function setOneLightState(userToken, id, state) {
  await fetch(`api/lights/${id}`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state)
  });

  return getLightStates(userToken, id);
}
