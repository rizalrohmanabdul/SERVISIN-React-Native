import axios from 'axios';
import url from './host'


export const upIDPhoneUser = (idUser, data) => {
    console.warn('id pohne action: ', data);

    return {
        type: 'ID_PHONE',
        payload: axios.patch(`${url}/user/idphone/${idUser}/`, data)
    }
}

export const getAllUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`${url}/user/`)
    }
};


export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`${url}/user/register/`, data)
    }
};
export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`${url}/user/login/`, data)
    }
}

export const updateLongLat = (idUser, data) => {
    return {
        type: 'UPDATE_LONGLAT',
        payload: axios.patch(`${url}/user/posision/${idUser}`, data)
    }
}

export const updateFoto = (idUser, data) => {
    return {
        type: 'UPDATE_FOTO',
        payload: axios.patch(`${url}/user/image/${idUser}`, data)
    }
}
export const logout = (idUser) => {
    return {
        type: 'LOGOUT_USER',
        payload: axios.patch(`${url}/user/logout/${idUser}`)
    }
}