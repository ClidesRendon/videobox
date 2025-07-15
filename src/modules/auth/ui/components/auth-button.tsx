"use client"


import { Button } from "@/components/ui/button"
import { UserButton, SignInButton,SignedIn, SignedOut } from "@clerk/nextjs"
import { ClapperboardIcon, UserCircle2Icon } from "lucide-react"

export const AuthButton = () => {
    
    
    return (
        <>

        <SignedIn>
            {/* ADD MENU ITEMS FOR USER PROFILE*/ }
            <UserButton> 
                <UserButton.MenuItems>
                    <UserButton.Link
                        label="Studio"
                        href="/studio"
                        labelIcon={<ClapperboardIcon className="size-4"/>}
                    />
                    
                </UserButton.MenuItems>
            </UserButton>
            
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