import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminMain = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/admin/users')
    }, [])

    return null
}

export default AdminMain