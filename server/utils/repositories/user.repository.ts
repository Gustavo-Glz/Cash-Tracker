export const UserRepository = {
  findUnique: (email: string) => prisma.user.findUnique({ where: { email } }),
  findByToken: (token: string) => prisma.user.findUnique({ where: { token } }),
  create: (data: User) => prisma.user.create({ data }),
  update: (id: string, data: Partial<User>) => prisma.user.update({ where: { id }, data })
}
