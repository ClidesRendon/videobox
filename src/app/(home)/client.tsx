"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
    const [data] = trpc.hello.useSuspenseQuery({
        text: "Clides"
    });
    return (
        <div>
            Page client dise: {data.greeting}
        </div>
    )
}