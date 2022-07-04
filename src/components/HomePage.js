import React from 'react'
import { Grid, Paper, Typography, Button } from '@mui/material'
const HomePage = () => {
    // styles
    const paperStyle = { padding: 30, width: 400, margin: "0 auto", marginTop: 2 }
    const headerStyle2 = { margin: 0, marginTop: 10 }
    const hyperlink = { marginTop: 25, textDecoration: 'none', color: '#0072E5' }
    const detailsButton = { marginTop: 25, width: '28em', marginBottom: 25 }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='left'>
                    <h1>Visma Sign yirtykselle</h1>
                    <h2 style={headerStyle2}>Professional palvelupaketti</h2>
                    <Typography variant='caption' gutterBottom>Vuosltilaus (300 € vuosl + ALV)<br />
                        Sisältää 500 alleklrjoltusta vuodessa. Ylimenevät <br />
                        allekirjoltukset 1,50€ / kpl <br />
                        <a href='/packages' target="_blank" style={hyperlink}> Muut vaihtoehdot</a><br />
                        <Button type='submit' variant='contained' color='primary' style={detailsButton}>JATKA YRITYKSEN TIETOIHIN</Button><br />
                        <a href='/' style={hyperlink}> Visma sign vain henkilökohtaiseen käyttöön?</a><br />
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default HomePage;