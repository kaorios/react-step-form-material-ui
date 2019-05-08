import React, { ChangeEvent, Component } from 'react';

import { Grid, Button, Divider, FormControlLabel, Switch } from '@material-ui/core';
import Title from '../../application/Title';
import Person from './Person';
import { SiblingData } from '../../../../types';

type TargetElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface Props {
  setData: (index: number) => (event: ChangeEvent<TargetElements>) => void;
  addData: (obj: any) => void;
  data: SiblingData[];
}

class Siblings extends Component<Props, {}> {
  public state = {
    isNot: false,
  };

  private handleChangeSwitch = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [name]: event.target.checked });
  };

  private increaseNum = () => {
    const { addData } = this.props;

    addData({
      relationship: '',
      fullName: '',
      birthDate: '',
      deathDate: '',
    });
  };

  public render() {
    const { isNot } = this.state;
    const { setData, data } = this.props;
    const { length } = data;
    const list = [];

    for (let i = 0; i < length; i += 1) {
      list.push(
        <React.Fragment key={i}>
          <Divider
            variant="fullWidth"
            style={{
              marginTop: 36,
              marginBottom: 36,
            }}
          />
          <Person
            key={i}
            relationship={`siblings${i + 1}`}
            isLabel
            setData={setData(i)}
            data={data[i]}
          />
        </React.Fragment>,
      );
    }

    return (
      <div>
        <Title text="Siblings Information" />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Switch
                  checked={isNot}
                  onChange={this.handleChangeSwitch('isNot')}
                  value
                />
              )}
              label="I don't have any siblings."
            />
          </Grid>
        </Grid>
        {!isNot && list}
        {!isNot
        && (
          <div>
            <Button color="primary" onClick={this.increaseNum}>
              Add
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Siblings;
