import User from "#models/user"


export default class UserService {

    static async getAllUsers() {
        const users = await User.all()
        if (users.length == 0) {
            return {
                error: true,
                error_message: 'No users found',
                data: []
            };
        }
        return {
            error: false,
            error_message: '',
            data: users
        };
    }

    static async registerUsers(userData: any) {
        const existingUser = await User.query()
            .where('username', userData.username)
            .orWhere('email', userData.email)
            .first();

        if (existingUser) {
            return {
                error: true,
                error_message: 'Email or username already exists',
                data: []
            };
        }

        const user = await User.create(userData);

        return {
            error: false,
            error_message: '',
            data: user
        };
    }


    static async getSingleUser(userid: any) {
        const user = await User.findBy('id', userid)
        if (!user) {
            return {
                error: true,
                error_message: `User not found with id ${userid}`,
                data: []
            }
        }
        return {
            error: false,
            error_message: ``,
            data: user
        }
    }

    static async updateUser(id: any, updateData: any) {
        const user = await User.findBy('id', id)

        if (!user) {
            return {
                error: true,
                error_message: 'User not Found',
                data: []
            }
        }

        user.merge(updateData)
        const updatedUser = await user.save()

        return {
            error: false,
            error_message: '',
            data: updatedUser
        }
    }

    static async deleteUser(id: any) {
        const user = await User.findBy('id', id)
        if (!user) {
            return {
                error: true,
                error_message: 'User not Found',
                data: []
            }
        }
        await user.delete()
        return {
            error: false,
            error_message: '',
            data: user
        }
    }

    static async updatePassword(email: any, oldPassword: any, newPassword: any) {
        const user = await User.verifyCredentials(email, oldPassword)
        if (!user) {
            return {
                error: true,
                error_message: 'Invalid Credentials',
                data: []
            }
        }
        user.password = newPassword
        const updatedUser = await user.save()
        return {
            error: false,
            error_message: '',
            data: updatedUser
        }
    }

    static async loginUser(email: any, password: any) {
        const user = await User.verifyCredentials(email, password)
        if (!user) {
            return {
                error: true,
                error_message: 'User not Found',
                data: []
            }
        }
        const token = await User.accessTokens.create(user)
        return {
            error: false,
            error_message: '',
            data: {
                user, token
            }
        }
    }

    static async logoutUser(auth: any) {
        await auth.use('api').invalidateToken()
        return { error: false, error_message: '', data: [] }
    }
}
