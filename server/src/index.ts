import server from './server'
import colors from 'colors'

// PORT
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(colors.magenta.bold(`Server is running on http://localhost:${port}`))
})
