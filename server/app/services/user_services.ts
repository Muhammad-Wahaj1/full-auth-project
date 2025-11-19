import PasswordReset from "#models/password_reset";
import User from "#models/user"
import crypto from 'crypto'
import { DateTime } from "luxon";
import nodemailer from "nodemailer";


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
        try {
            const user = await User.verifyCredentials(email, password);
            if (!user) {
                return { error: true, error_message: 'Invalid credentials', data: [] };
            }
            const token = await User.accessTokens.create(user)
            return {
                error: false,
                error_message: '',
                data: {
                    user, token
                }
            }
        } catch (err) {
            return { error: true, error_message: 'Invalid credentials', data: [] };
        }

    }

    static async logoutUser(auth: any) {
        await auth.use('api').invalidateToken()
        return { error: false, error_message: '', data: [] }
    }

    static async forgotpass(email: any) {
        const user = await User.findBy('email', email)
        if (!user) {
            return {
                error: true,
                error_message: "Enter a valid email address",
                data: []
            }
        }
        await PasswordReset.query().where('email', email).delete();
        const token = crypto.randomBytes(20).toString('hex')
        const data = await PasswordReset.create({
            email: email,
            token: token,
            expiresAt: DateTime.now().plus({ hours: 1 }),
            isUsed: false
        })


        const mailer = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'nella.heidenreich10@ethereal.email',
                pass: 'PTMKGSecypwcJpJdfm'
            }
        });
        const resetLink = `http://localhost:5173/reset-password/${token}`

        try {
            await mailer.sendMail({
                from: '"authMaster" <no-reply@authmaster.com>',
                to: email,
                subject: "Reset Your Password",
                html: `<p>Click to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
            });
        } catch (err) {
            console.error("Mail error:", err);
        }

        return {
            error: false,
            error_message: "Check your inbox for the reset link",
            data: data
        }
    }

    static async resetpass(token: any, password: any) {
        const targetUser = await PasswordReset.findBy('token', token)
        if (!targetUser || targetUser.isUsed || targetUser.expiresAt < DateTime.now()) {
            return {
                error: true,
                error_message: "Not a valid or expire Token",
                data: []
            }
        }
        const email = targetUser.email
        const user = await User.findBy('email', email)
        if (!user) {
            return {
                error: true,
                error_message: "user not found with this associated token",
                data: []
            }
        }

        user.password = password
        await user.save()
        await PasswordReset
            .query()
            .where('email', email)
            .andWhere('isUsed', false)
            .update({ isUsed: true });
        return {
            error: false,
            error_message: '',
            data: []
        }

    }
}
