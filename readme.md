for BE websocket testing use the following url:
  https://hoppscotch.io/realtime/websocket

Valid Payload
Start Game
{
  "state": "init_game",
  "data": ""
}

Move
{
  "state": "move",
  "data": {
    "from" : "d2",
    "to":"d4"
  }
}