import { ProductProps } from "../interfaces/Product"

const ProductComponent: React.FC<ProductProps> = ({productProp }) => {
    return(
        <div className=" w-[24%] bg-white mb-[1%] p-5 rounded-md flex flex-col justify-between">
            <div className=" w-full h-[225px] overflow-hidden flex justify-center pb-5">
                <img src={productProp.image} className=" h-full" alt="" />
            </div>
            <div className=" p-3 flex justify-between flex-col">
                <div>
                    <h3 className=" text-xl">{productProp.title} </h3>
                    <h4 className=" font-bold text-2xl mb-5">{productProp.price}$ </h4>
                </div>
                <span>{productProp.category}</span>
            </div>
        </div>
    )
}

export default ProductComponent