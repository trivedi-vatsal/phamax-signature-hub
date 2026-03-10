export interface SignatureData {
  templateType: "India" | "International";
  fullName: string;
  designation: string;
  email: string;
  website1: string;
  website2: string;
  phone: string;
  mobile: string;
  teams: string;
  address: string;
  logoUrl?: string; // For bonus feature
}

export const initialSignatureData: SignatureData = {
  templateType: "India",
  fullName: "John Doe",
  designation: "Software Engineer",
  email: "john.doe@phamax.ch",
  website1: "www.phamax.ch",
  website2: "www.phamax-digital.ch",
  phone: "+41 - (0) 41 710 2092",
  mobile: "+41 - (0) 78 73 79 187",
  teams: "john.doe@phamax.ch",
  address: "PURVA PREMIERE | COWRKS | 135/1 | Residency Rd | Ward No.76 |\nAshok Nagar | Bengaluru | Karnataka 560025",
};
