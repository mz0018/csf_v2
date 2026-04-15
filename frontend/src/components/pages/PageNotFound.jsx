import { Link } from 'react-router-dom'
import { ClientFormUI } from '../ui/ClientFormUI'

const PageNotFound = () => {

    return (
        <ClientFormUI>
        <h2>404 Page Not Found</h2>
        <Link to={"/"} className='bg-red-400 rounded p-2 text-white' >Go back</Link>
        </ClientFormUI>
    )
}

export default PageNotFound