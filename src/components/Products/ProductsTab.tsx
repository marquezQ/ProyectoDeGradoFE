import { Button } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetchData from "../../hooks/useFetchData";
import { Product } from "../../Interfaces/ProductInterface";
import { getWorkerProducts } from "../../services/workerApi";
import ProductCard from "./ProductCard";
interface Props {
    workerID: string
}

function ProductsTab({ workerID }: Props) {
    const { data: productList, loading, error } = useFetchData<Product[]>({
        apiFunction: () => getWorkerProducts(workerID)
    });
    const { worker }=useAuthContext();

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>ocurrio un error</p>;
    if (productList)
        return (
            <>
            <div>
                {worker?.id.toString() === workerID?
                    <div className="flex justify-end mb-4">
                        <Button variant="contained">+ Nuevo Producto</Button>
                    </div>
                    :
                    null
                }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {productList.length>0?
                    productList.map((product) => (
                        <div key={product.id}>
                            <ProductCard Product={product} />     
                        </div>
            
                )):
                    <p className="col-span-full">No existen productos registrados por este trabajador</p>
                }
            </div>
            
            </>
        )
}

export default ProductsTab