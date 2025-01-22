import useFetchData from "../hooks/useFetchData";
import { Product } from "../Interfaces/ProductInterface";
import { getWorkerProducts } from "../services/workerApi";
import ProductCard from "./ProductCard";
interface Props {
    workerID: string
}

function ProductsTab({ workerID }: Props) {
    const { data: productList, loading, error } = useFetchData<Product[]>({
        apiFunction: () => getWorkerProducts(workerID)
    });

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>ocurrio un error</p>;
    if (productList?.length === 0) return <p>No existen productos registrados por este trabajador</p>
    if (productList)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productList.map((product) => (
                    <div key={product.id}>
                        <ProductCard Product={product} />     
                    </div>
                ))}
            </div>

        )
}

export default ProductsTab