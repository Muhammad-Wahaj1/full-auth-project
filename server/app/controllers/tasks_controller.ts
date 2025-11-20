
import type { HttpContext } from '@adonisjs/core/http'
import { errorResponse, successResponse } from '../helpers/response_helper.js'
import TaskService from '#services/task_services'

export default class TaskController {
    async create({ request, auth, response }: HttpContext) {
        try {
            const userId = auth.user!.id
            const {title} = request.only(['title'])

            const serviceResponse = await TaskService.createTask( title, userId )
            return response.ok(successResponse(serviceResponse))

        } catch (err: any) {
            return response.internalServerError(errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async index({ auth, response }: HttpContext) {
        try {
            const userId = auth.user!.id
            const serviceResponse = await TaskService.getTasks(userId)
            return response.ok(successResponse(serviceResponse))

        } catch (err: any) {
            return response.internalServerError(errorResponse(
                {
                    message: 'Something went wrong',
                    data: err.message
                })
            )
        }
    }

    async update({ request, params, auth, response }: HttpContext) {
        try {
            const userId = auth.user!.id
            const taskdata = request.only(['title', 'status'])

            const serviceResponse = await TaskService.updateTask(params.id, taskdata, userId)

            return response.ok(successResponse(serviceResponse))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({
                    message: 'Something went wrong',
                    data: err.message
                })
            )
        }
    }

    async delete({ params, auth, response }: HttpContext) {
        try {
            const userId = auth.user!.id
            const serviceResponse = await TaskService.deleteTask(params.id, userId)
            return response.ok(successResponse(serviceResponse))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({
                    message: 'Something went wrong',
                    data: err.message
                })
            )
        }
    }
}
