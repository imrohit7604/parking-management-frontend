import {  ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./ui/Header";
import SignIn from "./ui/SignIn";
import SignUp from "./ui/SignUp";
import DashBoard from "./ui/DashBoard";
import theme from "./ui/Theme";
  
import {  Provider as AuthProvider,  
} from "../context/AuthContext";
import {  Provider as ParkingProvider,  
} from "../context/ParkingContext";

function App() {  
  
  return (
    <AuthProvider>
      <ParkingProvider>
    <ThemeProvider theme={theme}>
       <BrowserRouter>
       
       <Header/>
       <Switch>
         <Route exact path="/" component={()=><div>Home</div>}/>
         <Route exact path="/dashboard" component={DashBoard}/>
         <Route exact path="/signin" component={SignIn}/>
         <Route exact path="/signup" component={SignUp}/>
         
       </Switch>
      
       </BrowserRouter>
    </ThemeProvider>
    </ParkingProvider>
    </AuthProvider>
  
  );
}

export default App;
