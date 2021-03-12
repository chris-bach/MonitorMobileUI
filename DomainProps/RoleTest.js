import React, {useEffect, useState} from "react";
import Role from "./Role";
import {getRoleByRoleIdAndOrgId} from "../Services/RoleService";

const RoleTest = () => {
    const [role, setRole] = useState(new Role());

    useEffect(() => {
            getRoleByRoleIdAndOrgId(1, 1)
                .then((response) => {
                    setRole(response.data)
                }).catch(error =>{

            })
        },
        [])

    return (
        <div>
            <h1> {role.roleTitle}
            </h1>
        </div>

    )
}
export default RoleTest;
