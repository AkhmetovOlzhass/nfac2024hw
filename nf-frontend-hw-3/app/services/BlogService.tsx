
import { posts, post } from '../intefaces/Post';
import api from './api';

const useBlogService = () => {

    const getAllPosts = async (): Promise<posts | undefined> => {
        try {
            const response = await api.get(`posts`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getPostById = async(id: string): Promise<post | undefined> => {
        try {
            const response = await api.get(`post/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const updatePost = async (postId: string, newTitle: string) => {
        try {
            const response = await api.put(`posts/${postId}`, {
                title: newTitle
            });

            console.log(response.data);
            return response.data;
        } catch (error) {
          console.error('Error updating post:', error);
          throw error;
        }
      };

    const deletePost = async (postId: string) => {
        try {
            const response = await api.delete(`posts/${postId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    };

    const addPost = async (postData: {title: string, userId: string}) => {
        try {
            const response = await api.post('posts/add', postData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding post:', error);
            throw error;
        }
    };

    const getUser = async(): Promise<post | undefined> => {
        try {
            const response = await api.get(`user/me`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return {getAllPosts, getPostById, updatePost, deletePost, addPost, getUser  }
}

export default useBlogService;