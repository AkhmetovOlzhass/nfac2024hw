'use client'

import useProductsService from "@/app/api/services/productsService";
import { Product } from "@/app/interfaces/Product";
import { FormEvent, useState, ChangeEvent, useEffect } from "react";
import { useMutation, useQueryClient } from 'react-query';

const ProductCreate = () => {
    const [progress, setProgress] = useState(0);
    const [imageUploaded, setImageUploaded] = useState(false)
    const {uploadFileToServer, createNewProduct}  = useProductsService();
    

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        images: [] as string[],
    });


    const queryClient = useQueryClient();

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setProgress(0)
        setImageUploaded(false)
        if (files.length > 0) {
            try {
                const locations = await uploadFileToServer(files, (loaded, total) => {
                    const percentage = Math.floor((loaded / total) * 100);
                    setProgress(percentage);
                });
                
                setFormData({
                    ...formData,
                    images: locations
                });
                setProgress(100)

                alert("Your images: " + locations);
                

                setImageUploaded(true)
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const mutation = useMutation(createNewProduct, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('products');
            console.log('Product created:', data);  
        },
        onError: (error) => {
            console.error('Error creating product:', error);
        }
    });

    const createProduct = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if(imageUploaded){
            mutation.mutate(formData);

            alert("Product Created! Check console!")
        } else{
            alert("Изображение еще не загрузилось")
        }
        
    }


    return (
<form onSubmit={createProduct} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6">Опишите в подробностях</h2>
    <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Укажите название*
        </label>
        <input 
            id="title"
            required 
            placeholder="Например, iPhone 11 с гарантией" 
            type="text" 
            name="title" 
            onChange={handleChange} 
            value={formData.title} 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <p className="text-gray-500 text-xs mt-1">Введите не менее 16 символов</p>
    </div>
    <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Цена*
        </label>
        <input 
            id="price"
            required 
            placeholder="1" 
            type="text" 
            name="price" 
            onChange={handleChange} 
            value={formData.price} 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Категория*
        </label>
        <input 
            id="category"
            required 
            placeholder="Выберите категорию" 
            type="text" 
            name="category" 
            onChange={handleChange} 
            value={formData.category} 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Описание*
        </label>
        <textarea 
            id="description"
            required 
            placeholder="Введите описание" 
            name="description" 
            onChange={handleChange} 
            value={formData.description} 
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            Загрузить изображения*
        </label>
        <input 
            id="file"
            required 
            type="file" 
            onChange={uploadFile} 
            multiple 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
    </div>
    <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        <p className="text-gray-500 text-xs mt-1">{progress}%</p>
    </div>
    <button 
        type="submit" 
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
        Отправить
    </button>
</form>
    )
}

export default ProductCreate;

