import { HashLoader } from 'react-spinners'
import './Loading.scss'

const Loading = () => {
    return <div className='loading'>
        <h2 className='loading__heading'>Loading</h2>
        <HashLoader
          color="#0C0C0C"
          size={50}
        />
    </div>
}

export default Loading