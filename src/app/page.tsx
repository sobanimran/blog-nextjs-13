import Image from "next/image";
import { client } from "./lib/sanity";
import { Post } from "./lib/interface";
import Link from "next/link";

async function getDate() {
  const query = `*[_type == "post"]`;

  const data = await client.fetch(query);
  return data;
}

export default async function IndexHome() {
  const data = (await getDate()) as Post[];
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
        <h1
          className="text-3xl font-extrabold leading-9 tracking-tight
                     text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 
                      md:text-6xl md:leading-14"
        >
          All Posts
        </h1>
      </div>
      <ul>
        {data.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 ">
              <div>
                <p className="text-base font-medium leading-6 text-teal-500">
                  {new Date(post._createdAt).toISOString().split("T")[0]}
                </p>
              </div>
              <Link
                href={`/post/${post.slug.current}`}
                prefetch
                className="space-y-3 xl:col-span-3"
              >
                <div>
                  <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100"></h3>
                  {post.title}
                </div>
                <p className="prose line-clamp-2 mx-w-none text-gray-500 dark:text-gary-400"> {post.overview} </p>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
