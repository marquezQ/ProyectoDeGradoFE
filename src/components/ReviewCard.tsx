import { Button, Rating } from "@mui/material"

function ReviewCard() {
    return (
        <div className='bg-white shadow-lg border p-6 flex flex-col sm:flex-row sm:justify-between items-start'>

            <div className='flex sm:items-start sm:m-0 m-auto min-w-16'>
                <img
                    src={"https://cdn-icons-png.flaticon.com/512/3135/3135768.png"}
                    alt={"probando"}
                    className="w-14 h-14 rounded-full object-cover"

                />
            </div>

            <div className='flex flex-col'>
                <div className='flex sm:justify-between items-center flex-col sm:flex-row w-full'>
                    <h3 className="text-lg font-semibold">Juanito Perez</h3>
                    <div className="bg-[#654b43] text-white pl-2 rounded-full text-sm font-semibold flex items-center">
                        <span>{4.2}</span>
                        <Rating
                            value={4.2}
                            precision={0.1}
                            readOnly
                            classes={{
                                iconFilled: 'text-yellow ',
                            }}
                        />
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row w-full'>
                    <div className='w-full sm:w-1/2'>
                        <p className="text-sm text-gray-700">Puntualidad: <Rating value={4.1} readOnly size="small" /></p>
                        <p className="text-sm text-gray-700">Comunicación: <Rating value={3.0} readOnly size="small" /></p>
                    </div>
                    <div className='w-full sm:w-1/2'>
                        <p className="text-sm text-gray-700">Calidad: <Rating value={4.0} readOnly size="small" /></p>
                        <p className="text-sm text-gray-700">Precio: <Rating value={4.2} readOnly size="small" /></p>
                    </div>
                </div>

                <div className='flex w-full'>
                    <p className="text-sm text-gray-800 mt-2 line-clamp-3">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum. </p>
                </div>

                <div className='flex flex-col sm:flex-row w-full sm:justify-between items-center sm:gap-0 gap-2'>
                    <p className="text-green-600 font-semibold mt-1 ">¡Lo recomienda!</p>
                    <Button variant='contained' className='m-auto w-28'>
                        Ver detalle
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard