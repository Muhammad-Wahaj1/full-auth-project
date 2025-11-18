import type { HttpContext } from '@adonisjs/core/http'

import { createUserValidator, updateUserValidator } from '#validators/user'
import UserService from '#services/user_services'
import { errorResponse, successResponse } from '../helpers/response_helper.js'

export default class UsersController {

    async index({ response }: HttpContext) {
        try {
            const { error, error_message, data } = await UserService.getAllUsers()
            if (error) {
                return response.notFound(errorResponse({ message: error_message, data }))
            }
            return response.ok(successResponse({ message: 'All users list', data }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async store({ request, response }: HttpContext) {
        try {
            const userData = await request.validateUsing(createUserValidator)
            const { error, error_message, data } = await UserService.registerUsers(userData)
            if (error) {
                return response.conflict(errorResponse({ message: error_message, data }))
            }
            return response.created(successResponse({ message: 'User successfully registered', data }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async show({ params, response }: HttpContext) {
        try {
            const { error, error_message, data } = await UserService.getSingleUser(params.id)
            if (error) {
                return response.notFound(errorResponse({ message: error_message, data }))
            }
            return response.ok(successResponse({ message: `User with the id ${params.id}`, data }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async update({ params, request, response }: HttpContext) {
        try {
            const updateData = await request.validateUsing(updateUserValidator)
            const { error, error_message, data } = await UserService.updateUser(params.id, updateData)
            if (error) {
                return response.notFound(errorResponse({ message: error_message, data }))
            }
            return response.ok(successResponse({ message: 'User details updated successfully', data }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const { error, error_message, data } = await UserService.deleteUser(params.id)
            if (error) {
                return response.notFound(errorResponse({ message: error_message, data }))
            }
            return response.ok(successResponse({ message: 'User deleted successfully', data }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async updatePassword({ request, response }: HttpContext) {
        try {
            const { email, oldPassword, newPassword } = request.only(['email', 'oldPassword', 'newPassword'])
            const { error, error_message, data } = await UserService.updatePassword(email, oldPassword, newPassword)
            if (error) {
                return response.notFound(errorResponse({ message: error_message, data }))
            }
            return response.ok(successResponse({ message: 'Password updated successfully', data }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async login({ request, response }: HttpContext) {
        try {
            const { email, password } = request.only(['email', 'password'])
            const { error, error_message, data } = await UserService.loginUser(email, password)
            if (error) {
                return response.unauthorized(errorResponse({ message: error_message, data }))
            }
            return response.ok(successResponse({ message: 'Logged in successfully', data }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }

    async logout({ auth, response }: HttpContext) {
        try {
            await UserService.logoutUser(auth)
            return response.ok(successResponse({ message: 'Logged out successfully', data: [] }))
        } catch (err: any) {
            return response.internalServerError(
                errorResponse({ message: 'Something went wrong', data: err.message })
            )
        }
    }
}
