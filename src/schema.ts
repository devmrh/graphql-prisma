import { makeSchema } from "@nexus/schema";
import { join } from "path";
import * as allTypes from "./resolvers";

import { Context } from './types';

import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'


const nexusPrisma = nexusSchemaPrisma({
  experimentalCRUD: true,
  paginationStrategy: 'prisma',
  prismaClient: (ctx: Context) => ctx.prisma,
})


export const schema = makeSchema({
  types: [allTypes],
  plugins: [nexusPrisma],
  outputs: {
    typegen: join(__dirname, "generated", "index.d.ts"),
    schema: join(__dirname, "generated", "schema.graphql"),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: join(__dirname, "types.ts"),
        alias: "ctx",
      },
    ],
    contextType: "ctx.Context",
  },
});
