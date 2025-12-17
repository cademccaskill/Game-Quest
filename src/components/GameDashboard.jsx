import { useEffect, useState } from "react"
import { getGamesByUserId, getAllGenres, getAllPlatforms, deleteGame } from "../services/gameService"
import "./GameDashboard.css"

export const GameDashBoard = () => {
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("honey_user"))
    if (currentUser) {
      getGamesByUserId(currentUser.id).then((gameArray) => {
        setGames(gameArray)
      })
    }
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

  useEffect(() => {
    const foundGames = games.filter((game) =>
      game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredGames(foundGames)
  }, [searchTerm, games])

  const getGenreName = (genreId) => {
    return genres.find(genre => genre.id === genreId)?.genreName
  }

  const getPlatformName = (platformId) => {
    return platforms.find(platform => platform.id === platformId)?.platformName
  }

  const handleDelete = (gameId) => {
    deleteGame(gameId).then(() => {
      const currentUser = JSON.parse(localStorage.getItem("honey_user"))
      getGamesByUserId(currentUser.id).then((gameArray) => {
        setGames(gameArray)
      })
    })
  }

  return (
    <div className="games-container">
      <h1>My Games</h1>
      
      <input
        type="text"
        placeholder="Search games..."
        onChange={(event) => setSearchTerm(event.target.value)}
        className="game-search"
      />

      <div className="games">
        {filteredGames.map((game) => (
          <div key={game.id} className="game-card">
            <img src={game.gameImg} alt={game.gameName} />
            <h3>{game.gameName}</h3>
            <h4>Genre: {getGenreName(game.genresId)}</h4>
            <h4>Platform: {getPlatformName(game.platformsId)}</h4>
            <p>{game.notes}</p>
            <button onClick={() => handleDelete(game.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}