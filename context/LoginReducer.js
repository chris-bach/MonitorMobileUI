/**
 * @author Manik Bagga
 * @description This reducer controls the functions used by the login and authorisation components.
 */

const reducer = (user, action) => {
    switch(action.type){
        case "SET_USER":
            return{
                ...user,
                userInfo: action.payload
            };
        case "SET_ROLES":
            return{
                ...user,
                userRoles: action.payload
            };
        case "SET_ORGANISATION":
            return{
                ...user,
                userOrganisation: action.payload
            };
        case "SET_DIRECTOR":
            return{
                ...user,
                director: action.payload
            };
        case "SET_INACTIVE_JOBS":
            return {
                ...user,
                userInactiveJobs: action.payload
            };
        case "SET_ACTIVE_JOBS":
            return {
                ...user,
                userActiveJobs: action.payload
            };
        case "SET_SUBORDINATES":
            return {
                ...user,
                userSubordinates: action.payload
            };
        default:
            return user;

    }
}
export default reducer;
