import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'


export async function POST(req:Request) {
    const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error("Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local")
    }

    //Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    //Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamps = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    //If there are no headers, error out
    if(!svix_id || !svix_timestamps || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    //Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    //Verify payload with headers
    try{
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamps,
            'svix-signature': svix_signature
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status:400,
        })
    }

    //Do something with payload
    
    const eventType = evt.type

    //IF TO DETECT USER CREATED
    if(eventType === "user.created"){
        const { data } = evt

        //AWAIT DATABASE RESPONSE FOR INSERTING USER VALUES
        await db.insert(users).values({
            clerkId: data.id,
            name: '${data.first_name} ${data.last_name}',
            imageUrl: data.image_url
        })
    }

    //IF TO DETECT USER DELETED
    if(eventType === "user.deleted"){
        const { data } = evt;

        //CHECK USER ID EXISTENCE
        if(!data.id){
            return new Response("Missing user id", {status: 400});
        }

        await db.delete(users).where(eq(users.clerkId, data.id));
    }

    //IF TO DETECT USER UPDATED
    if (eventType === "user.updated"){
        const { data} = evt
        await db
        .update(users)
        .set({
            name: '${data.first_name} ${data.last_name}',
            imageUrl: data.image_url
        })
        .where(eq(users.clerkId, data.id))
    }

    return new Response('Webhook received', {status: 200})
}