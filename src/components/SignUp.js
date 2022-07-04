import React, { useState } from 'react'
import { Grid, Paper, Typography, TextField, Button } from '@mui/material'
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';

import RadioGroup from '@mui/material/RadioGroup';
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';

import { packs } from '../constants/Constants';

const SignUp = () => {
    // styles
    const paperStyle = { padding: 20, width: 400, margin: "0 auto" }
    const headerStyle = {}
    const spacing = { marginBottom: 25 }
    const spacing3 = { marginBottom: 25, flex: 1, display: 'flex', flexDirection: 'row' }
    const spacing2 = { marginTop: 50 }
    const detailsButton = { marginTop: 35, width: '28em', marginBottom: 40 }


    //country selection
    const countries = [
        {
            value: 'Suomi',
            label: 'Finland',
        },
        {
            value: 'Ind',
            label: 'India',
        },
        {
            value: 'Aus',
            label: 'Australia',
        }
    ];
    const [country, setCountry] = React.useState('Suomi');
    const handleChange = (event) => {
        setCountry(event.target.value);
        const { name, value } = event.target
        setValues({
            ...values,
            [name]: value
        })
    };
    // setting initial form values
    const initialValues = {
        id: '',
        fullName: '',
        email: '',
        mobile: '+358\n',
        city: '',
        line: '',
        organisation: 'Yritys',
        country: '',
        postalCode: ''
    }

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    // reset Form data
    const resetForm = () => {
        setValues(initialValues);
        setErrors({})
    }
    // Form validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues && fieldValues.email === '') {
            temp.email = fieldValues.email ? "" : "This field is required."
        } else {
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        }

        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required."
        if (country)
            temp.country = fieldValues.country ? "" : "This field is required."
        if ('id' in fieldValues)
            temp.id = fieldValues.id.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    // print form data
    const location = useLocation();
    const id = location.search.split("=")[1];

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            if (id) {
                const data = packs.find((pack) => pack.id === parseInt(id))
                var pdf = new jsPDF();
                pdf.text(20, 10 + (1 * 10),
                    "Detaled Information" +
                    "\nPackage selected: " + data.type +
                    "\nPackage cost: " + data.currentCost +
                    "\nPackage previous cost: " + data.previousCost +
                    "\nFull name: " + values.fullName +
                    "\nId: " + values.id +
                    "\nCountry: " + values.country +
                    "\nAddress: " + values.postalCode + ' ' + values.city + ' ' + values.line +
                    "\nForm of organization: " + values.organisation +
                    "\nEmail: " + values.email +
                    "\nMobile number: " + values.mobile
                )
                pdf.save("pdf");
            }
        }
        resetForm();
    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='left'>
                    <h2 style={headerStyle}>Rekisteröitävä yritys</h2>
                </Grid>
                <form align='left' onSubmit={handleSubmit}>
                    <div style={spacing}>
                        <TextField
                            fullWidth
                            name="fullName"
                            value={values.fullName}
                            onChange={handleInputChange}
                            label="Yrityksen nimi *"
                            id="outlined-size-small"
                            size="small"
                        />
                        {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
                    </div>
                    <div style={spacing}>
                        <TextField
                            fullWidth
                            name="id"
                            value={values.id}
                            onChange={handleInputChange}
                            label="Y-tunnus *"
                            id="outlined-size-small"
                            size="small"
                        />
                        {errors.id && <span style={{ color: 'red' }}>{errors.id}</span>}
                    </div>
                    <div style={spacing}>
                        <TextField
                            fullWidth
                            id="outlined-select-small"
                            select
                            size="small"
                            label="Maa jossa yritystoimii"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            helperText="Please select your country"
                        >
                            {countries.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
                    </div>
                    <div style={spacing}>
                        <TextField
                            fullWidth
                            name="postalCode"
                            value={values.postalCode}
                            onChange={handleInputChange}
                            label="Postiosoite *"
                            id="outlined-size-small"
                            size="small"
                        />
                        {errors.postalCode && <span style={{ color: 'red' }}>{errors.postalCode}</span>}
                    </div>
                    <div style={spacing3}>
                        <div style={{ marginRight: 2 }}>
                            <TextField
                                fullWidth
                                name="city"
                                value={values.city}
                                onChange={handleInputChange}
                                label="Y-tunnus *"
                                id="outlined-size-small"
                                size="small"
                            />
                            {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
                        </div>
                        <div>
                            <TextField
                                fullWidth
                                name="line"
                                value={values.line}
                                onChange={handleInputChange}
                                label="Y-tunnus *"
                                id="outlined-size-small"
                                size="small"
                            />
                            {errors.line && <span style={{ color: 'red' }}>{errors.line}</span>}
                        </div>
                    </div>
                    <Typography component="div" variant="caption" sx={{ color: 'grey', allign: 'left' }}> Organisaatiomuoto *<br /></Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Yhdistys"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Yritys" onChange={handleInputChange} control={<Radio />} label="Yritys" />
                        <FormControlLabel value="Yhdistys" onChange={handleInputChange} control={<Radio />} label="Yhdistys" />
                    </RadioGroup>
                    <Grid align='left'>
                        <h4 style={headerStyle}>Yhteystiedot</h4>
                    </Grid>
                    <div style={spacing}>
                        <TextField
                            fullWidth
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            label="Sähköpostiosoite *"
                            id="outlined-size-small"
                            size="small"
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                        <Typography component="div" variant="caption" style={{ marginTop: 15 }}> Rekisteröinnin vahvistus ja allekirjoituspalveluun
                            liittyvät asiat kum ohjeet ja tiedotteet lähetetään tähän osoitteeseen. <br />
                        </Typography>
                    </div>
                    <div style={spacing2}>
                        <TextField
                            fullWidth
                            name="mobile"
                            value={values.mobile}
                            label="Puhelin numero *"
                            id="outlined-size-small"
                            onChange={handleInputChange}
                            size="small"
                        />
                        {errors.mobile && <span style={{ color: 'red' }}>{errors.mobile}</span>}
                        <Typography component="div" variant="caption" style={{ marginTop: 15 }}> Puhelinnumero, josta tavoittaa yrityksen edustajan esimerkiksi
                            allekirjoituspalveluun liitetyn järjestelman tekniseen vikatilanteeseem selvittelyyn liittyen
                            <br />
                        </Typography>
                    </div>

                    <Button type='submit' onClick={handleSubmit} variant='contained' fullWidth color='primary' href='/signUp' style={detailsButton}>JATKA LASKUTUSTIETOIHIN</Button><br />
                </form>
            </Paper>
        </Grid >
    )
}

export default SignUp;