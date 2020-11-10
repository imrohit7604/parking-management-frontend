const { createMuiTheme } = require("@material-ui/core")

const arcBlue="#0B72B9";
const arcOrange="#FFBA60";
export default createMuiTheme({
palette:{
    common:{
        blue:`${arcBlue}`,
        orange:`${arcOrange}`
    },
    primary:{
        main:`${arcBlue}`,
    },
    secondary:{
        main:`${arcOrange}`
    },
    
},
typography:{
    
    estimate:{
        fontWeight:700,
        fontSize:"1rem",
        textTransform:"none",
        color:"white"
    }
}
})