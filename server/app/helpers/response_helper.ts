import logger from '@adonisjs/core/services/logger'

interface ResponseOptions<T = any> {
    message?: string
    data?: T
}

export const successResponse = <T = any>({ message, data }: ResponseOptions<T>) => {
    if (message) {
        logger.info(`Success: ${message}`)
    } else {
        logger.info('Success response generated')
    }

    return {
        status: true,
        message,
        data,
    }
}

export const errorResponse = <T = any>({ message, data }: ResponseOptions<T>) => {
    logger.error(`Error: ${message}`)

    return {
        status: false,
        message,
        data,
    }
}
