import { getAllCategories } from "@/features/categories/services/getAllCategories";
import { IconArrowRightDashed } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomeCategories() {
  const categories = await getAllCategories();

  return (
    <>
      <section className="my-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
            <h2 className="relative flex items-center gap-3 text-2xl font-bold before:block before:h-10 before:w-1 before:bg-primary-600 before:content-['']">
              <span>Shop by</span>
              <span className="text-primary-600 font-bold">Category</span>
            </h2>
            <Link
              href={"/categories"}
              className="text-primary-600 hover:text-primary-700 flex items-center gap-3 transition-colors duration-200"
            >
              <span>View All Categories</span>
              <IconArrowRightDashed stroke={2} />
            </Link>
          </div>

          <div className="grid gap-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categories.data.map((category) => {
              return (
                <Link
                  href={`/category/${category._id}`}
                  key={category._id}
                  className="card flex cursor-pointer flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-contain"
                  />
                  <h3>{category.name}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
