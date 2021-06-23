export const reducer = (state = { user: null, forms: { new: false, edit: null } }, action) => {
    console.log(action)
    switch(action.type) {
        case '@@INIT':
            state.user = JSON.parse(localStorage.getItem('userInfo'))
            break
        case 'LOGIN':
            state.user = action.payload
            break
        case 'LOGOUT':
            state.user = null
            break
        case 'SET_NEW_FORM':
            state.forms.new = action.payload
            break
        case 'SET_EDIT_FORM':
            state.forms.edit = action.payload
            break
        default: return state
    }
    return state
}