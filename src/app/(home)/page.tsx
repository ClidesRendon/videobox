
import { HomeView } from "@/modules/home/ui/views/home-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>
}

const Page = async ({ searchParams}: PageProps) => {
  const { categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch()

  return (
    <HydrateClient>
      
      {/*THIS CONNECTS TO SRC/MODULES/HOME/UI/VIEWS/HOME-VIEW.TSX*/}
      <HomeView categoryId={categoryId} />

    </HydrateClient>
  );
  };

  export default Page;
