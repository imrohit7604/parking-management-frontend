import {  ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./ui/Header";
import SignIn from "./ui/SignIn";
import SignUp from "./ui/SignUp";
import DashBoard from "./ui/DashBoard";
import theme from "./ui/Theme";
  
import {
  Provider as AuthProvider,
  
} from "../context/AuthContext";


function App() {
  
  
  
  return (
    <AuthProvider>
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
    </AuthProvider>
  
  );
}

export default App;
