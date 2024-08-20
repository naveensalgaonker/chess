import { useState } from "react"
import { useSocket } from "../hooks/useSocket"
import Board from "./Board"
import { message } from "../models/models"

export const Game = () => {
  const socket = useSocket()
  const [waiting, setWaiting] = useState<string | null>(null)

  const INIT_GAME = "init_game"

  const initGame = () => {
    socket.send({
      state: INIT_GAME,
    })

    socket.recievedMessage((res:message) => {
      if (res && res?.message && (res.state === "GAME_STARTED" || res.state === 'WAITING')) {
        setWaiting(res.message)
      }
    })
  }

  return (
    <div className="flex flex-row justify-evenly items-center">
      <Board socket={socket} data-attri='fest-data'/>

      <div>
        {waiting===null && <button 
          className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
          onClick={()=>initGame()}
        >Play Now</button>}
        {waiting && <div className="text-center">{waiting}</div>}
      </div>
    </div>
  )
}
