import { Avatar, Button, Dialog, DialogTitle, IconButton, Rating } from "@mui/material"
import { Review } from "../../Interfaces/ReviewInterface"
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import DetailsReview from "./DetailsReview";
interface Props {
    review: Review
    profile?: boolean
}

function ReviewCard({review, profile}: Props) {
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () => setOpenModal(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-BO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className='bg-white shadow-lg border rounded-lg p-3 md:p-6 flex flex-col sm:flex-row sm:justify-between items-start max-w-6xl mx-auto'>

            <div className='flex sm:items-start sm:m-0 m-auto min-w-16'>
                {/* <img
                    src={"https://cdn-icons-png.flaticon.com/512/3135/3135768.png"}
                    alt={"probando"}
                    className="w-14 h-14 rounded-full object-cover"

                /> */}
                <Avatar
                    src={profile?review.contrato.trabajador.user.profile_picture:review.contrato.user.profile_picture}
                    alt=""
                    sx={{width:"3.5rem", height:"3.5rem", objectFit:"cover"}}
                />
            </div>

            <div className='flex flex-col w-full'>
                <div className='flex sm:justify-between items-center flex-col sm:flex-row w-full'>
                    <div>
                        <h3 className="text-lg font-semibold text-center sm:text-start">
                            {profile?review.contrato.trabajador.user.name+" "+review.contrato.trabajador.user.lastname
                            :review.contrato.user.name + " " + review.contrato.user.lastname}
                        </h3>
                        <p className="text-sm text-gray-500">Reseña realizada el {formatDate(review.created_at)}</p>
                    </div>
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
            <Dialog maxWidth="md" fullWidth open={openModal} onClose={closeModal} 
            sx={{
                '& .MuiDialog-paper': {
                  margin: { xs: 0, sm: '32px' }, // Sin margen en móvil, 32px en desktop
                  maxHeight: { xs: '100vh', sm: '95vh' }, // Altura completa en móvil
                  width: { xs: '100%', sm: 'auto' }, // Ancho completo en móvil
                  borderRadius: { xs: 0, sm: '4px' }, // Sin bordes redondeados en móvil
                  overflowY: 'auto'
                }
              }}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom:0 }}>
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar src={review.contrato.user.profile_picture || undefined} alt={review.contrato.user.name}
                                sx={{width:"3.5rem", height:"3.5rem", objectFit:"cover"}}
                        />
                        <div>
                            <p className="text-lg font-semibold text-gray-800">{review.contrato.user.name+" "+review.contrato.user.lastname}</p>
                            {review.recommend && (
                                <p className="text-sm text-green-600 font-semibold">¡Lo recomienda!</p>
                            )}
                        </div>
                    </div>
                    <IconButton onClick={closeModal} sx={{position:"absolute", top:10, right:10}}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DetailsReview review={review}/>
            </Dialog>
        </div>
    )
}

export default ReviewCard