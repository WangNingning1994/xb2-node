import app from './app' // no need to specify index.js(ts)
import { APP_PORT } from './app/app.config'

app.listen(APP_PORT, () => {
  console.log('starting service...');
})