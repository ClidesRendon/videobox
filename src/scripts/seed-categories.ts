//TODO: Create a script to seed database
import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
    "Blogs",
    "Comedy",
    "Education",
    "Gaming",
    "Entertainment",
    "Film and Animation",
    "How-to",
    "Music",
    "News",
    "Politics",
    "Pets and Animals",
    "Science and Technology",
    "Sports",
    "Travel and Events",
    "Vehicles",
];

async function main() {
    console.log("Seeding categories...")

    try {
      const  values = categoryNames.map((name) => ({
        name,
        description: `Videos related to: ${name.toLowerCase()}`,

      }));
      await db.insert(categories).values(values)
        console.log("Categories seeded successfully")
    } catch (error) {
        console.error("Error seeding categories: ", error)
        process.exit(1); 
    }
}

main();