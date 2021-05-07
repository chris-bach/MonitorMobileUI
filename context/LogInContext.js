import React, {createContext, useReducer} from 'react'
import LoginReducer from "./LoginReducer";

const initialState = {
    userInfo:{
        id: null,
        //id: 1,
        email: null,
        firstName: null,
        lastName: null
    },
    userRoles: [],
    userOrganisation: {
        address: null,
        contactNumber: null,
        email: null,
        organisationId: null,
        //organisationId: 1,
        organisationName: null,
    },
    director: {},
    userInactiveJobs: [],
    userActiveJobs: [],
    userSubordinates: null
};

export const LogInContext = createContext(initialState);

export const LoginProvider = ({children}) => {

    const [state, dispatch] = useReducer(LoginReducer, initialState);

    function setUserInfo(userInfo){
        dispatch({
            type: "SET_USER",
            payload: userInfo
        })
    }

    function setUserRoles(roles){
        dispatch({
            type: "SET_ROLES",
            payload: roles
        })
    }

    function setUserOrganisation(org){
        dispatch({
            type: "SET_ORGANISATION",
            payload: org,
        })
    }

    function setDirector(director){
        dispatch({
            type: "SET_DIRECTOR",
            payload: director
        })
    }

    function setInactiveJobs(iJobs){
        dispatch({
            type: "SET_INACTIVE_JOBS",
            payload: iJobs
        })
    }

    function setActiveJobs(aJobs){
        dispatch({
            type: "SET_ACTIVE_JOBS",
            payload: aJobs
        })
    }

    function setSubordinates(sub){
        dispatch({
            type: "SET_SUBORDINATES",
            payload: sub
        })
    }

    return(
        <LogInContext.Provider
            value={{
                userInfo: state.userInfo,
                setUserInfo,
                userRoles: state.userRoles,
                setUserRoles,
                userOrganisation: state.userOrganisation,
                setUserOrganisation,
                director: state.director,
                setDirector,
                userInactiveJobs: state.userInactiveJobs,
                setInactiveJobs,
                userActiveJobs: state.userActiveJobs,
                setActiveJobs,
                userSubordinates: state.userSubordinates,
                setSubordinates
            }}
        >
            {children}
        </LogInContext.Provider>
    )
}
