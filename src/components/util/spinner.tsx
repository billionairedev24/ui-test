const LoadingSpinner = ({style} : {style: string}) => {
  return (
    <div className={style}>
      <div className={`animate-spin rounded-full ${style} border-b-2 border-primary`}></div>
    </div>
  )
}

export default LoadingSpinner