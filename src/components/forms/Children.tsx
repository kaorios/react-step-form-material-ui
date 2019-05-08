import React, {ChangeEvent, Component} from 'react';
import {connect} from 'react-redux';

import {withStyles, WithStyles} from '@material-ui/core';
import {Button, Divider, Grid, TextField, Hidden, MobileStepper} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import Title from '../application/Title';
import SubTitle from '../application/SubTitle';

import {ChildData} from '../../../types';
import {AppState} from '../../modules';
import {PersonState, sendApplicant} from '../../modules/person';
import {commonStyle} from '../../assets/styles';

const mapStateToProps = (state: AppState) => ({
  person: state.person,
});

type TargetElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface Props extends WithStyles<typeof commonStyle> {
  handleNext: () => void;
  handleBack: () => void;
  sendData: typeof sendApplicant;
  person: PersonState;
}

interface State {
  data: ChildData[];
}

class ChildrenForm extends Component<Props, State> {
  public state = {
    data: [] as ChildData[],
  };

  private increaseNum = () => {
    const {data} = this.state;

    const newState = data.slice();
    newState.push({
      fullName: '',
      birthDate: '',
    });

    this.setState(() => ({
      data: newState,
    }));
  };

  private setData = (index: number) => (event: ChangeEvent<TargetElements>) => {
    const {id, value} = event.target;
    const {data} = this.state;

    const newState = data.slice();
    newState[index] = {
      ...newState[index],
      [id]: value,
    };

    this.setState(() => ({
      data: newState,
    }));
  };

  public render() {
    const {
      classes, handleBack, handleNext, person,
    } = this.props;
    const {marriageCondition} = person.condition;
    const list = [];
    const {data} = this.state;
    const {length} = data;

    for (let i = 0; i < length; i += 1) {
      const {
        fullName,
        birthDate,
      } = data[i];

      list.push(
          <React.Fragment key={i}>
            <Divider variant="fullWidth" style={{marginTop: 36, marginBottom: 36}}/>
            <SubTitle text={`Child${i + 1}`}/>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={this.setData(i)}
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
                    onChange={this.setData(i)}
                    value={birthDate}
                />
              </Grid>
            </Grid>
          </React.Fragment>,
      );
    }

    return (
        <div>
          <Grid container>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <nav className={classes.control}>
                  <p>Applicant</p>
                  {(marriageCondition === 'married' || marriageCondition === 'widowed')
                  && <p>Spouse</p>
                  }
                  <p>Children</p>
                </nav>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={9} className={classes.formBg}>
              <div className={classes.main}>
                <Title text="Child Information"/>
                {list}
                <div>
                  <Button color="primary" onClick={this.increaseNum}>
                    Add
                  </Button>
                </div>
                <div>
                  <div className={classes.sectionBottom}>
                    <Hidden xsDown>
                      <div>
                        <Button
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                          Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                          Next
                        </Button>
                      </div>
                    </Hidden>
                    <Hidden smUp>
                      <MobileStepper
                          variant="dots"
                          steps={1}
                          position="static"
                          activeStep={1}
                          nextButton={(
                              <Button size="small" onClick={handleNext}>
                                Next
                                <KeyboardArrowRight/>
                              </Button>
                          )}
                          backButton={(
                              <Button size="small" onClick={handleBack}>
                                <KeyboardArrowLeft/>
                                Back
                              </Button>
                          )}
                      />
                    </Hidden>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default connect(
    mapStateToProps,
    {sendData: sendApplicant},
)(withStyles(commonStyle)(ChildrenForm));
