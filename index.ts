import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query'],
});

async function main() {
 const users = await prisma.user.findMany({
   select: {id: true}
 });
  console.log(users);

  // const users = await prisma.user.create({
  //   data: {
  //     name: "ali",
  //   },
  // });
  // console.log(users);

  // const user = await prisma.user.findOne({
  //   where: {id: 1}
  // })

  // console.log(user);

  // const user = await prisma.user.update({
  //   where: {id: 1},
  //   data: {
  //     name: "mamad"
  //   }
  // })
  // console.log(user);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
