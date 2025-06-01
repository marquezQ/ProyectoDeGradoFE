import { Button, Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFetchData from "../../hooks/useFetchData";
import { Product } from "../../Interfaces/ProductInterface";
import { getWorkerProducts } from "../../services/workerApi";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import FormNewProduct from "./FormNewProduct";
interface Props {
    workerID: string
}

function ProductsTab({ workerID }: Props) {
    const [showNewP, setShowNewP] = useState(false);
    const closeShowP = () => setShowNewP(false);

    const { data: productList, loading, error, fetchData } = useFetchData<Product[]>({
        apiFunction: () => getWorkerProducts(workerID)
    });
    const { worker }=useAuthContext();

    const [root, setRoot] = useState(false);
    useEffect(() => {
        if (worker?.id.toString() === workerID) {
            setRoot(true);
        } else {
            setRoot(false);
        }
    }, [worker?.id, workerID]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>ocurrio un error</p>;
    if (productList)
        return (
            <>
            <div>
                {root &&
                    <div className="flex justify-end mb-4">
                        <Button variant="contained" onClick={()=>setShowNewP(true)}>+ Nuevo Producto</Button>
                    </div>
                }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {productList.length>0?
                    productList.map((product) => (
                        <div key={product.id}>
                            <ProductCard Product={product} edit={root} reload={fetchData}/>     
                        </div>
            
                )):
                    <Typography className="col-span-full">No existen productos registrados por este trabajador</Typography>
                }
            </div>
                <Dialog maxWidth="sm" fullWidth open={showNewP} onClose={closeShowP}>
                    <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                        Nuevo Producto
                        <IconButton onClick={closeShowP}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    
                    <FormNewProduct workerID={workerID} fetchProducts={fetchData} closeForm={closeShowP}/>

                </Dialog>
            </>
        )
}

export default ProductsTab