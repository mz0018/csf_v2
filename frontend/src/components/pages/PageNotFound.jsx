import { Link } from 'react-router-dom'

const PageNotFound = () => {

    return (
        <>
        404 Page Not Found
        <Link to={"/"} className='bg-red-400 rounded p-2 text-white' >Go back</Link>
        </>
    )
}

export default PageNotFound