'use client'

import useBlogService from "@/app/services/BlogService";
import { useEffect, useState } from "react";
import { post } from "@/app/intefaces/Post";
import BlogItem from "../blogItem/blogItem";

const BlogList = () => {

    const {getAllPosts} = useBlogService();
    const [posts, setPosts] = useState<post[] | undefined>(undefined)

    useEffect(() => {
        const fetchPosts = async () => {
            const loadedPosts = await getAllPosts();
            if (loadedPosts) {
                setPosts(loadedPosts.posts);  
                console.log(loadedPosts.posts);
                
            }
        };

        fetchPosts();
    }, []);

    if(!posts) return null;

    return(
        <div>
            {posts.map(post => {
                return(
                    <BlogItem key={post.id} post={post}/>
                ) 
            })}
        </div>
    )
}

export default BlogList;