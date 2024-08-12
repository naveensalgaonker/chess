import { useState } from "react"
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const [foundPlayer,setFoundPlayer] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();


  function handleAssignGame(){
    setIsLoading(true)
    setTimeout(()=>{
      // Logic to assign game from server
      setFoundPlayer(true)
      setIsLoading(false)

      setTimeout(()=>{
        // window.location.href = "/game"
        navigate('/game');
      },1000)
    },4000)
  }

  return (
    <div className="flex justify-evenly items-center h-screen">
      <img src={"chess-board.jpeg"} alt="chess-board" className="w-1/2"/>
      <div>
        {isLoading && <Loading/>}
        {!foundPlayer && <button
          disabled={isLoading}
          onClick={() => handleAssignGame()} 
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
          type="button"
        >Join Room</button>}
        {foundPlayer && <h1>Found Player. Initializing the Game.... </h1>}
      </div>
    </div>
  )
}
