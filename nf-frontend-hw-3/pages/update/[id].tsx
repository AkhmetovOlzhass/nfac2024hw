'use client'

import useBlogService from "@/app/services/BlogService";
import { usePathname } from "next/navigation";
import { useState } from "react";

const UpdatePost = () => {

    const pathname = usePathname();
    const id = pathname ? pathname.split('/').pop() : null;

    const [newTitle, setNewTitle] = useState('');
    const { updatePost } = useBlogService();

    const handleUpdate = async () => {
        try {
            if(id && newTitle){
                await updatePost(id, newTitle);
                alert("Success");
            }
        } catch (error) {
            console.log(error);
            
        }
    };
    
    return (
        <>
            <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Enter new title"
            />
            <button onClick={handleUpdate}>Update Post</button>
        </>
    )
}

export default UpdatePost