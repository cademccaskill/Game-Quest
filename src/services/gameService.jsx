export const getGamesByUserId = (userId) => {
  return fetch(`http://localhost:8088/games?userId=${userId}`).then(res => 
    res.json())
}

export const getAllGenres = () => {
  return fetch(`http://localhost:8088/genres`).then(res => res.json())
}

export const getAllPlatforms = () => {
  return fetch(`http://localhost:8088/platforms`).then(res => res.json())
}

export const getAllStatus = () => {
  return fetch(`http://localhost:8088/statuses`).then(res => res.json())
}

export const getGameById = (gameId) => {
  return fetch(`http://localhost:8088/games/${gameId}`).then(res => 
    res.json())
}

export const updateGame = (game) => {
  return fetch(`http://localhost:8088/games/${game.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  }).then(res => res.json())
}

export const deleteGame = (game) => {
  return fetch(`http://localhost:8088/games/${game.id}`, {
    method: "DELETE"
  }).then(res => res.json())
}

export const createGame = (game) => {
  return fetch(`http://localhost:8088/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  }).then(res => res.json())
}