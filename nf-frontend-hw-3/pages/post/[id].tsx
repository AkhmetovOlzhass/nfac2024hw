'use client';

import Image from 'next/image';
import { post } from '@/app/intefaces/Post';
import useBlogService from '@/app/services/BlogService';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import arrowImage from '../../app/assets/img/arrow.svg';
import likeImage from '../../app/assets/img/like.svg';
import disLikeImage from '../../app/assets/img/dislike.svg';
import LogoutBtn from '@/app/components/logoutBtn';

const PostPage = () => {
    const pathname = usePathname();
    console.log(pathname);
    const router = useRouter();
    const {getPostById} = useBlogService();
    const [postEl, setPost] = useState<post | null>(null);

    useEffect(() => {

        const fetchPost = async () => {
            const postId = pathname?.split('/').pop();
            if (postId) {
                const loadedPost = await getPostById(postId);
                if(loadedPost) setPost(loadedPost);
            }
        };

        if(pathname){
            fetchPost();
        }
    }, [pathname]);

    if (!postEl) return <div>Loading...</div>;

    return (
        <>
            <div className="flex items-center justify-between">
                <div onClick={() => router.back()} className=" w-12 py-8 cursor-pointer">
                    <Image
                        src={arrowImage}
                        alt="arrow"
                        width={24}
                        height={24}
                        layout="responsive"
                    />
                </div>

                <LogoutBtn/>
            </div>

            
            <div className=" py-24">
                <div className="flex justify-between items-start mb-16">
                    <div className="flex gap-1 items-center">
                        <div className=" overflow-hidden w-16 h-16 bg-slate-500 rounded-full mr-4">
                            <img src="" className="w-full h-full" alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className='font-bold'>User {postEl.userId}</p>
                            <p className=' text-xs text-slate-500'>Views {postEl.views} </p>
                        </div>
                    </div>
                </div>

                <h1 className=' font-black text-4xl mb-6'>
                    {postEl.title}
                </h1>
                <p className=' text-2xl'> {postEl.body} </p>

                <div className="flex items-center gap-6 mt-12">
                    <div className="flex items-center gap-2">
                        <div className=" w-8">
                            <Image
                                src={likeImage}
                                alt="arrow"
                                width={36}
                                height={36}
                                layout="responsive"
                            />
                        </div>
                        <p className=' text-[#B7B7B7] text-lg'> {postEl.reactions.likes} </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className=" w-8">
                            <Image
                                src={disLikeImage}
                                alt="arrow"
                                width={36}
                                height={36}
                                layout="responsive"
                            />
                        </div>
                        <p className=' text-[#B7B7B7] text-lg'> {postEl.reactions.dislikes} </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostPage;