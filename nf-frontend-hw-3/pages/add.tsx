'use client'

import { useEffect, useState } from "react";
import useBlogService from "@/app/services/BlogService";

const AddPostEl = () => {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');

    const {addPost, getUser} = useBlogService();

    useEffect(() => {
        const fetchUser = async () => {
            let loadedUser;
            loadedUser = await getUser();
            if (loadedUser) {
                setUserId(loadedUser.id.toString());  
            }
        };

        fetchUser();
    }, [])



    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
        try {
            if(title){
                const newPost = await addPost({
                    title,
                    userId: userId
                });
                alert('Post added successfully!');
                console.log('New Post:', newPost);
            }
        } catch (error) {
            alert('Failed to add the post.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
            />
            {/* <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
            /> */}
            <button type="submit">Add Post</button>
        </form>
    );
}

export default AddPostEl;