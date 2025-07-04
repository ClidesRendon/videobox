"use client"


import { Button } from "@/components/ui/button"
import { UserButton, SignInButton,SignedIn, SignedOut } from "@clerk/nextjs"
import { UserCircle2Icon } from "lucide-react"

export const AuthButton = () => {
    
    
    return (
        <>

        <SignedIn>
            <UserButton />
            {/* ADD MENU ITEMS FOR STUDIO AND USER PROFILE*/ }
        </SignedIn>
        <SignedOut>
            <SignInButton mode="modal" >
                <Button
                    variant="outline"
                    className="px-4 py-2 text-sm font-medium text-black  border-black rounded-full shadow-none []"
                >
                    <UserCircle2Icon/>
                    Sign In
                </Button>
        </SignInButton>
        </SignedOut>
        </>
    )
}