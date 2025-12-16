export const getGamesByUserId = (userId) => {
  return fetch(`http://localhost:8088/games?userId=${userId}`).then(res => 
    res.json())
}

export const getAllGenres = () => {
  return fetch(`http://localhost:8088/genre`).then(res => res.json())
}

export const getAllPlatforms = () => {
  return fetch(`http://localhost:8088/platform`).then(res => res.json())
}