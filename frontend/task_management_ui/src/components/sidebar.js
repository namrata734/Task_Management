import React, { useState } from "react";
import "./sidebar.css";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: 200,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
const Sidebar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      function refreshPage() {
        window.location.reload();
      }
      refreshPage();
      console.log("logged out");
      setAuth(false);

      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  React.useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("till here nav");
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className="sidebar">
      <div className="brandname">.taskez</div>
      <div className="fontawsm">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Stats" {...a11yProps(1)} />
          <Tab label="Projects" {...a11yProps(2)} />
          <Tab label="Chat" {...a11yProps(3)} />
          <Tab label="Calender" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={2}></TabPanel>
      </div>
      {isAuthenticated ? (
        <button className="bottom" onClick={(e) => logout(e)}>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Sidebar;
