import React, {ChangeEvent, Component} from 'react';
import {connect} from 'react-redux';

import {withStyles, WithStyles} from '@material-ui/core';
import {Button, Divider, Grid, Step, StepLabel, Stepper, Typography, Hidden, MobileStepper} from '@material-ui/core';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import Title from '../application/Title';
import Person from './parts/Person';
import RegisterGeneralForm from './parts/General';
import Siblings from './parts/Siblings';
import Caption from '../application/Caption';

import {
  ApplicantFormData,
  GeneralData,
  ParentData,
  SiblingData,
} from '../../../types';
import {AppState} from '../../modules';
import {PersonState, sendApplicant} from '../../modules/person';
import {commonStyle} from '../../assets/styles';

const mapStateToProps = (state: AppState) => ({
  person: state.person,
});

interface Props extends WithStyles<typeof commonStyle> {
  handleNext: () => void;
  sendData: typeof sendApplicant;
  person: PersonState;
}

interface State {
  activeStep: number;
  steps: any[];
  general: GeneralData;
  father: ParentData;
  mother: ParentData;
  siblings: SiblingData[];
}

type ArrayData = 'siblings';
type Elements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const steps = [
  'General',
  'Parent',
  'Siblings',
];

class ApplicantForm extends Component<Props, State> {
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
    siblings: [] as SiblingData[],
  };

  public componentDidMount() {
    const {person} = this.props;
    const {steps} = this.state;
    const {marriageCondition} = person.condition;
    const isMarried = marriageCondition === 'married';

    if (!isMarried) {
      this.setState(state => (
          {
            steps: steps.filter(step => step !== 'Siblings'),
          }
      ));
    }
  }

  private setData = (stepName: keyof State) => (event: ChangeEvent<Elements>) => {
    const {value, id} = event.target;
    const {[stepName]: targetState} = this.state;
    let newState = {};

    if (Object.prototype.hasOwnProperty.call(event.target, 'checked')) {
      if (value === 'true') {
        newState = Object.assign(targetState, {[id]: true});
      } else {
        newState = Object.assign(targetState, {[id]: false});
      }
    } else {
      newState = Object.assign(targetState, {[id]: value});
    }

    this.setState(prevState => ({
      ...prevState,
      [stepName]: newState,
    }));
  };

  private setArrayData = (step: ArrayData) => (index: number) => (event: ChangeEvent<Elements>) => {
    const {id, value} = event.target;
    const {[step]: target} = this.state;
    const newState = target.slice();

    if (Object.prototype.hasOwnProperty.call(event.target, 'checked')) {
      newState[index] = {
        ...newState[index],
        [id]: value === 'true',
      };
    } else {
      newState[index] = {
        ...newState[index],
        [id]: value,
      };
    }

    this.setState(prevState => ({
      ...prevState,
      [step]: newState,
    }));
  };

  private addArrayData = (stepName: ArrayData) => (obj: any) => {
    const {[stepName]: currentData} = this.state;

    currentData.push(obj);

    this.setState(prevState => ({
      ...prevState,
      [stepName]: currentData,
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
    const {activeStep} = this.state;

    this.setState(() => ({
      activeStep: activeStep - 1,
    }));
  };

  private gotoNextStep = () => {
    const {sendData, handleNext} = this.props;
    const {
      general,
      father,
      mother,
      siblings,
    } = this.state;

    const applicant: ApplicantFormData = {
      general,
      father,
      mother,
      siblings,
    };

    sendData(applicant);
    handleNext();
  };

  private getForm = (step: number, hasChild: boolean) => {
    const {
      general,
      father,
      mother,
      siblings,
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
      case 'Siblings':
        returnDOM = (
            <Siblings
                setData={this.setArrayData('siblings')}
                addData={this.addArrayData('siblings')}
                data={siblings}
            />
        );
        break;
      default:
    }

    return returnDOM;
  };

  public render() {
    const {classes, person} = this.props;
    const {activeStep, steps} = this.state;
    const {hasChild, marriageCondition} = person.condition;

    return (
        <div>
          <Grid container>
            <Hidden xsDown>
              <Grid item xs={12} sm={3}>
                <nav className={classes.control}>
                  <p>Applicant</p>
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
                  {(marriageCondition === 'married' || marriageCondition === 'widowed')
                  && <p>Spouse</p>
                  }
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
                  <Caption text="Applicant Section"/>
                </Hidden>

                {this.getForm(activeStep, hasChild)}

                <div>
                  {activeStep === steps.length ? (
                      <div>
                        <Typography className={classes.instructions}>
                          All Applicant steps completed
                        </Typography>
                        <Button variant="contained" color="primary" onClick={this.gotoNextStep}>
                          Go to Next Form
                        </Button>
                      </div>
                  ) : (
                      <div className={classes.sectionBottom}>
                        <Hidden xsDown>
                          <div>
                            <Button
                                disabled={activeStep === 0}
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
)(withStyles(commonStyle)(ApplicantForm));
