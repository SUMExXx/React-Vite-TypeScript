import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import getCookie from "@/utils/getCookie"

interface User {
    is_admin?: boolean
    // Add other user properties if needed
}

const useCheckSession = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const token = getCookie("access_token")
        const userStr = sessionStorage.getItem("user")
        const user: User | null = userStr ? JSON.parse(userStr) : null

        if (!token) {
            navigate("/login")
            return
        }

        const isAdmin = user?.is_admin === true

        if (location.pathname.includes("admin_options") && !isAdmin) {
            alert("Access denied. Admins only.")
            navigate("/user")
        }

        console.log("token:", token)
    }, [navigate, location.pathname])
}

export default useCheckSession

