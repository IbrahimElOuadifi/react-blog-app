export const authUser = ({ userInfo, dispatch, push }) => {
    console.log({ userInfo, dispatch, push })
    if(userInfo){
        dispatch({ type: 'LOGIN', payload: userInfo })
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo }));
        console.log(userInfo)
    } else {
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('userInfo');
        console.log(null)
    }
    push('/');
};