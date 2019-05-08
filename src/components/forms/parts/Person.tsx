import React, {ChangeEvent} from 'react';

import {Grid, TextField} from '@material-ui/core';
import SubTitle from '../../application/SubTitle';
import Caption from '../../application/Caption';
import {ParentData, SiblingData} from '../../../../types';

type TargetElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface Props {
  relationship: string;
  setData: (arg1: ChangeEvent<TargetElements>) => void;
  data: ParentData | SiblingData;
  isLabel?: boolean;
}

const Person = (props: Props) => {
  const {
    relationship, setData, data, isLabel,
  } = props;

  const {
    fullName,
    birthDate,
    deathDate,
  } = data;

  const relationshipSiblings = (data as SiblingData).relationship || '';
  const deathNotice = `If your ${relationship} passed away, please write down date of death.`;

  let relationshipInput = null;
  if (isLabel) {
    relationshipInput = (
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
                required
                id="relationship"
                label="Relationship"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={setData}
                value={relationshipSiblings}
            />
          </Grid>
        </Grid>
    );
  }

  return (
      <React.Fragment>
        <SubTitle text={relationship}/>
        {relationshipInput}
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
        <div style={{marginTop: '12px'}}>
          <Caption text={deathNotice}/>
        </div>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
                id="deathDate"
                label="Date of Death"
                type="date"
                variant="outlined"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={setData}
                value={deathDate}
            />
          </Grid>
        </Grid>
      </React.Fragment>
  );
};

export default Person;
