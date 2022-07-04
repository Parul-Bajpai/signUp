import React from 'react'
import { Grid, Paper, Typography, Button } from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import { packs } from '../constants/Constants';


const Packages = () => {
  // styles
  const description = { color: 'grey' }
  const paperStyle = { padding: 30, width: 400, margin: "0 auto", marginTop: 2 }
  const headerStyle1 = {}
  const headings = { fontWeight: 'bold', fontFamily: 'Arial', marginTop: 20 }
  const detailsButton = { marginTop: 25, width: '28em', marginBottom: 2 }
  const tabs = { backgroundColor: '', border: '1px' }

  const [value, setValue] = React.useState(1);

  const handleChange = () => {
    setValue(123);
  };
  const [subscription, setSubscription] = React.useState(1)
  const handleChangeSubscription = (id) => {
    setSubscription(id);
  };
  console.log(subscription);
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='left'>
          <h2 style={headerStyle1}>Palvelu paketit</h2>
          <Typography variant='subtitle1' style={headings}>Laskutusväli<br /></Typography>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered style={tabs}>
              <Tab label="KUUKAUSI" />
              <Tab label="VUOSI" />
            </Tabs>
          </Box>


          <div>
            <Typography variant='subtitle1' style={headings}>Valitse paketti<br /></Typography>
            {packs.map((pack) => {
              return (<Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                  <Radio id="2" value={pack.currentCost} checked={subscription === pack.id} onChange={() => handleChangeSubscription(pack.id)}
                    color="primary" />
                </Box>
                <Box sx={{ padding: 2 }}>
                  <Typography component="div" variant="h6"> {pack.type} </Typography>
                  <Typography variant="h6" display="inline"> {pack.currentCost} </Typography><Typography variant="caption">/ kuukausi </Typography>&nbsp;
                  <Typography variant="caption" style={{ textDecoration: "line-through", textDecorationColor: "grey", color: 'grey' }}>
                    {pack.previousCost} / kuukausi
                  </Typography>
                  <Typography component="div" variant="caption" style={description}> Sisältää 60 allekirjoitusta per vuosi<br />
                    Ylimenevät allekirjoitukset 1,50 €/kpl
                  </Typography>
                </Box>
              </Card>)
            })}
            <Typography component="div" variant="caption" sx={{ marginTop: 3 }}> Hintoihin lisätään ALV<br /></Typography>
            <Typography component="div" variant="caption" sx={{ marginTop: 1 }}> *Vuositilaukseen perustuvat paketit veloitetaan kerran
              vuodessa etukäteen käyttöoikeusjakson alkaessa. Ennakkoon syntyneitä maksuja ei palauteta. <br /></Typography>
            <Typography component="div" variant="caption" sx={{ marginTop: 1 }}>Ylimenevät tapahtumat laskutetaan kuukausittain ( minimilaskutus 10 €) <br /></Typography>
            <Button type='submit' variant='contained' color='primary' href={`/signUp?selectedPackId=${subscription}`} style={detailsButton}>VALITSE</Button><br />
          </div>

        </Grid>
      </Paper>
    </Grid>
  )
}

export default Packages;