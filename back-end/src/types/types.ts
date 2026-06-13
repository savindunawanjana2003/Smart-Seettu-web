export interface Imembers {
  memberId: string;
  membername: string;
  contactnumber: string;
  tagname: string; // is member or admin
}
// firstly  the admin must include  as a member with admin tag name in the grup collection
export interface Igrup extends Document {
  id: string;
  adminid: string;
  memberCount: string;
  expectedMonthlySeettuAmount: string;
  monthlyContributionPerMember: string;
  seettuDurationInMonths: string;
  members?: Imembers[];
  createDate: string;
  grupStete: string;
}

export enum Grupstete {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}
