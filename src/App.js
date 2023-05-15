import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [launches, setLaunches] = useState([]);
  const [filters, setFilters] = useState({
    launch_success: null,
    land_success: null,
    launch_year: null
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    updateURL();
  }, [filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.spaceXdata.com/v3/launches',
        { params: { limit: 100, ...filters } }
      );
      setLaunches(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateURL = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    for (const key in filters) {
      if (filters[key] !== null) {
        params.set(key, filters[key]);
      }
    }

    url.search = params.toString();
    window.history.replaceState(null, '', url.toString());
  };

  const handleFilterChange = (filterName, filterValue) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: filterValue }));
  };


  return (
    <div className="App body">
      <header class="header">
        <h1>SpaceX Launch Programs</h1>
      </header>
      <div class="container">
        <div class="box" section="filter" style={{ "width": "200px", "height": "600px" }}>
          <div class="CARD">
            <div class="filterbody">
              <h5 class="CARD-title">Filters</h5>
              <p class="year" style={{ "text-align": "center", "margin-top": "15px" }}>Launch Year</p>
              <div class="btn-container" role="group" aria-label="Vertical button group">
                <div class="buttons" style={{ "margin-top": "10px" }}>
                  <button className={filters.launch_year === '2006' ? 'btn1 selected' : 'btn1'}
                    onClick={() => handleFilterChange('launch_year', '2006')}
                  >2006</button>
                  <button className={filters.launch_year === '2007' ? 'btn2 selected' : 'btn2'}
                    onClick={() => handleFilterChange('launch_year', '2007')}
                  >2007</button>
                  <button className={filters.launch_year === '2008' ? 'btnx selected' : 'btnx'}
                    onClick={() => handleFilterChange('launch_year', '2008')}
                  >2008</button>
                  <button className={filters.launch_year === '2009' ? 'btny selected' : 'btny'}
                    onClick={() => handleFilterChange('launch_year', '2009')}
                  >2009</button>
                  <button className={filters.launch_year === '2010' ? 'btnx selected' : 'btnx'}
                    onClick={() => handleFilterChange('launch_year', '2010')}
                  >2010</button>
                  <button className={filters.launch_year === '2011' ? 'btny selected' : 'btny'}
                    onClick={() => handleFilterChange('launch_year', '2011')}
                  >2011</button>
                  <button className={filters.launch_year === '2012' ? 'btnx selected' : 'btnx'}
                    onClick={() => handleFilterChange('launch_year', '2012')}
                  >2012</button>
                  <button className={filters.launch_year === '2013' ? 'btny selected' : 'btny'}
                    onClick={() => handleFilterChange('launch_year', '2013')}
                  >2013</button>
                  <button className={filters.launch_year === '2014' ? 'btnx selected' : 'btnx'}
                    onClick={() => handleFilterChange('launch_year', '2014')}
                  >2014</button>
                  <button className={filters.launch_year === '2015' ? 'btny selected' : 'btny'}
                    onClick={() => handleFilterChange('launch_year', '2015')}
                  >2015</button>
                  <button className={filters.launch_year === '2016' ? 'btnx selected' : 'btnx'}
                    onClick={() => handleFilterChange('launch_year', '2016')}
                  >2016</button>
                  <button className={filters.launch_year === '2017' ? 'btny selected' : 'btny'}
                    onClick={() => handleFilterChange('launch_year', '2017')}
                  >2017</button>
                  <button className={filters.launch_year === '2018' ? 'btnx selected' : 'btnx'}
                    onClick={() => handleFilterChange('launch_year', '2018')}
                  >2018</button>
                  <button className={filters.launch_year === '2019' ? 'btny selected' : 'btny'}
                    onClick={() => handleFilterChange('launch_year', '2019')}
                  >2019</button>
                  <button className={filters.launch_year === '2020' ? 'btnx selected' : 'btnx'}
                    onClick={() => handleFilterChange('launch_year', '2020')}
                  >2020</button>
                </div>
              </div>
              <p class="year" style={{ "text-align": "center", "margin-top": "16px" }}>Successful Launch</p>
              <div id="btns">
                <button className={filters.launch_success === 'true' ? 'selected btnx' : 'btnx'}
                  onClick={() => handleFilterChange('launch_success', 'true')}>True</button>
                <button className={filters.launch_success === 'false' ? 'selected btny' : 'btny'}
                  onClick={() => handleFilterChange('launch_success', 'false')}>False</button>
              </div>
              <p class="year" style={{ "text-align": "center", "margin-top": "20px" }}>Successful Landing</p>
              <div id="btns">
                <button className={filters.land_success === 'true' ? 'selected btnx' : 'btnx'}
                  onClick={() => handleFilterChange('land_success', 'true')}
                >True</button>
                <button className={filters.land_success === 'false' ? 'selected btny' : 'btny'}
                  onClick={() => handleFilterChange('land_success', 'false')}
                >False</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container1">
          {launches.map((launch) => (
            <div className="box card-grid" key={launch.flight_number}>
              <img className="card-img" src={launch.links.mission_patch} alt="Card Image" style={{ height: "190px", width: "200px", marginRight: "10px" }} />
              <div className="boxbody">
                <h5 className="card-title">{launch.mission_name} #{launch.flight_number}</h5>
                <p><strong>Mission lds</strong></p>
                <ul>
                  <li>{launch.mission_id}</li>
                </ul>
                <p><strong>Launch Year:</strong> {launch.launch_year}</p>
                <p><strong>Successful Launch:</strong> {launch.launch_success == false ? 'False' : 'True'}</p>
                <p><strong>Successful Landing:</strong> {launch.rocket.first_stage.cores.land_success === null ? 'NA' : ''}</p>
              </div>
            </div>
          ))}
        </div>

      </div>



      <p class="footer" style={{ "text-align": "center", "font-size": "20px" }}><strong>Developed by: </strong>Deepali Malhotra</p>
    </div >
  );
}

export default App;
