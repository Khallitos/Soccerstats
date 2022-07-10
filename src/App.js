import React, { useEffect, useState,useRef } from "react";
import { Navbar, Footer } from "./components";
import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import axios from 'axios';

function App() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const Focusinput = useRef(null)
  const [isdetails ,setIsdetails] = useState(false)
  const [loading,setLoading]= useState(false)


  const getSearch = async () => {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/2/searchevents.php?e=${search}`
    );
    const resData = await res.json();
    setEvents(resData.event);
    setIsdetails(true);
    console.log(resData);
  };

  const getTeams = async () => {
    const res = await fetch(
      "https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League"
    );
    const resData = await res.json();
    setTeams(resData.teams);
    console.log(resData);
  };

  useEffect(() => {
    getTeams();
    Focusinput.current.focus();
  }, []);


  if(isdetails)
  {
    <p>Events found</p>
  }

  return (
    <Box p={5}>

      <Box display="flex" justifyContent="center">

        <Box mx={1}>



          <TextField
            id="outlined-basic"
            label="search"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            ref={Focusinput}

          />

        </Box>
        <Button variant="contained" onClick={getSearch}>
          Search
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        {(teams.length && !search?.length) &&
          teams.map((team) => (
            <Box component="span"> {team.strAlternate} </Box>
          ))}




        {events?.map((event) => (
          <Box component="span"> {event.strCity} </Box>
        ))}
      </Box>

    </Box>
  );
}
export default App;
