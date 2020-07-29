import { mutationField, stringArg } from "@nexus/schema";
import { errors } from '../../utils/errors';
import { compare, hash } from 'bcrypt'

import { tokens, APP_SECRET } from '../../utils/constants';
import { generateAccessToken } from "../../utils/helper";

export const signup = mutationField('signup', {
  // ts ignore
  type: 'AuthPayload',
  args: {
    name: stringArg({nullable: false}),
    password: stringArg({nullable: false}),
    email: stringArg({nullable: false}),
  },
  resolve: async (_parent, { name, password, email }, ctx) => {

    try {
      const hashedPassword = await hash(password, 10)

      const user = await ctx.prisma.user.create({
        data: {
          name,
          password: hashedPassword,
          email
        }
      });

      const accessToken  = generateAccessToken(user.id);

      return {accessToken ,user};

    } catch (e) {
      console.log(e);
      throw errors.usersAlreadyExists;
    }


  }
});



export const login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  resolve: async (_parent, { email, password }, ctx) => {
    let user = null
    try {
      user = await ctx.prisma.user.findOne({
        where: {
          email,
        },
      })
    } catch (e) {
      console.log(e);
      throw errors.invalidUser;
    }

    if (!user) throw errors.invalidUser;

    const passwordValid = await compare(password, user.password)
    if (!passwordValid) throw errors.invalidUser;

    const accessToken = generateAccessToken(user.id)
    return {
      accessToken,
      user,
    }
  },
})


// export const login = mutationField('login', {
//   type: 'AuthPayload',
//   args: {
//     email: stringArg({ required: true }),
//     password: stringArg({ required: true })
//   },
//   resolve: async (_parent, { email, password }, ctx) => {
//     let user = null;
//     try {
//         user = await ctx.prisma.user.findOne({
//           where: {
//             email,
//           }
//         })
//     } catch (error) {
//       console.log(error);
//       throw errors.invalidUser;
//     }

//     if(!user){
//       throw errors.invalidUser
//     }
//     const passwordValid = await compare(password, user.password);
//     if(!passwordValid) throw errors.invalidUser;

//     const accessToken = generateAccessToken(user.id);
//     return {
//       accessToken,
//       user
//     }

//   }
// });