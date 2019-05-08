import {ApplicantFormData} from '../../types';

const SEND_CONDITIONS = 'SEND_CONDITIONS';
const SEND_APPLICANT = 'SEND_APPLICANT';

export type marriageTypes = 'married' | 'widowed' | 'divorced' | 'single';

interface PersonCondition {
  marriageCondition?: marriageTypes;
  hasChild: boolean;
}

export interface PersonState {
  condition: PersonCondition;
  applicant: ApplicantFormData;
}

interface SendPersonConditionAction {
  type: typeof SEND_CONDITIONS;
  payload: PersonCondition;
}

interface SendApplicantAction {
  type: typeof SEND_APPLICANT;
  payload: ApplicantFormData;
}

type PersonActionTypes = SendPersonConditionAction | SendApplicantAction

const initialState: PersonState = {
  condition: {
    marriageCondition: undefined,
    hasChild: false,
  },
  applicant: {} as any as ApplicantFormData,
};

export function PersonReducer(
    state = initialState,
    action: PersonActionTypes,
): PersonState {
  switch (action.type) {
    case SEND_CONDITIONS:
      return {
        condition: action.payload,
        applicant: state.applicant,
      };
    case SEND_APPLICANT:
      return {
        condition: state.condition,
        applicant: action.payload,
      };
    default:
      return state;
  }
}

export function sendCondition(newPersonCondition: PersonCondition): PersonActionTypes {
  return {
    type: SEND_CONDITIONS,
    payload: newPersonCondition,
  };
}

export function sendApplicant(newApplicant: ApplicantFormData): PersonActionTypes {
  return {
    type: SEND_APPLICANT,
    payload: newApplicant,
  };
}
