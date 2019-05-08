import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import ApplicantForm from '../components/forms/Applicant';
import ChildrenForm from '../components/forms/Children';
import SpouseForm from '../components/forms/Spouse';
import {AppState} from '../modules';
import {PersonState} from '../modules/person';

const mapStateToProps = (state: AppState) => ({
  person: state.person,
});

interface Props {
  person: PersonState;
}

interface State {
  activeStep: number;
  forms: any[];
}

class RegisterForm extends Component<Props, State> {
  public state = {
    activeStep: 0,
    forms: [] as any[],
  };

  public constructor(props: Props) {
    super(props);

    const {forms} = this.state;
    // initialization
    forms.splice(0, forms.length);
    forms.push((<ApplicantForm handleNext={this.handleNext}/>));
  }

  public componentDidMount() {
    const {person} = this.props;
    const {marriageCondition, hasChild} = person.condition;

    if (marriageCondition === 'married' || marriageCondition === 'widowed') {
      this.setState(state => ({
        forms: [
          ...state.forms,
          (<SpouseForm handleNext={this.handleNext} handleBack={this.handleBack}/>),
        ],
      }));
    }

    if (hasChild) {
      this.setState(state => ({
        forms: [
          ...state.forms,
          (<ChildrenForm handleNext={this.handleNext} handleBack={this.handleBack}/>),
        ],
      }));
    }

    this.setState(state => ({
      forms: [
        ...state.forms,
        (
            <div>
              <p>Thank you for your time!</p>
              <Button variant="contained" color="primary">Register</Button>
            </div>
        ),
      ],
    }));
  }

  private handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  private handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  private getForm = (step: number) => {
    const {forms} = this.state;
    const {[step]: result} = forms;

    return result;
  };

  public render() {
    const {activeStep} = this.state;
    const formDOM = this.getForm(activeStep);

    return (
        <React.Fragment>
          {formDOM}
        </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, {})(RegisterForm);
