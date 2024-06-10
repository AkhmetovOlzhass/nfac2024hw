
import { Product } from '@/app/interfaces/Product';
import { axiosQueryInstance, axiosQueryInstanceImg } from '../apiClient';


const useProductsService = () => {

    const getAllProducts = async (): Promise<Product[] | undefined> => {
        try {
            const response = await axiosQueryInstance.get(`products`);
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const uploadFileToServer  = async (files: File[], onProgress: (loaded: number, total: number) => void): Promise<string[]> => {
        const urls: string[] = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
        
            const response = await axiosQueryInstanceImg.post('upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const { loaded, total } = progressEvent;
                        onProgress(loaded, total);
                    }
                }
            });
            urls.push(response.data.location);
        }
        return urls;
    };
    const createNewProduct = async(product: Product): Promise<Product | undefined> => {
        try {
            const response = await axiosQueryInstance.post(`products`, product);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    


    return {getAllProducts, uploadFileToServer, createNewProduct  }
}

export default useProductsService;