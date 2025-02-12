import { Button, Typography } from '@mui/material';
import useFetchData from '../hooks/useFetchData';
import { Review } from '../Interfaces/ReviewInterface';
import { getReviewsByWorkerId } from '../services/workerApi';
import ContractCard from './ContractCard';

interface Props {
  workerID: string
}

const ContractTab = ({ workerID }: Props) => {
  const { data: reviewsList, loading, error } = useFetchData<Review[]>({
    apiFunction: () => getReviewsByWorkerId(workerID)
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>ocurrio un error</p>;
  // if (reviewsList?.length === 0) return <p>Aun no existen reseñas para este trabajador</p>
  if (reviewsList)
    return (
      <div className="p-4 space-y-6">
        <div className='flex flex-col sm:flex-row justify-start sm:justify-between'>
          <Typography variant="h6" className="font-bold">
            Tus contratos con este carpintero
          </Typography>
          <Button variant='contained' size='medium' sx={{maxWidth:"18rem"}}>Solicitar nuevo contrato</Button>
        </div>
        {reviewsList.length>0?
        reviewsList.map((review, index) => (
          <div key={index}>
            <ContractCard />
          </div>
        )):
        <p>No existen contratos realizados con este carpintero</p>}

      </div>
    );

};

export default ContractTab;