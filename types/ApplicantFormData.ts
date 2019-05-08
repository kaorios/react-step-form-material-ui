type FamilyMemberData = {
  fullName: string;
  birthDate?: string;
  deathDate?: string;
};

export type ParentData = FamilyMemberData;

export type SiblingData = FamilyMemberData & {
  relationship: string;
};

export type ChildData = FamilyMemberData;

export type GeneralData = {
  fullName: string;
  birthDate: string;
  email: string;
  homePhone?: string;
  cellPhone?: string;
  address?: string;
}

export type ApplicantFormData = {
  general: GeneralData,
  father?: ParentData;
  mother?: ParentData;
  siblings?: SiblingData[];
};

export default ApplicantFormData;
