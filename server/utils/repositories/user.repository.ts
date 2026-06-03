import type { User } from '../schemas/user.schema'

export const UserRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findUnique: (email: string) => prisma.user.findUnique({ where: { email } }),
  findByToken: (token: string) => prisma.user.findFirst({ where: { token } }),
  create: (data: User) => prisma.user.create({ data }),
  update: (id: string, data: Partial<User>) => prisma.user.update({ where: { id }, data })
}
