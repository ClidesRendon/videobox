"use client";

import Link from "next/link";
import { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const VideosSection = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error</p>}>
                <VideosSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    )
}

const VideosSectionSuspense = () => {
    const [ videos, query ] = trpc.studio.getMany.useSuspenseInfiniteQuery({
        limit: DEFAULT_LIMIT,
    },{
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })
    return (
        <div>
            <div className="border-y">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=" w-[450px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead >Views</TableHead>
                            <TableHead >Comments</TableHead>
                            <TableHead >Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.pages.flatMap((page) =>page.items).map((video) => (
                           <Link href={`/studio/videos/${video.id}`} key={video.id} legacyBehavior>
                            <TableRow className="cursor-pointer">
                                <TableCell>
                                    {video.title}
                                </TableCell>
                                <TableCell>
                                    Visibility
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                    Views
                                </TableCell>
                                <TableCell>
                                    Comments
                                </TableCell>
                                <TableCell>
                                    Likes
                                </TableCell>
                            </TableRow>
                           </Link> 
                        ))}
                    </TableBody>
                </Table>

            </div>
            
            <InfiniteScroll
                isManual
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
            />
        </div>
    )
}