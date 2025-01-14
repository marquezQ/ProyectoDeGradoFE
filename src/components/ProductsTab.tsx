import { Typography } from "@mui/material"

function ProductsTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col border rounded-lg bg-white h-auto xl:h-72">
            <img 
                src="https://www.deurope.com.mx/cdn/shop/products/00_e110bd36-5278-40a4-9fd3-b39ac5dca410.jpg?v=1587946475" 
                alt=""
                className="w-full object-cover h-4/5"
            />
            <div className="flex flex-col pl-5">
                <div className="flex flex-col lg:flex-row justify-between pr-2">
                    <Typography variant="h6" color="primary">Titulo del producto </Typography> 
                    <Typography variant="body2" color="primary" className="lg:pt-2 font-bold">stock: 4</Typography>                  
                </div>
                <div>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem', paddingBottom:"1rem"}}>Bs.- 1500</Typography>
                    
                </div>
            </div>
        </div>

        <div className="flex flex-col border rounded-lg bg-white h-auto xl:h-72">
            <img 
                src="https://www.deurope.com.mx/cdn/shop/products/00_e110bd36-5278-40a4-9fd3-b39ac5dca410.jpg?v=1587946475" 
                alt=""
                className="w-full object-cover h-4/5"
            />
            <div className="flex flex-col pl-5">
                <div className="flex flex-col lg:flex-row justify-between pr-2">
                    <Typography variant="h6" color="primary">Titulo del producto </Typography> 
                    <Typography variant="body2" color="primary" className="lg:pt-2 font-bold">stock: 4</Typography>                  
                </div>
                <div>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem', paddingBottom:"1rem"}}>Bs.- 1500</Typography>
                    
                </div>
            </div>
        </div><div className="flex flex-col border rounded-lg bg-white h-auto xl:h-72">
            <img 
                src="https://www.deurope.com.mx/cdn/shop/products/00_e110bd36-5278-40a4-9fd3-b39ac5dca410.jpg?v=1587946475" 
                alt=""
                className="w-full object-cover h-4/5"
            />
            <div className="flex flex-col pl-5">
                <div className="flex flex-col lg:flex-row justify-between pr-2">
                    <Typography variant="h6" color="primary">Titulo del producto </Typography> 
                    <Typography variant="body2" color="primary" className="lg:pt-2 font-bold">stock: 4</Typography>                  
                </div>
                <div>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem', paddingBottom:"1rem"}}>Bs.- 1500</Typography>
                    
                </div>
            </div>
        </div>

        
        
    </div>
  )
}

export default ProductsTab