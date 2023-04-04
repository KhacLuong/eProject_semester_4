import instance from "../../config/axiosConfig.jsx";

// ============================ ADMIN - API ============================
const postCreateUser = (name, email, password, confirmPassword, userType) => {
    const data = {
        "name": name,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "userType": userType
    }
    return instance.post('/admin/v1/register', data)
}









// ============================ CUSTOMER - API ============================



export {postCreateUser}