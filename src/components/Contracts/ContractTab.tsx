import { useAuthContext } from '../../hooks/useAuthContext';
import ContainerClient from './ContainerClient';
import ContainerWorker from './ContainerWorker';
import { Typography } from '@mui/material';

interface Props {
  workerID: string
}

const ContractTab = ({ workerID }: Props) => {
  const { user, worker } = useAuthContext();
  if (worker?.id.toString() === workerID) {
    return <ContainerWorker workerID={workerID} />;
  }

  if (user) {
    return <ContainerClient workerID={workerID} clientID={user.id.toString()} />;
  }

  return <Typography>Inicia sesión</Typography>;

};

export default ContractTab;