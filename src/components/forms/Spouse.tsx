import React, {ChangeEvent, Component} from 'react';
import {connect} from 'react-redux';

import {withStyles, WithStyles} from '@material-ui/core';
import {Button, Divider, Grid, Step, StepLabel, Stepper, Typography, Hidden, MobileStepper} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import Title from '../application/Title';
import Person from './parts/Person';
import RegisterGeneralForm from './parts/General';
import Caption from '../application/Caption';

import {
  GeneralData,
  ParentData,
} from '../../../types';
import {AppState} from '../../modules';
import {PersonState, sendApplicant} from '../../modules/person';
import {commonStyle} from '../../assets/styles';

const mapStateToProps = (state: AppState) => ({
  person: state.person,
});

type Elements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface Props extends WithStyles<typeof commonStyle> {
  handleNext: () => void;
  handleBack: () => void;
  sendData: typeof sendApplicant;
  person: PersonState;
}

interface State {
  activeStep: number;
  steps: any[];
  general: GeneralData;
  father: ParentData;
  mother: ParentData;
}

const steps = [
  'General',
  'Parent',
];

class SpouseForm extends Component<Props, State> {
  public state = {
    activeStep: 0,
    steps,
    general: {
      fullName: '',
      birthDate: '',
      email: '',
      homePhone: '',
      cellPhone: '',
      address: '',
    },
    father: {
      fullName: '',
      birthDate: '',
      deathDate: '',
    },
    mother: {
      fullName: '',
      birthDate: '',
      deathDate: '',
    },
  };

  private setData = (stepName: keyof State) => (event: ChangeEvent<Elements>) => {
    const {value, id} = event.target;
    const {[stepName]: target} = this.state;

    let newState = {};

    if (Object.prototype.hasOwnProperty.call(event.target, 'checked')) {
      if (value === 'true') {
        newState = Object.assign(target, {[id]: true});
      } else {
        newState = Object.assign(target, {[id]: false});
      }
    } else {
      newState = Object.assign(target, {[id]: value});
    }
    this.setState(state => ({
      ...state,
      [stepName]: newState,
    }));
  };

  private handleStep = (step: number) => () => {
    const {activeStep} = this.state;

    if (step < activeStep) {
      this.setState(() => ({
        activeStep: step,
      }));
    }
  };

  private handleNext = () => {
    const {activeStep} = this.state;

    this.setState(() => ({
      activeStep: activeStep + 1,
    }));
  };

  private handleBack = () => {
    const {handleBack} = this.props;
    const {activeStep} = this.state;

    if (activeStep === 0) {
      handleBack();
    } else {
      this.setState(() => ({
        activeStep: activeStep - 1,
      }));
    }
  };

  private getForm = (step: number, hasChild: boolean) => {
    const {
      general,
      father,
      mother,
      steps,
    } = this.state;

    let returnDOM: JSX.Element = (
        <div/>
    );

    switch (steps[step]) {
      case 'General':
        returnDOM = (
            <RegisterGeneralForm
                hasChild={hasChild}
                setData={this.setData('general')}
                data={general}
            />
        );
        break;
      case 'Parent':
        returnDOM = (
            <div>
              <Title text="Applicant's Parent Information"/>
              <Person relationship="father" setData={this.setData('father')} data={father}/>
              <Divider variant="fullWidth" style={{marginTop: 36, marginBottom: 36}}/>
              <Person relationship="mother" setData={this.setData('mother')} data={mother}/>
            </div>
        );
        break;
      default:
    }

    return returnDOM;
  };

  public render() {
    const {classes, handleNext, person} = this.props;
    const {activeStep, steps} = this.state;
    const {hasChild} = person.condition;
    const formDOM = this.getForm(activeStep, hasChild);

    return (
        <div>
          <Grid container>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <nav className={classes.control}>
                  <p>Applicant</p>
                  <p>Spouse</p>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                          <StepLabel>
                            <Button onClick={this.handleStep(index)} disabled={index > activeStep}
                                    className={classes.controlButton}>
                              {label}
                            </Button>
                          </StepLabel>
                        </Step>
                    ))}
                  </Stepper>
                  {
                    hasChild
                    && <p>Children</p>
                  }
                </nav>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={9} className={classes.formBg}>
              <div className={classes.main}>
                <Hidden smUp>
                  <Caption text="Spouse Section"/>
                </Hidden>
                {formDOM}
                <div>
                  {activeStep === steps.length ? (
                      <div>
                        <Typography className={classes.instructions}>
                          All Spouse steps completed
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                        >
                          Go to Next Form
                        </Button>
                      </div>
                  ) : (
                      <div className={classes.sectionBottom}>
                        <Hidden xsDown>
                          <div>
                            <Button
                                onClick={this.handleBack}
                                className={classes.backButton}
                            >
                              Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={this.handleNext}>
                              Next
                            </Button>
                          </div>
                        </Hidden>
                        <Hidden smUp>
                          <MobileStepper
                              variant="dots"
                              steps={steps.length}
                              position="static"
                              activeStep={activeStep}
                              nextButton={(
                                  <Button size="small" onClick={this.handleNext}>
                                    Next
                                    <KeyboardArrowRight/>
                                  </Button>
                              )}
                              backButton={(
                                  <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                                    <KeyboardArrowLeft/>
                                    Back
                                  </Button>
                              )}
                          />
                        </Hidden>
                      </div>
                  )}
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
)(withStyles(commonStyle)(SpouseForm));
