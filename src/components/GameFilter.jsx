export const GameFilter = ({setSearchTerm}) => {
  return (
    <div className="game-filter">
        <input
        type="text"
        placeholder="Search games..."
        onChange={(event) => setSearchTerm(event.target.value)}
        className="game-search"
      />
      {/* Add button and filter options*/}
      {/* <button className="add-game-btn">Add New Game</button>
      <button className='add-game-info'
      onClick={() => {
        setShowOpenOnly(true)
      }}>Add Game Info</button> */}
    </div>
  )
}