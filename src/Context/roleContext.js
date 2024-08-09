import React from "react";

const RoleContext = React.createContext({
    role: '', 
    onChangeRole: () => {}
})

export default RoleContext