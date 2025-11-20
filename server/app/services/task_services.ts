import Task from '#models/task'

class TaskService {
    static async createTask(title: any, userId: number) {
        try {
            const task = await Task.create({ title, userId })
            return {
                error: false,
                message: 'Task created successfully',
                data: task
            }
        } catch (err: any) {
            return {
                error: true,
                message: 'Failed to create task',
                data: err.message
            }
        }
    }

    static async getTasks(userId: number) {
        try {
            const tasks = await Task
                .query()
                .where('userId', userId)
            return {
                error: false,
                message: 'All task list',
                data: tasks
            }
        } catch (err: any) {
            return {
                error: true,
                message: 'Failed to get tasks',
                data: err.message
            }
        }
    }

    static async updateTask(taskid: number, taskdata: any, userId: number) {
        try {
            const task = await Task
                .query()
                .where('id', taskid)
                .where('userId', userId)
                .first()

            if (!task) {
                return {
                    error: true,
                    message: 'Task not found',
                    data: null
                }
            }

            task.merge(taskdata)
            await task.save()

            return {
                error: false,
                message: 'Task updated successfully',
                data: task
            }
        } catch (err: any) {
            return {
                error: true,
                message: 'Failed to update task',
                data: err.message
            }
        }
    }

    static async deleteTask(taskid: number, userId: number) {
        try {
            const task = await Task
                .query()
                .where('id', taskid)
                .where('userId', userId)
                .first()

            if (!task) {
                return {
                    error: true,
                    message: 'Task not found',
                    data: null
                }
            }
            await task.delete()

            return {
                error: false,
                message: 'Task deleted successfully',
                data: null
            }
        } catch (err: any) {
            return {
                error: true,
                message: 'Failed to delete task',
                data: err.message
            }
        }
    }
}

export default TaskService
