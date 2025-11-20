
import TaskController from '#controllers/tasks_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/tasks', [TaskController, 'create'])
    router.get('/tasks', [TaskController, 'index'])
    router.put('/tasks/:id', [TaskController, 'update'])
    router.delete('/tasks/:id', [TaskController, 'delete'])
  })
   .use(middleware.auth({ guards: ['api'] }))       
