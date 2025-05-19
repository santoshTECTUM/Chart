
import './App.css';
import Header from './Component/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layouts } from './Layout/Layouts';
import { Box, Button, Grid, Link, Stack, Typography } from '@mui/material';
import { graphType } from './Layout/routes';
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const sideBar = location.pathname.split('/')[1];
  console.log('location:', location.pathname.split('/')
  );
  return (

    <div className='appbar'>
      <Header />
      <Grid container spacing={1}>
        <Grid item sm={1.5}>
          <h1>{`${sideBar}`} Chart</h1>
          <Stack direction="column" spacing={1}>
            {graphType[sideBar] ? (
              graphType[sideBar].map((item, key) => (
                  <Button key={key} variant="contained" color="primary" onClick={() => {navigate(`/${sideBar}/${item.url}`)}}>
                    {item.name}
                  </Button>
              ))
            ) : (
              <Typography variant="h6" color="error">
                Not found
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item sm={9}>
          <Layouts />
        </Grid>
      </Grid>

    </div>

  );
}

export default App;
