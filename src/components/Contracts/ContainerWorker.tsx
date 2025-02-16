interface Props{
    workerID: string
}
function ContainerWorker({workerID}: Props) {
  
  return (
    <div>aqui debera mostrarse TODOS los contratos del worker con ID: {workerID}</div>
  )
}

export default ContainerWorker