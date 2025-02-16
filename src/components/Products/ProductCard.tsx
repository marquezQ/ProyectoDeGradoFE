import { Typography } from "@mui/material"
import { Product } from "../../Interfaces/ProductInterface"

interface Props{
    Product: Product
}

function ProductCard({Product}: Props) {
    return (
        <div className="bg-white flex flex-col shadow-lg border">
            <img
                src={Product.image}
                alt=""
                className="w-full h-72 object-cover"
            />
            <div className="flex flex-col pl-5">
                <div className="flex flex-col lg:flex-row justify-between pr-2">
                    <Typography variant="h6" color="primary">{Product.name}</Typography>
                    <Typography variant="body2" color="primary" className="lg:pt-2 font-bold">stock: {Product.stock}</Typography>
                </div>
                <div>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem', paddingBottom: "1rem" }}>Bs.- {Product.price}</Typography>
                </div>
            </div>
        </div>
    )
}

export default ProductCard