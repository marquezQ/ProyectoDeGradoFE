import { Avatar, Button, Dialog, DialogTitle, IconButton, Rating } from "@mui/material"
import { Review } from "../../Interfaces/ReviewInterface"
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
interface Props {
    review: Review
}
function ReviewCard({review}: Props) {
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => setOpenModal(false);
    return (
        <div className='bg-white shadow-lg border rounded-lg p-3 md:p-6 flex flex-col sm:flex-row sm:justify-between items-start max-w-6xl mx-auto'>

            <div className='flex sm:items-start sm:m-0 m-auto min-w-16'>
                {/* <img
                    src={"https://cdn-icons-png.flaticon.com/512/3135/3135768.png"}
                    alt={"probando"}
                    className="w-14 h-14 rounded-full object-cover"

                /> */}
                <Avatar
                    src={review.contrato.user.profile_picture}
                    alt=""
                    sx={{width:"3.5rem", height:"3.5rem", objectFit:"cover"}}
                />
            </div>

            <div className='flex flex-col w-full'>
                <div className='flex sm:justify-between items-center flex-col sm:flex-row w-full'>
                    <h3 className="text-lg font-semibold">{review.contrato.user.name+" "+review.contrato.user.lastname}</h3>
                    <div className="bg-[#654b43] text-white pl-2 rounded-full text-sm font-semibold flex items-center">
                        <span>{review.calificacion.final}</span>
                        <Rating
                            value={review.calificacion.final}
                            precision={0.1}
                            readOnly
                            classes={{
                                iconFilled: 'text-yellow ',
                            }}
                        />
                    </div>
                </div>

                {/* <div className='flex flex-col sm:flex-row w-full'>
                    <div className='w-full sm:w-1/2'>
                        <p className="text-sm text-gray-700">Puntualidad: <Rating value={review.calificacion.time} readOnly size="small" /></p>
                        <p className="text-sm text-gray-700">Comunicación: <Rating value={review.calificacion.communication} readOnly size="small" /></p>
                    </div>
                    <div className='w-full sm:w-1/2'>
                        <p className="text-sm text-gray-700">Calidad: <Rating value={review.calificacion.quality} readOnly size="small" /></p>
                        <p className="text-sm text-gray-700">Precio: <Rating value={review.calificacion.price} readOnly size="small" /></p>
                    </div>
                </div> */}

                <div className='flex w-full justify-center sm:justify-start'>
                    <p className="text-sm text-gray-800 mt-2 line-clamp-3">{review.comment}</p>
                </div>

                <div className='flex flex-col sm:flex-row w-full sm:justify-between items-center sm:gap-0 gap-2'>
                    {review.recommend?
                    <p className="text-green-600 font-semibold mt-1 ">¡Lo recomienda!</p>
                    :
                    <p className="text-red-600 font-semibold mt-1 ">No lo recomienda</p>
                    }
                    <Button onClick={()=>setOpenModal(true)} variant='contained' className='m-auto w-28'>
                        Ver detalle
                    </Button>
                </div>
            </div>
            <Dialog maxWidth="lg" fullWidth open={openModal} onClose={closeModal}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                    Detalle de reseña
                    <IconButton onClick={closeModal}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                //aqui
            </Dialog>
        </div>
    )
}

export default ReviewCard