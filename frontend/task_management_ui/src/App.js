import FrontScreen from "./screens/frontScreen";
import Dashboard from "./screens/dashboard";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import React, {useState, useEffect } from "react";

function App() {

  const checkAuthenticated = async () => {
		try {
		  const res = await fetch("http://localhost:5000/api/auth/verify", {
			method: "POST",
			headers: { jwt_token: localStorage.token }
		  });

		  const parseRes = await res.json();
		  console.log('checking auth')
		  parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
		} catch (err) {
		  console.error(err.message);
		}
	  };

	useEffect(() => {
		checkAuthenticated();
	}, []);

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = boolean => {
		console.log('entered setauth');
		setIsAuthenticated(boolean);
	};


  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
	  			path="/frontScreen"
	  			component={FrontScreen}
        />
        <Route
          exact={true}
	  			path="/"
          render={() => (
					<Dashboard  setAuth={setAuth} isAuthed={isAuthenticated} />
				)}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
