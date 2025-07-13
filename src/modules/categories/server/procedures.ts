import { db } from "@/db";
import { categories } from "@/db/schema";
import { baseProcedure,createTRPCRouter } from "@/trpc/init";

//FUNCTION TO SELECT THE CATEGORIES FROM DB
export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
       const data = await db.select().from(categories) 

       return data
    }),
});