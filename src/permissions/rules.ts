import { rule } from "graphql-shield";
import { Context } from "../types";
import { errors } from "../utils/errors";

export const rules = {
  isAuthenticatedUser: rule()((_parent, _args, ctx: Context) => {
    try {
      if (ctx.userId === -1) {
        return errors.notAuthenticated;
      }
      return true;
    } catch (error) {
      return error;
    }
  }),
  isPostOwner: rule()(async (_parent, { id }, ctx: Context) => {
    try {
      const author = await ctx.prisma.post
        .findOne({
          where: { id },
        })
        .User();

      return ctx.userId === author.id;
    } catch (error) {
      return error;
    }
  }),
};
