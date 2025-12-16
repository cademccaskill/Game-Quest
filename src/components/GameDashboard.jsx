import { useEffect, useState } from "react"
import { getGamesByUserId, getAllGenres, getAllPlatforms } from "../services/gameService"
import "./GameDashboard.css"

export const GameDashBoard = () => {
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [platforms, setPlatforms] = useState([])    

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("honey_user"))
    getGamesByUserId(currentUser.id).then((gameArray) => {
      setGames(gameArray)
    })
  }, [])

  useEffect(() => {
    getAllGenres().then((genreArray) => {
      setGenres(genreArray)
    })
  }, [])

  useEffect(() => {
    getAllPlatforms().then((platformArray) => {
      setPlatforms(platformArray)
    })
  }, [])

  const getGenreName = (genreId) => {
    return genres.find(genre => genre.id === genreId)?.genreName
  }

  const getPlatformName = (platformId) => {
    return platforms.find(platform => platform.id === platformId)?.platformName
  }

return (
  <div className="games-container">
    <h1>My Games</h1>
    <div className="games">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.gameImg} alt={game.gameName} />
          <h3>{game.gameName}</h3>
          <h4>Genre: {getGenreName(game.genresId)}</h4>
          <h4>Platform: {getPlatformName(game.platformsId)}</h4>
          <p>{game.notes}</p>
        </div>
      ))}
    </div>
  </div>
)
}