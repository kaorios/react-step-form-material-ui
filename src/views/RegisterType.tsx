import React, {ChangeEvent, Component} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps, withRouter} from 'react-router';

import {Button, Divider, FormControlLabel, Radio} from '@material-ui/core';
import Title from '../components/application/Title';
import SubTitle from '../components/application/SubTitle';
import {AppState} from '../modules';
import {PersonState, sendCondition} from '../modules/person';
import {AppContainerStyle} from '../assets/styles';

type TargetElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const mapStateToProps = (state: AppState) => ({
  person: state.person,
});

interface PathParamsType {
  param1: string;
}

interface Props extends RouteComponentProps<PathParamsType> {
  sendData: typeof sendCondition;
  person: PersonState;
}

class RegisterType extends Component<Props> {
  public state = {
    marriageCondition: undefined,
    hasChild: '',
  };

  private handleChange = (event: ChangeEvent<TargetElements>) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  private sendCondition = () => {
    const {marriageCondition, hasChild} = this.state;
    const {sendData, history} = this.props;

    sendData({
      marriageCondition,
      hasChild: hasChild === 'true',
    });
    history.push('/register');
  };

  public render() {
    const {marriageCondition, hasChild} = this.state;

    return (
        <div style={AppContainerStyle}>
          <Title text="Choose your conditions"/>
          <div>
            <SubTitle text="Your marriage condition"/>
            <FormControlLabel
                control={(
                    <Radio
                        name="marriageCondition"
                        checked={marriageCondition === 'married'}
                        onChange={this.handleChange}
                        value="married"
                    />
                )}
                label="Married / in common law"
            />
            <FormControlLabel
                control={(
                    <Radio
                        name="marriageCondition"
                        checked={marriageCondition === 'divorced'}
                        onChange={this.handleChange}
                        value="divorced"
                    />
                )}
                label="Divorced"
            />
            <FormControlLabel
                control={(
                    <Radio
                        name="marriageCondition"
                        checked={marriageCondition === 'widowed'}
                        onChange={this.handleChange}
                        value="widowed"
                    />
                )}
                label="Widowed"
            />
            <FormControlLabel
                control={(
                    <Radio
                        name="marriageCondition"
                        checked={marriageCondition === 'single'}
                        onChange={this.handleChange}
                        value="single"
                    />
                )}
                label="Single"
            />
          </div>
          <Divider variant="fullWidth" style={{marginTop: 36, marginBottom: 36}}/>
          <div>
            <SubTitle text="Do you have any children?"/>
            <FormControlLabel
                control={(
                    <Radio
                        name="hasChild"
                        checked={hasChild === 'true'}
                        onChange={this.handleChange}
                        value="true"
                    />
                )}
                label="yes"
            />
            <FormControlLabel
                control={(
                    <Radio
                        name="hasChild"
                        checked={hasChild === 'false'}
                        onChange={this.handleChange}
                        value="false"
                    />
                )}
                label="no"
            />
          </div>
          <Divider variant="fullWidth" style={{marginTop: 36, marginBottom: 36}}/>

          <Button variant="contained" color="primary" onClick={this.sendCondition}>
            Go to register Form
          </Button>
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, {sendData: sendCondition})(RegisterType));
