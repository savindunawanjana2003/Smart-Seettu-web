export interface CurrentCustomerObject {
  name: string;
  email?: string;
  phone?: string;
}

export interface grupMember {
  memberId: string;
  name: string;
  contact: string;
}

export interface resmember {
  pending: string;
  accept: string;
  cansal: string;
}

export interface reqestDeatiles {
  grupId: string;
  grupAdminId: string;
  memberEmail: string;
  memberRespons: string;
  createDateTime: string;
}

export interface notifecetion {
  id: string;
  reqestid: string;
  email: string;
  grupId: string;
}

// const notificetions = [
//   { id: "1", name: "Kavindu Sandeepa", email: "kavi@gmail.com" },
//   { id: "2", name: "Ishan Chinthaka", email: "ishan@gmail.com" },
//   { id: "3", name: "Indumina", email: "indu@gmail.com" },
// ];
