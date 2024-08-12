for BE websocket testing use the following url:
  https://hoppscotch.io/realtime/websocket

Valid Payload
Start Game
{
  "action": "init_game",
  "data": ""
}

Move
{
  "action": "move",
  "data": {
    "from" : "d2",
    "to":"d4"
  }
}