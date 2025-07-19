import { db } from "@/db";
import { videos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";


export const videosRouter = createTRPCRouter({
    create: protectedProcedure.mutation(async ({ctx}) => {
        //AS IS A PROTECTED PROCEDURE, WILL GET THE CONTEXT OF THE USER ID
        const { id: userId } = ctx.user;

        const video  = await db
        .insert(videos)
        .values({
            userId,
            title: "Untitled"
        })
        .returning();

        return {
            video: video
        };
    })
});