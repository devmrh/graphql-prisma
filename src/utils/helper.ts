
import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server-express'
import { Context,Token } from '../types'

import { sign, verify } from 'jsonwebtoken';
import { APP_SECRET, tokens } from './constants';
import { user } from '../resolvers/Queries/User';

//import  slugify  from 'slugify';



export const slugify = (string:any) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c:any) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
   // .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}


export const generateAccessToken = (userId: number) => {
  const accessToken = sign(
    {
      userId,
      type: tokens.access.name,
      timestamp: Date.now
    },
    APP_SECRET,
    {
      expiresIn: tokens.access.expiry
    }
  )
  return accessToken;
}

export const prisma = new PrismaClient()
const pubsub = new PubSub()

export const createContext = (ctx: any): Context => {
  let userId: number
  try {
      let Authorization = ''

      try {
        Authorization = ctx.req.get('Authorization')
      } catch (error) {
        Authorization = ctx?.connection?.context?.Authorization
      }

      const token = Authorization.replace('Bearer ', '')
      const verifiedToken = verify(token, APP_SECRET) as Token

      if (!verifiedToken.userId && verifiedToken.type !== tokens.access.name) {
        userId = -1;
      }else{
        userId = verifiedToken.userId
      }

  } catch (error) {
    console.log(error);
    userId = -1;
  }

  return {
    ...ctx,
    prisma,
    pubsub,
    userId,
  }
}
