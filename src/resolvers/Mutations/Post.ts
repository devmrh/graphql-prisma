import { idArg, stringArg, mutationField } from '@nexus/schema';
import { errors } from '../../utils/errors';
import {slugify} from '../../utils/helper';


export const createPost = mutationField('createPost', {
  type: 'Post',
  args: {
    title: stringArg(),
    body: stringArg({ nullable: true }),
    image: stringArg({ nullable:  true }),
    slug: stringArg({ nullable: true })

  },
  resolve: async (_parent, { title, body, image, slug }, ctx) => {
    try {
      const newPost = await ctx.prisma.post.create({
        data: {
          title,
          body,
          image,
          slug: slugify(title),
          publish: false,
          User: {
            connect: { id: ctx.userId }
          }
        }
      })

    ctx.pubsub.publish('latestPost', newPost);
    return newPost;
    } catch (error) {
      console.log(error);
    }


  }

})