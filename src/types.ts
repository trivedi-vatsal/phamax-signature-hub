export interface SignatureData {
  fullName: string;
  designation: string;
  email: string;
  website1: string;
  website2: string;
  mobile: string;
  teams: string;
  address: string;
  logoUrl?: string; // For bonus feature
}

export const initialSignatureData: SignatureData = {
  fullName: "John Doe",
  designation: "Software Engineer",
  email: "john.doe@phamax.ch",
  website1: "www.phamax.ch",
  website2: "www.phamax-digital.ch",
  mobile: "+91 - 12345 67890",
  teams: "john.doe@phamax.ch",
  address: "PURVA PREMIERE | COWRKS | 135/1 | Residency Rd | Ward No.76 |\nAshok Nagar | Bengaluru | Karnataka 560025",
};
