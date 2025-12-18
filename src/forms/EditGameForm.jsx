import { useEffect, useState } from "react"
import "./Form.css"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById, updateGame, getAllGenres, getAllPlatforms, getAllStatus } from "../services/gameService"

export const EditGameForm = ({ currentUser }) => {
  const [gameName, setGameName] = useState("")
  const [genreId, setGenreId] = useState(0)
  const [platformId, setPlatformId] = useState(0)
  const [statusId, setStatusId] = useState(0)
  const [gameImg, setGameImg] = useState("")
  const [notes, setNotes] = useState("")
  const [genres, setGenres] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [statuses, setStatuses] = useState([])
  
  const { gameId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getGameById(gameId).then((data) => {
      setGameName(data.gameName)
      setGenreId(data.genresId)
      setPlatformId(data.platformsId)
      setStatusId(data.statusId)
      setGameImg(data.gameImg)
      setNotes(data.notes)
    })
  }, [gameId])

  useEffect(() => {
    getAllGenres().then(setGenres)
    getAllPlatforms().then(setPlatforms)
    getAllStatus().then(setStatuses)
  }, [])

const handleSave = (event) => {
  event.preventDefault()

  const updatedGame = {
    id: parseInt(gameId),
    userId: currentUser.id,
    gameName: gameName,
    genresId: parseInt(genreId),
    platformsId: parseInt(platformId),
    statusId: parseInt(statusId),
    gameImg: gameImg,
    notes: notes
  }

  updateGame(updatedGame).then(() => {
    navigate("/GameDashboard")
  })
}
    
  return (
    <form className="game-form" onSubmit={handleSave}>
      <h2 className="form-title">Edit Game</h2>
      
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameName">Game Name:</label>
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(event) => setGameName(event.target.value)}
            required
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Genre:</label>
          {genres.map(genre => (
            <div key={genre.id}>
              <input
                type="radio"
                id={`genre-${genre.id}`}
                name="genre"
                value={genre.id}
                checked={genreId === genre.id}
                onChange={(event) => setGenreId(parseInt(event.target.value))}
              />
              <label htmlFor={`genre-${genre.id}`}>{genre.genreName}</label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Platform:</label>
          {platforms.map(platform => (
            <div key={platform.id}>
              <input
                type="radio"
                id={`platform-${platform.id}`}
                name="platform"
                value={platform.id}
                checked={platformId === platform.id}
                onChange={(event) => setPlatformId(parseInt(event.target.value))}
              />
              <label htmlFor={`platform-${platform.id}`}>{platform.platformName}</label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>Status:</label>
          {statuses.map(status => (
            <div key={status.id}>
              <input
                type="radio"
                id={`status-${status.id}`}
                name="status"
                value={status.id}
                checked={statusId === status.id}
                onChange={(event) => setStatusId(parseInt(event.target.value))}
              />
              <label htmlFor={`status-${status.id}`}>{status.statusName}</label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="gameImg">Image URL:</label>
          <input
            type="text"
            id="gameImg"
            value={gameImg}
            onChange={(event) => setGameImg(event.target.value)}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </fieldset>

      <button type="submit" className="save-btn">Save Changes</button>
    </form>
  )
}