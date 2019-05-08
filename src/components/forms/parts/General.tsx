import React, {ChangeEvent} from 'react';

import {Grid, TextField} from '@material-ui/core';
import Title from '../../application/Title';
import {GeneralData} from '../../../../types';

type TargetElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface Props {
  hasChild?: boolean;
  setData: (stepName: ChangeEvent<TargetElements>) => void;
  data: GeneralData;
}

const RegisterGeneralForm = (props: Props) => {
  const {setData, data, hasChild} = props;
  const {
    fullName,
    birthDate,
    email,
    homePhone,
    cellPhone,
    address,
  } = data;

  return (
      <div>
        <Title text="General Information"/>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
                required
                id="firstName"
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={setData}
                value={fullName}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
                required
                id="birthDate"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={setData}
                value={birthDate}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
                id="email"
                label="Email Address"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={setData}
                value={email}
            />
          </Grid>
        </Grid>
        {hasChild
        && (
            <React.Fragment>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <TextField
                      id="currentAddress"
                      label="Current Address"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      onChange={setData}
                      value={address}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={4}>
                  <TextField
                      id="homePhone"
                      label="Phone (Home)"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={setData}
                      value={homePhone}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                      id="cellPhone"
                      label="Phone (Cell)"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      onChange={setData}
                      value={cellPhone}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
        )
        }
      </div>
  );
};

export default RegisterGeneralForm;
