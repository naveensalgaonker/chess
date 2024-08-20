import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();


  function handleAssignGame(){
    navigate('/game');
  }

  return (
    <div className="flex justify-evenly items-center h-screen">
      <img src={"chess-board.jpeg"} alt="chess-board" className="w-[500px]"/>
      <div>
        {/* {isLoading && <Loading/>} */}
        <button
          onClick={() => handleAssignGame()} 
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
          type="button"
        >Join Room</button>
        {/* {foundPlayer && <h1>Found Player. Initializing the Game.... </h1>} */}
      </div>
    </div>
  )
}
