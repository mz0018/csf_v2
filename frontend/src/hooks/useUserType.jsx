import { useAuth } from '@/context/AuthContext'

export const useUserType = () => {

    const { user } = useAuth()

    return {
        userType: user?.user_type,
        isHrAdmin: user?.user_type === 'hr_admin',
        isItAdmin: user?.user_type === 'it_admin',
        isOfficeAdmin: user?.user_type === 'office_admin',
        checkType: (type) => user?.user_type === type
    }

}