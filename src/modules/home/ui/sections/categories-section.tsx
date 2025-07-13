"use client"

import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";

interface CategoriesSectionProps {
    categoryId?: string;
};

export const CategoriesSection = ({categoryId}: CategoriesSectionProps) => {
    return (
        <Suspense fallback={<FilterCarousel isloading data={[]} onSelect={() => {}} />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSuspense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

export const CategoriesSectionSuspense = ({categoryId}: CategoriesSectionProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery();
    const data = categories.map((category) =>({
        value: category.id,
        label: category.name
    }))

    return <FilterCarousel onSelect={(x) => console.log(x)}  value={categoryId} data={data} />
}