import Link from 'next/link';
import data from '../../../public/data.json';
import Head from "next/head";

export default function Blog() {


    return (


        <div className="container mx-auto p-4 min-h-screen ">
            <Head>
                <title>Blog Posts | My Blog</title>
                <meta name="description" content="List of blog posts"/>
                <meta name="keywords" content="blog, posts, articles"/>
                <meta name="author" content="Your Name"/>
            </Head>
            <h1 className="text-3xl font-bold mb-4 text-black">Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map(post => (
                    <div key={post.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link href={`/blog/${encodeURIComponent(post.slug)}`}
                              className="text-xl font-semibold text-blue-500 hover:underline">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                        </Link>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.author}</p>
                        <Link href={`/blog/${encodeURIComponent(post.slug)}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}