import { Button } from "@/components/ui/button"
import { UserCircle2Icon } from "lucide-react"

export const AuthButton = () => {
    //TODO: Add auth states
    
    return (
        <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium text-black  border-black rounded-full shadow-none []"
        >
            <UserCircle2Icon/>
            Sign In
        </Button>
    )
}