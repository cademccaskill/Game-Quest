import { useEffect, useState } from "react"
import { getGamesByUserId, getAllGenres, getAllPlatforms, deleteGame, getAllStatus } from "../services/gameService"
import { useNavigate } from "react-router-dom"
import "./GameDashboard.css"

export const GameDashBoard = ({ currentUser }) => {
  const [games, setGames] = useState([])
  const [genres, setGenres] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [statuses, setStatuses] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const navigate = useNavigate()

  const getAndSetGames = () => {
    if (currentUser?.id) {
      getGamesByUserId(currentUser.id).then((gameArray) => {
        setGames(gameArray)
      })
    }
  }

  useEffect(() => {
    getAndSetGames()
  }, [currentUser])

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
    getAllStatus().then((statusArray) => {
      setStatuses(statusArray)
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

  const getStatusName = (statusId) => {
    return statuses.find(status => status.id === statusId)?.statusName
  }

  const handleDelete = (game) => {
    deleteGame(game.id).then(() => {
      getAndSetGames()
    })
  }

  return (
    <div className="games-container">
      <h1>My Games</h1>
      
      <button onClick={() => navigate("/games/add")} className="add-game-btn">
        Add New Game
      </button>
      
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
            <h4>Status: {getStatusName(game.statusId)}</h4>
            <p>{game.notes}</p>
            <button onClick={() => navigate(`/games/${game.id}/edit`)}>Edit</button>
            <button onClick={() => handleDelete(game)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}