import { queryField, idArg, intArg } from '@nexus/schema';

export const me = queryField('me',{
  type: 'User',
  resolve(_parent, _args, ctx){
    return ctx.prisma.user.findOne({
      where: {
        id: ctx.userId
      }
    })
  }
})

export const user = queryField('getUser', {
  type: 'User',
  nullable: true,
  args: { id: intArg() },
  resolve: (_parent, { id }, ctx) => {
    return ctx.prisma.user.findOne({
      where: {
        id,
      },
    })
  },
})
