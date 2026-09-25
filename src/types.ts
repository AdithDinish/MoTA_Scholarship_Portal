export type Language = 'en' | 'hi' | 'ta';

export type UserRole = 'student' | 'admin' | 'guest';

export type SchemeId = 'pre_matric' | 'post_matric' | 'top_class' | 'nfst' | 'nos';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_verification'
  | 'institution_verified'
  | 'state_verified'
  | 'ministry_verified'
  | 'action_required'
  | 'approved'
  | 'rejected'
  | 'sanctioned'
  | 'disbursed';

export interface Scheme {
  id: SchemeId;
  name: string;
  hindiName: string;
  tamilName: string;
  tagline: string;
  targetGroup: string;
  educationLevel: string;
  incomeLimit: string;
  financialAssistance: string;
  coverage: string;
  statusForUser: 'Eligible' | 'Applied' | 'Not Applied' | 'Not Applicable' | 'Check Eligibility';
  description: string;
  eligibilityPoints: string[];
  documentsRequired: string[];
}

export interface VerificationItem {
  id: string;
  title: string;
  source: string;
  status: 'verified' | 'pending' | 'action_required' | 'mismatch';
  lastChecked: string;
  message?: string;
  referenceNumber?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Identity' | 'Community' | 'Education' | 'Income' | 'Domicile' | 'Disability' | 'Bank' | 'Other';
  status: 'verified' | 'action_required' | 'pending' | 'expired';
  source: string;
  dateVerified: string;
  fileName: string;
  fileSize: string;
  certificateNumber?: string;
  issueAuthority?: string;
  issueDate?: string;
  deficiencyReason?: string;
}

export interface PaymentItem {
  id: string;
  schemeId: SchemeId;
  schemeName: string;
  installmentNo: number;
  amount: number;
  status: 'paid' | 'processing' | 'pending_sanction';
  date: string;
  pfmsTransactionId: string;
  bankName: string;
  accountMasked: string;
  dbtStatus: 'Aadhaar NPCI Seeded' | 'Account Direct' | 'Validating';
  financialYear: string;
}

export interface ApplicationTimelineEvent {
  title: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending' | 'action_required';
  actor: string;
  remarks?: string;
}

export interface StudentApplication {
  applicationId: string;
  schemeId: SchemeId;
  schemeName: string;
  appliedDate: string;
  currentStage: string;
  overallStatus: ApplicationStatus;
  academicYear: string;
  institutionName: string;
  course: string;
  expectedNextAction: string;
  actionRequired: boolean;
  timeline: ApplicationTimelineEvent[];
}

export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl: string;
  gender: string;
  dob: string;
  mobile: string;
  email: string;
  state: string;
  district: string;
  aadhaarMasked: string;
  apaarId: string;
  
  // ST Details
  tribe: string;
  stCertificateNo: string;
  isPVTG: boolean; // Particularly Vulnerable Tribal Group
  stIssuingState: string;
  
  // Education
  institution: string;
  institutionUdiseCode: string;
  course: string;
  yearOfStudy: string;
  marksPercentage: string;
  
  // Financial
  annualFamilyIncome: number;
  incomeCertificateNo: string;
  incomeCertValidUpto: string;
  domicileCertNo: string;
  
  // Bank
  bankName: string;
  accountNumberMasked: string;
  ifscCode: string;
  npciAadhaarLinked: boolean;
  
  // Stats
  profileCompletion: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'verification' | 'deficiency' | 'payment' | 'deadline' | 'system';
  date: string;
  read: boolean;
  actionRoute?: string;
}

export interface ConnectedSystem {
  id: string;
  name: string;
  acronym: string;
  category: 'Existing Portal' | 'Identity & Education' | 'State & Verification';
  status: 'Connected' | 'Integration Placeholder' | 'Simulated Live';
  description: string;
  lastSync: string;
  recordsChecked: number;
  apiProtocol: string;
}

export interface StateCoverageData {
  state: string;
  stPopulation: number;
  estimatedEligibleStudents: number;
  currentScholarshipBeneficiaries: number;
  coveragePercentage: number;
  unreachedGap: number;
  primaryScheme: string;
}

export interface AdminApplicationRecord {
  id: string;
  applicationId: string;
  studentName: string;
  avatarUrl?: string;
  schemeId: SchemeId;
  schemeName: string;
  state: string;
  district: string;
  institution: string;
  verificationPercentage: number;
  status: ApplicationStatus;
  lastUpdated: string;
  flaggedDeficiency: boolean;
  incomeAmount: number;
  stVerified: boolean;
  dbtReady: boolean;
}
