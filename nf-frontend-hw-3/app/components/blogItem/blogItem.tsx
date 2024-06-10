import { post } from "@/app/intefaces/Post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useBlogService from "@/app/services/BlogService";

interface BlogItemProps {
    post: post;  
}

const BlogItem: React.FC<BlogItemProps> = ({ post }) => {
    const router = useRouter();

    const {deletePost} = useBlogService();

    const goToUpdatePage = () => {
        router.push(`/update/${post.id}`);
    };

    const handleDelete = async () => {
        try {
            const deletedPost = await deletePost(post.id.toString());
            alert('Post deleted successfully!');
            console.log('Deleted Post:', deletedPost);
        } catch (error) {
            alert('Failed to delete the post.');
        }
    };

    return (
        <div className="flex align-top justify-between mt-11 pb-11 border-b-slate-300 border-b"> 
            <div className=" w-3/4 flex flex-col justify-between pr-24">
                <div className="flex gap-1">
                    <div className=" overflow-hidden w-6 h-6 bg-slate-500 rounded-full">
                        <img src="" className="w-full h-full" alt="" />
                    </div>
                    <h4 className=" font-bold">User {post.userId} ·</h4> <h4> {post.views} views </h4>
                </div>
                <div>
                <Link key={post.id} href={`/post/${post.id}`}><h2 className=" font-bold text-3xl mb-6">{post.title} </h2></Link>
                    <p className=" text-base pr-16 text-wrap">{post.body} </p>
                </div>

                <div className="flex items-center justify-between mt-12">
                    <div className="flex gap-2 items-center">
                        {post.tags.map(tag => {
                            return (<span key={tag} className='bg-[#e5e5e5] flex align-middle justify-center py-1 px-4 rounded-full font-bold'>{tag}</span>)
                        })}
                    </div>

                    <div className=" flex items-center gap-4">
                        <button className=" bg-slate-700 rounded-2xl p-2 text-slate-100" onClick={goToUpdatePage} >Update</button>
                        <button className=" bg-slate-700 rounded-2xl p-2 text-slate-100" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
            <img className=" w-1/5" src="https://via.placeholder.com/150" alt="img" />
        </div>
    );
}

export default BlogItem