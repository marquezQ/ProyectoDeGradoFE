import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
export const SkeletonWorkers = () => {
    return (
        <div className="mx-auto max-w-screen-xl p-4 sm:pt-14 space-y-8 sm:space-y-14">
            <Skeleton variant="rectangular" width="100%" sx={{ height: '18rem' }}/>
            <Skeleton variant="rectangular" width="100%" sx={{ height: '18rem' }} />
            <Skeleton variant="rectangular" width="100%" sx={{ height: '18rem' }} />
        </div>
    )
}

export const SkeletonProfile = () => {
    return (
        <div className="mx-auto max-w-screen-xl w-full mt-6 h-auto">
            <div className="flex flex-col items-center space-y-4 mt-60">
                <Skeleton variant="rectangular" sx={{width:180, height:200, border: "4px solid white",borderRadius: "24px",}} />
                <Skeleton variant="text" width={200} height={30} />
                <Skeleton variant="text" width={150} height={20} />
            </div>
            <div className="mt-6 space-y-4">
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="rectangular" width="100%" height={200} />
            </div>
        </div>
    )
}

export const SkeletonCardReviews = () => {
    return (
    <div className="space-y-6">
        <Skeleton variant="rectangular" width="100%" height={150} />
        <Skeleton variant="rectangular" width="100%" height={150} />
    </div>
    )
}

export const SkeletonCardProducts = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <Skeleton variant="rectangular" width="100%" sx={{height:"16rem"}} />
            <Skeleton variant="rectangular" width="100%" sx={{height:"16rem"}}  />
            <Skeleton variant="rectangular" width="100%" sx={{height:"16rem"}}  />
        </div>
    )
}

export const SkeletonTable = () => {
    return(
        <div className="mx-auto max-w-screen-xl p-4 sm:pt-14 space-y-8 sm:space-y-14">
            <Skeleton variant="rectangular" width="100%" sx={{ height: '20rem' }}/>
        </div>
    )
}

export const SkeletonContractsClient = () => {
    return (
        <div className="p-4 space-y-6 max-w-6xl mx-auto">
            <Skeleton variant="rectangular" width="100%" height={150} />
            <Skeleton variant="rectangular" width="100%" height={150} />

        </div>
    )
}

export const SkeletonUserProfile = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow p-6 max-w-5xl w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <Skeleton variant="circular" width={200} height={200} />
                    </div>
                    {/* Info principal */}
                    <div className="flex-1 space-y-2 w-full">
                        <Skeleton variant="text" width={180} height={40} />
                        <Skeleton variant="text" width={220} height={30} />
                        <Skeleton variant="text" width={160} height={30} />
                    </div>
                    {/* Botones */}
                    <div className="flex flex-col gap-2 md:ml-auto">
                        <Skeleton variant="rectangular" width={150} height={40} />
                        <Skeleton variant="rectangular" width={200} height={40} />
                    </div>
                </div>
                {/* Información Personal */}
                <div className="mt-10 border-t pt-6">
                    <Skeleton variant="text" width={200} height={30} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <Skeleton variant="text" width={120} height={25} />
                            <Skeleton variant="text" width={180} height={30} />
                        </div>
                        <div>
                            <Skeleton variant="text" width={120} height={25} />
                            <Skeleton variant="text" width={180} height={30} />
                        </div>
                        <div>
                            <Skeleton variant="text" width={120} height={25} />
                            <Skeleton variant="text" width={180} height={30} />
                        </div>
                        <div>
                            <Skeleton variant="text" width={120} height={25} />
                            <Skeleton variant="text" width={180} height={30} />
                        </div>
                    </div>
                </div>
                {/* Botón cerrar sesión */}
                <div className="mt-10 border-t pt-6">
                    <Skeleton variant="rectangular" width={180} height={40} />
                </div>
            </div>
            {/* Reseñas realizadas */}
            <div className="bg-white rounded-xl shadow p-0 sm:p-4 max-w-5xl w-full mt-8">
                <Skeleton variant="text" width={200} height={30} className="my-6 pb-5" />
                <Skeleton variant="rectangular" width="100%" height={120} className="mb-4" />
                <Skeleton variant="rectangular" width="100%" height={120} />
            </div>
        </div>
    );
};

export const ErrorMessage = () => {
    return(
        <Box
            className="mx-auto max-w-screen-xl p-4 sm:pt-14"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="30vh"
            bgcolor="#fff"
            borderRadius={3}
            boxShadow={2}
        >
            <ErrorOutlineIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
                ¡Ups! Ocurrió un error al cargar los datos.
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Por favor, recarga la página o intenta más tarde.
            </Typography>
        </Box>
    )
}