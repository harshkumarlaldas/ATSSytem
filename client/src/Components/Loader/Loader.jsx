import { HashLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div
      className='
      h-[98vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    '
    >
   <HashLoader
  color="#0C1C4D"
  cssOverride={null}
  loading
  size={120}
  speedMultiplier={1}
/>
    </div>
  )
}

export default Loader