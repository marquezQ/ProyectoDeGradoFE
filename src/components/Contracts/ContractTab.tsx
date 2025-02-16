import { useAuthContext } from '../../hooks/useAuthContext';
import ContainerClient from './ContainerClient';
import ContainerWorker from './ContainerWorker';

interface Props {
  workerID: string
}

const ContractTab = ({ workerID }: Props) => {
  const { user } = useAuthContext();
  if(user){
    if(user.id.toString() === workerID){
      return(
        <ContainerWorker workerID={workerID}/>
      );
    }else{
      return(
        <ContainerClient workerID={workerID} clientID={user.id.toString()}/>
      );
    }
  }
  return(
    <div>logeate</div>
  )

};

export default ContractTab;