/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import '#start/routes/user_routes'
import '#start/routes/task_routes'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
