import { useState } from "react"

export const Landing = () => {
  const [foundPlayer,setFoundPlayer] = useState(false)
  return (
    <div className="flex justify-evenly items-center h-screen">
      <img src={"chess-board.jpeg"} alt="chess-board" className="w-1/2"/>
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button">Join Room</button>
    </div>
  )
}
