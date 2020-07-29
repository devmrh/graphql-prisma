import { objectType } from '@nexus/schema';

export const Post = objectType({
  name: "Post",
  definition(t){
    t.model.id(),
    t.model.image(),
    t.model.title(),
    t.model.slug(),
    t.model.body(),
    t.model.publish(),
    t.model.user_id()
  }
})