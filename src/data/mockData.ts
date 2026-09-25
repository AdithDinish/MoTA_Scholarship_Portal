import {
  Scheme,
  StudentProfile,
  StudentApplication,
  DocumentItem,
  VerificationItem,
  PaymentItem,
  NotificationItem,
  ConnectedSystem,
  StateCoverageData,
  AdminApplicationRecord
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'STU-TN-2026-8812',
  name: 'Ravi Kumar',
  avatarUrl: '/src/assets/images/student_avatar_ravi_1790316158644.jpg',
  gender: 'Male',
  dob: '14 May 2004',
  mobile: '+91 98401 23456',
  email: 'ravi.kumar.st@mitindia.edu',
  state: 'Tamil Nadu',
  district: 'The Nilgiris',
  aadhaarMasked: 'XXXX-XXXX-4192',
  apaarId: 'APAAR-6029-4182-9901',
  
  // ST Details
  tribe: 'Kurumbas',
  stCertificateNo: 'TN/NIL/ST/2021/004819',
  isPVTG: true, // Kurumbas is a recognized PVTG in Tamil Nadu
  stIssuingState: 'Tamil Nadu',
  
  // Education
  institution: 'Madras Institute of Technology (MIT), Anna University',
  institutionUdiseCode: 'AISHE-U-0442',
  course: 'B.Tech in Computer Science & Engineering',
  yearOfStudy: '3rd Year (Semester 5)',
  marksPercentage: '86.4%',
  
  // Financial
  annualFamilyIncome: 180000,
  incomeCertificateNo: 'REV/TN/2025/INC-9821',
  incomeCertValidUpto: '31 March 2026',
  domicileCertNo: 'TN/DOM/2021/449102',
  
  // Bank
  bankName: 'State Bank of India',
  accountNumberMasked: '••••••••4892',
  ifscCode: 'SBIN0000853',
  npciAadhaarLinked: true,
  
  profileCompletion: 92
};

export const SCHEMES_DATA: Scheme[] = [
  {
    id: 'pre_matric',
    name: 'Pre-Matric Scholarship Scheme for ST Students',
    hindiName: 'अनुसूचित जनजाति के छात्रों हेतु प्री-मैट्रिक छात्रवृत्ति योजना',
    tamilName: 'எஸ்.டி மாணவர்களுக்கான மெட்ரிக் முந்தைய உதவித்தொகை திட்டம்',
    tagline: 'Supporting tribal students in Class IX and X to complete foundational schooling',
    targetGroup: 'ST Students enrolled in Class IX and X in recognized schools',
    educationLevel: 'Secondary School (Classes 9 - 10)',
    incomeLimit: 'Up to ₹2,50,000 per annum',
    financialAssistance: 'Day Scholars: ₹3,500/year | Hostellers: ₹7,000/year + Reader/Disability allowances',
    coverage: 'Centrally sponsored; shared between Centre and States/UTs',
    statusForUser: 'Not Applicable',
    description: 'A flagship scheme designed to minimize dropout rates of ST students between elementary and secondary schooling stages, ensuring continuous educational progression.',
    eligibilityPoints: [
      'Student must belong to a notified Scheduled Tribe (ST) community.',
      'Student must be enrolled in Class IX or X in a Government, Local Body, or recognized private school.',
      'Total annual family income must not exceed ₹2.50 Lakh from all sources.',
      'Student should not be holding any other Central/State scholarship simultaneously.'
    ],
    documentsRequired: [
      'Aadhaar / Authorized Student Identity',
      'ST Community Certificate',
      'Income Certificate issued by Revenue Authority',
      'Previous Class Marksheet',
      'Aadhaar-seeded Bank Account Passbook'
    ]
  },
  {
    id: 'post_matric',
    name: 'Post-Matric Scholarship Scheme for ST Students (PMS-ST)',
    hindiName: 'अनुसूचित जनजाति के छात्रों हेतु पोस्ट-मैट्रिक छात्रवृत्ति योजना',
    tamilName: 'எஸ்.டி மாணவர்களுக்கான மெட்ரிக் பிந்தைய உதவித்தொகை திட்டம்',
    tagline: 'Comprehensive financial support for post-secondary, graduate, and postgraduate studies',
    targetGroup: 'ST students pursuing recognized post-matriculation or post-secondary courses',
    educationLevel: 'Higher Secondary, Diploma, Undergraduate & Postgraduate (Class 11 to Ph.D.)',
    incomeLimit: 'Up to ₹2,50,000 per annum',
    financialAssistance: 'Full compulsory non-refundable fees reimbursement + Maintenance allowance up to ₹13,500/year',
    coverage: 'All recognized universities, colleges, and polytechnics pan-India',
    statusForUser: 'Applied',
    description: 'The largest higher-education welfare initiative by MoTA, empowering ST youth to pursue technical, professional, general, and medical education without financial impediment.',
    eligibilityPoints: [
      'Student must be a permanent resident belonging to a notified Scheduled Tribe.',
      'Must have passed Class X or equivalent from an accredited board.',
      'Must be studying full-time in an AISHE/UDISE+ recognized institution.',
      'Annual family income ceiling of ₹2,50,000.',
      'Only two boys of the same parents can claim benefits (no restriction on daughters).'
    ],
    documentsRequired: [
      'Valid ST Community Certificate (with digital verification ID)',
      'Income Certificate (Current financial year)',
      'Domicile Certificate',
      'Class 10 / 12 / Degree Marksheets',
      'Current Year Fee Receipt and Bonafide Certificate',
      'Active Aadhaar-seeded Bank Account'
    ]
  },
  {
    id: 'top_class',
    name: 'National Scholarship for Higher Education (Top Class Education Scheme)',
    hindiName: 'राष्ट्रीय उच्चतर शिक्षा छात्रवृत्ति (टॉप क्लास शिक्षा योजना)',
    tamilName: 'உயர் கல்விக்கான தேசிய உதவித்தொகை (டாப் கிளாஸ் திட்டம்)',
    tagline: 'Full funding for ST students admitted to notified premier institutes (IITs, IIMs, AIIMS, NITs, NLUs)',
    targetGroup: 'Meritorious ST students securing admission in 250+ notified premier institutions',
    educationLevel: 'Undergraduate and Postgraduate degrees in notified institutions',
    incomeLimit: 'Up to ₹6,00,000 per annum',
    financialAssistance: 'Full tuition fee + living expenses (₹3,000/mo) + books/stationery (₹5,000/yr) + computer aid (₹45,000 one-time)',
    coverage: '259 Premier institutions notified by Ministry of Tribal Affairs',
    statusForUser: 'Eligible',
    description: 'Provides substantial financial grants to meritorious ST students gaining admission to world-class national institutions, ensuring cost is never a barrier to excellence.',
    eligibilityPoints: [
      'Candidate must belong to a Scheduled Tribe.',
      'Must have secured admission in one of the 259 MoTA-notified premier institutions.',
      'Total annual family income must not exceed ₹6,00,000 per annum.',
      'Scholarship continues throughout the course duration subject to satisfactory academic performance.'
    ],
    documentsRequired: [
      'ST Certificate',
      'Income Certificate (up to ₹6 Lakhs)',
      'Allotment Letter / Admission Proof of Notified Premier Institute',
      'Tuition Fee Structure Breakdown attested by Registrar',
      'Aadhaar / APAAR Student ID'
    ]
  },
  {
    id: 'nfst',
    name: 'National Fellowship for Higher Education of ST Students (NFST)',
    hindiName: 'एस.टी. छात्रों हेतु राष्ट्रीय उच्च शिक्षा अध्येतावृत्ति (एन.एफ.एस.टी.)',
    tamilName: 'எஸ்.டி மாணவர்களுக்கான தேசிய உயர்கல்வி ஆய்வு நிதி (NFST)',
    tagline: 'Research fellowship for ST scholars pursuing regular M.Phil. and Ph.D. degrees',
    targetGroup: 'ST scholars registered in regular full-time Ph.D. / M.Phil. programs',
    educationLevel: 'Ph.D. & Integrated Research in UGC-recognized universities',
    incomeLimit: 'No mandatory family income ceiling (Merit & Research proposal based)',
    financialAssistance: 'JRF: ₹37,000/month | SRF: ₹42,000/month + HRA + Contingency up to ₹25,000/year',
    coverage: '750 fresh fellowships awarded annually by Ministry of Tribal Affairs',
    statusForUser: 'Check Eligibility',
    description: 'Designed to inspire tribal researchers to undertake doctoral and post-graduate advanced research across humanities, science, technology, medicine, and social sciences.',
    eligibilityPoints: [
      'Applicant must belong to a Scheduled Tribe.',
      'Must have qualified post-graduation examination with minimum 55% marks.',
      'Must have confirmed registration / admission in regular full-time Ph.D. in a recognized university.',
      'Total tenure is 5 years (2 years JRF + 3 years SRF).'
    ],
    documentsRequired: [
      'ST Certificate',
      'Post-Graduate Degree Certificate & Consolidated Marksheet',
      'Ph.D. Registration / Admission Certificate signed by Dean/Registrar',
      'Synopsis / Research Topic Approval',
      'Guide Joining Report'
    ]
  },
  {
    id: 'nos',
    name: 'National Overseas Scholarship for ST Candidates (NOS)',
    hindiName: 'एस.टी. उम्मीदवारों हेतु राष्ट्रीय विदेशी छात्रवृत्ति (एन.ओ.एस.)',
    tamilName: 'எஸ்.டி வேட்பாளர்களுக்கான தேசிய வெளிநாட்டு உதவித்தொகை (NOS)',
    tagline: 'Overseas scholarship for ST students pursuing Masters & Ph.D. in top 500 QS world universities',
    targetGroup: 'Meritorious ST scholars seeking higher education abroad',
    educationLevel: 'Masters, M.Phil., and Ph.D. programs abroad',
    incomeLimit: 'Up to ₹8,00,000 per annum (Family income)',
    financialAssistance: 'Full tuition fees + Annual maintenance ($15,400 USA / £9,900 UK) + Airfare + Visa fees + Health insurance',
    coverage: '20 fresh awards annually for QS World Ranking top 500 universities',
    statusForUser: 'Check Eligibility',
    description: 'Enables talented tribal youth to access world-class higher education in premier foreign universities across engineering, management, pure sciences, and medicine.',
    eligibilityPoints: [
      'Applicant must belong to a notified Scheduled Tribe.',
      'Must possess unconditional offer letter from a university ranked in top 500 QS World University Rankings.',
      'Minimum 55% or equivalent grade in qualifying degree.',
      'Family income ceiling of ₹8,00,000/year.',
      'Age below 35 years as on 1st April of the selection year.'
    ],
    documentsRequired: [
      'Valid Indian Passport',
      'ST Certificate verified by State Government',
      'Unconditional Offer Letter from Foreign University with QS Rank Proof',
      'Certified English translations of Academic Transcripts',
      'Income Tax Returns / Revenue Income Certificate'
    ]
  }
];

export const INITIAL_APPLICATION: StudentApplication = {
  applicationId: 'MOTA-PMS-2026-001245',
  schemeId: 'post_matric',
  schemeName: 'Post-Matric Scholarship Scheme for ST Students',
  appliedDate: '15 Sep 2026',
  currentStage: 'Ministry Verification',
  overallStatus: 'under_verification',
  academicYear: '2026-2027',
  institutionName: 'Madras Institute of Technology (MIT), Anna University',
  course: 'B.Tech in Computer Science & Engineering (3rd Year)',
  expectedNextAction: 'Income Certificate deficiency resolution pending by student',
  actionRequired: true,
  timeline: [
    {
      title: 'Application Submitted',
      date: '15 Sep 2026, 11:32 AM',
      status: 'completed',
      actor: 'Student (Ravi Kumar)',
      remarks: 'Application submitted successfully with reusable DigiLocker records.'
    },
    {
      title: 'Institution Verification',
      date: '17 Sep 2026, 03:45 PM',
      status: 'completed',
      actor: 'MIT Anna University Verification Nodal Officer',
      remarks: 'Enrolment, regular attendance (88%), and course fees validated.'
    },
    {
      title: 'State Welfare Verification',
      date: '19 Sep 2026, 05:10 PM',
      status: 'completed',
      actor: 'Adi Dravidar and Tribal Welfare Dept, Tamil Nadu',
      remarks: 'ST Community status and domicile cross-checked with State e-District database.'
    },
    {
      title: 'Ministry Verification & Scrutiny',
      date: 'In Progress (Active Stage)',
      status: 'action_required',
      actor: 'Ministry of Tribal Affairs Central Scrutiny Cell',
      remarks: 'Discrepancy flagged: Income certificate REV/TN/2025/INC-9821 has mismatch in digital stamp. Please upload refreshed certificate.'
    },
    {
      title: 'Sanction Order Generation',
      date: 'Pending',
      status: 'pending',
      actor: 'MoTA Direct Benefit Sanctioning Authority',
      remarks: 'Awaiting clearance of income certificate verification.'
    },
    {
      title: 'Direct Benefit Transfer (DBT)',
      date: 'Pending',
      status: 'pending',
      actor: 'PFMS & NPCI Aadhaar Payment Bridge',
      remarks: 'Installment 3 (₹20,000) queued for DBT upon sanction.'
    }
  ]
};

export const INITIAL_VERIFICATIONS: VerificationItem[] = [
  {
    id: 'v-identity',
    title: 'Identity & Aadhaar Authentication',
    source: 'UIDAI Aadhaar Data Vault (Masked)',
    status: 'verified',
    lastChecked: '15 Sep 2026',
    referenceNumber: 'UIDAI-AUTH-90142-OK',
    message: 'Demographic match successful with 99.4% confidence score.'
  },
  {
    id: 'v-st',
    title: 'Scheduled Tribe Community Status',
    source: 'Tamil Nadu e-District Tribal Database & DigiLocker',
    status: 'verified',
    lastChecked: '16 Sep 2026',
    referenceNumber: 'TN-EDIST-ST-KURUMBAS-4819',
    message: 'Notified Scheduled Tribe (Kurumbas - PVTG Category) confirmed.'
  },
  {
    id: 'v-academic',
    title: 'Academic Record & Enrolment',
    source: 'APAAR / UDISE+ / Anna University COE',
    status: 'verified',
    lastChecked: '17 Sep 2026',
    referenceNumber: 'APAAR-MIT-CSE-SEM5-REG',
    message: 'Confirmed ongoing enrolment in B.Tech CSE with 86.4% cumulative.'
  },
  {
    id: 'v-institution',
    title: 'Institution Accreditation & AISHE Status',
    source: 'Ministry of Education AISHE Registry',
    status: 'verified',
    lastChecked: '17 Sep 2026',
    referenceNumber: 'AISHE-U-0442-APPROVED',
    message: 'Anna University MIT campus is eligible under central funding norms.'
  },
  {
    id: 'v-income',
    title: 'Annual Family Income Verification',
    source: 'Revenue Dept e-District Portal',
    status: 'action_required',
    lastChecked: '20 Sep 2026',
    referenceNumber: 'REV-TN-INC-PENDING',
    message: 'The information could not be automatically matched. Digital signature hash mismatch. Please upload a clear refreshed copy.'
  },
  {
    id: 'v-domicile',
    title: 'State Domicile Status',
    source: 'State Resident Data Hub (SRDH)',
    status: 'verified',
    lastChecked: '16 Sep 2026',
    referenceNumber: 'TN-DOM-2021-OK',
    message: 'Permanent residency in The Nilgiris district confirmed.'
  },
  {
    id: 'v-bank',
    title: 'Bank Account & NPCI Aadhaar Mapping',
    source: 'Public Financial Management System (PFMS) & NPCI',
    status: 'verified',
    lastChecked: '18 Sep 2026',
    referenceNumber: 'PFMS-NPCI-SEED-OK',
    message: 'State Bank of India account is Aadhaar-seeded and active for APBS transfers.'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-st',
    name: 'Scheduled Tribe Community Certificate',
    category: 'Community',
    status: 'verified',
    source: 'Authorized Government Source (DigiLocker)',
    dateVerified: '16 Sep 2026',
    fileName: 'ST_Certificate_Kurumbas_TN.pdf',
    fileSize: '412 KB',
    certificateNumber: 'TN/NIL/ST/2021/004819',
    issueAuthority: 'Tahsildar, Udhagamandalam',
    issueDate: '12 Jul 2021'
  },
  {
    id: 'doc-income',
    name: 'Family Income Certificate (FY 2025-26)',
    category: 'Income',
    status: 'action_required',
    source: 'Uploaded by Student (e-District Match Failed)',
    dateVerified: '20 Sep 2026',
    fileName: 'Income_Certificate_2025_Scan.pdf',
    fileSize: '680 KB',
    certificateNumber: 'REV/TN/2025/INC-9821',
    issueAuthority: 'Revenue Divisional Officer, Coonoor',
    issueDate: '15 Aug 2025',
    deficiencyReason: 'Certificate details could not be matched with submitted data. Digital QR code is obscured in current scan.'
  },
  {
    id: 'doc-marksheet-12',
    name: 'Higher Secondary (Class XII) Mark Sheet',
    category: 'Education',
    status: 'verified',
    source: 'Tamil Nadu State Board / DigiLocker',
    dateVerified: '15 Sep 2026',
    fileName: 'HSC_PlusTwo_Marksheet.pdf',
    fileSize: '310 KB',
    certificateNumber: 'TN-HSC-2022-81920',
    issueAuthority: 'Directorate of Government Examinations, TN',
    issueDate: '20 May 2022'
  },
  {
    id: 'doc-bonafide',
    name: 'College Bonafide & Enrolment Certificate',
    category: 'Education',
    status: 'verified',
    source: 'Institution Portal (Anna University AISHE)',
    dateVerified: '17 Sep 2026',
    fileName: 'Bonafide_Certificate_MIT_2026.pdf',
    fileSize: '540 KB',
    certificateNumber: 'MIT/STUD/2026/0491',
    issueAuthority: 'Dean, Madras Institute of Technology',
    issueDate: '01 Sep 2026'
  },
  {
    id: 'doc-domicile',
    name: 'Nativity & Domicile Certificate',
    category: 'Domicile',
    status: 'verified',
    source: 'State e-District Portal',
    dateVerified: '15 Sep 2026',
    fileName: 'Domicile_Certificate_Nilgiris.pdf',
    fileSize: '290 KB',
    certificateNumber: 'TN/DOM/2021/449102',
    issueAuthority: 'Sub-Collector, The Nilgiris',
    issueDate: '14 Aug 2021'
  },
  {
    id: 'doc-aadhaar',
    name: 'Aadhaar Identity Verification Record',
    category: 'Identity',
    status: 'verified',
    source: 'UIDAI Authorized Verification',
    dateVerified: '15 Sep 2026',
    fileName: 'UIDAI_Masked_eAadhaar.pdf',
    fileSize: '180 KB',
    certificateNumber: 'UIDAI-VERIFIED-XXXX-4192',
    issueAuthority: 'UIDAI',
    issueDate: '01 Jun 2026'
  },
  {
    id: 'doc-bank',
    name: 'Bank Passbook & Mandate Form',
    category: 'Bank',
    status: 'verified',
    source: 'PFMS NPCI Verification Service',
    dateVerified: '18 Sep 2026',
    fileName: 'SBI_Passbook_NPCI_Seeded.pdf',
    fileSize: '490 KB',
    certificateNumber: 'SBIN-NPCI-MAPPED-4892',
    issueAuthority: 'State Bank of India',
    issueDate: '10 Jan 2024'
  },
  {
    id: 'doc-fees',
    name: 'Semester Tuition Fee Receipt',
    category: 'Education',
    status: 'verified',
    source: 'Anna University Online Fee Portal',
    dateVerified: '17 Sep 2026',
    fileName: 'MIT_Tuition_Fee_Receipt_Sem5.pdf',
    fileSize: '320 KB',
    certificateNumber: 'AU-MIT-FEE-2026-9921',
    issueAuthority: 'Finance Officer, Anna University',
    issueDate: '28 Aug 2026'
  },
  {
    id: 'doc-pvtg',
    name: 'Particularly Vulnerable Tribal Group (PVTG) Certificate',
    category: 'Community',
    status: 'verified',
    source: 'District Tribal Welfare Department',
    dateVerified: '16 Sep 2026',
    fileName: 'PVTG_Endorsement_Kurumbas.pdf',
    fileSize: '340 KB',
    certificateNumber: 'TN-TWD-PVTG-0081',
    issueAuthority: 'District Welfare Officer, Nilgiris',
    issueDate: '15 Jul 2021'
  }
];

export const INITIAL_PAYMENTS: PaymentItem[] = [
  {
    id: 'PAY-2026-01',
    schemeId: 'post_matric',
    schemeName: 'Post-Matric Scholarship Scheme for ST Students',
    installmentNo: 1,
    amount: 15000,
    status: 'paid',
    date: '20 Aug 2026',
    pfmsTransactionId: 'PFMS20260820881920',
    bankName: 'State Bank of India',
    accountMasked: '••••••••4892',
    dbtStatus: 'Aadhaar NPCI Seeded',
    financialYear: '2026-27 (Installment 1 - Academic Allowance)'
  },
  {
    id: 'PAY-2026-02',
    schemeId: 'post_matric',
    schemeName: 'Post-Matric Scholarship Scheme for ST Students',
    installmentNo: 2,
    amount: 10000,
    status: 'paid',
    date: '15 Sep 2026',
    pfmsTransactionId: 'PFMS20260915994012',
    bankName: 'State Bank of India',
    accountMasked: '••••••••4892',
    dbtStatus: 'Aadhaar NPCI Seeded',
    financialYear: '2026-27 (Installment 2 - Maintenance Grant)'
  },
  {
    id: 'PAY-2026-03',
    schemeId: 'post_matric',
    schemeName: 'Post-Matric Scholarship Scheme for ST Students',
    installmentNo: 3,
    amount: 20000,
    status: 'processing',
    date: 'Expected Oct 2026',
    pfmsTransactionId: 'PFMS-PENDING-SANCTION',
    bankName: 'State Bank of India',
    accountMasked: '••••••••4892',
    dbtStatus: 'Aadhaar NPCI Seeded',
    financialYear: '2026-27 (Remaining Installment - Fee Reimbursement)'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Income Certificate Requires Attention',
    message: 'The Ministry scrutiny team flagged that your income certificate could not be automatically verified. Please re-upload a clear copy with readable QR code.',
    type: 'deficiency',
    date: '21 Sep 2026, 10:15 AM',
    read: false,
    actionRoute: 'deficiency'
  },
  {
    id: 'notif-2',
    title: 'Institution Verification Completed',
    message: 'Madras Institute of Technology Nodal Officer has successfully verified your enrolment and 5th-semester attendance.',
    type: 'verification',
    date: '17 Sep 2026, 03:46 PM',
    read: true,
    actionRoute: 'tracking'
  },
  {
    id: 'notif-3',
    title: 'Scholarship Payment of ₹10,000 Disbursed',
    message: 'Direct Benefit Transfer (DBT) of ₹10,000 has been credited to your Aadhaar-linked SBI Account (••••4892) via PFMS.',
    type: 'payment',
    date: '15 Sep 2026, 02:18 PM',
    read: true,
    actionRoute: 'payments'
  },
  {
    id: 'notif-4',
    title: 'State Welfare Dept Verification Cleared',
    message: 'Adi Dravidar and Tribal Welfare Department, Tamil Nadu has validated your ST community credentials.',
    type: 'verification',
    date: '19 Sep 2026, 05:12 PM',
    read: true,
    actionRoute: 'verification'
  },
  {
    id: 'notif-5',
    title: 'Application MOTA-PMS-2026-001245 Received',
    message: 'Your application for Post-Matric Scholarship Scheme for ST Students was received and assigned to scrutiny.',
    type: 'application',
    date: '15 Sep 2026, 11:32 AM',
    read: true,
    actionRoute: 'tracking'
  }
];

export const CONNECTED_SYSTEMS: ConnectedSystem[] = [
  {
    id: 'sys-nsp',
    name: 'National Scholarship Portal (NSP)',
    acronym: 'NSP 2.0',
    category: 'Existing Portal',
    status: 'Connected',
    description: 'Central portal handling national and state welfare scholarship disbursements.',
    lastSync: 'Today, 22:45',
    recordsChecked: 142900,
    apiProtocol: 'REST / OpenNIC Bridge'
  },
  {
    id: 'sys-sfmp',
    name: 'Scholarship Fellowship Management Portal',
    acronym: 'SFMP',
    category: 'Existing Portal',
    status: 'Connected',
    description: 'MoTA proprietary portal for managing National Fellowship for ST Students (NFST).',
    lastSync: 'Today, 22:15',
    recordsChecked: 8750,
    apiProtocol: 'e-Gov XML-RPC Gateway'
  },
  {
    id: 'sys-nos',
    name: 'National Overseas Scholarship Portal',
    acronym: 'NOS Portal',
    category: 'Existing Portal',
    status: 'Connected',
    description: 'Dedicated platform for overseas postgraduate and doctoral scholarship clearances.',
    lastSync: 'Today, 21:00',
    recordsChecked: 420,
    apiProtocol: 'Secure MEA/MoTA TLS'
  },
  {
    id: 'sys-digilocker',
    name: 'DigiLocker Document Exchange',
    acronym: 'DigiLocker',
    category: 'Identity & Education',
    status: 'Simulated Live',
    description: 'Authorized digital repository for instantly fetching verified certificates directly from issuing authorities.',
    lastSync: 'Real-time',
    recordsChecked: 320140,
    apiProtocol: 'Digital India OAuth 2.0'
  },
  {
    id: 'sys-apaar',
    name: 'Automated Permanent Academic Account Registry',
    acronym: 'APAAR / ABC',
    category: 'Identity & Education',
    status: 'Simulated Live',
    description: 'One Nation One Student ID system syncing academic credits and genuine college enrolments.',
    lastSync: 'Today, 20:30',
    recordsChecked: 89400,
    apiProtocol: 'NKN / MoE API'
  },
  {
    id: 'sys-udise',
    name: 'Unified District Information System for Education',
    acronym: 'UDISE+ / AISHE',
    category: 'Identity & Education',
    status: 'Connected',
    description: 'Ministry of Education database verifying accredited schools, colleges, and university codes.',
    lastSync: 'Today, 19:10',
    recordsChecked: 51200,
    apiProtocol: 'AISHE Service Mesh'
  },
  {
    id: 'sys-uidai',
    name: 'Unique Identification Authority of India',
    acronym: 'UIDAI e-KYC',
    category: 'Identity & Education',
    status: 'Integration Placeholder',
    description: 'Authorized non-biometric masked identity verification and demographic integrity checks.',
    lastSync: 'Real-time On-Demand',
    recordsChecked: 954000,
    apiProtocol: 'UIDAI Auth API v2.5'
  },
  {
    id: 'sys-edistrict',
    name: 'State e-District / Revenue Portals',
    acronym: 'e-District 28 States',
    category: 'State & Verification',
    status: 'Connected',
    description: 'Decentralized state revenue engines for instant ST caste and income certificate verification.',
    lastSync: 'Today, 22:30',
    recordsChecked: 68120,
    apiProtocol: 'State Data Hub REST'
  },
  {
    id: 'sys-ugc',
    name: 'University Grants Commission & NTA Portal',
    acronym: 'UGC / NTA',
    category: 'State & Verification',
    status: 'Connected',
    description: 'Direct verification of UGC-NET / CSIR-NET rankings and research fellowship admissions.',
    lastSync: 'Today, 18:00',
    recordsChecked: 14200,
    apiProtocol: 'UGC Research Gateway'
  }
];

export const STATE_COVERAGE_INSIGHTS: StateCoverageData[] = [
  {
    state: 'Odisha',
    stPopulation: 9590756,
    estimatedEligibleStudents: 384000,
    currentScholarshipBeneficiaries: 312500,
    coveragePercentage: 81.4,
    unreachedGap: 71500,
    primaryScheme: 'Post-Matric Scholarship'
  },
  {
    state: 'Jharkhand',
    stPopulation: 8645042,
    estimatedEligibleStudents: 345000,
    currentScholarshipBeneficiaries: 272000,
    coveragePercentage: 78.8,
    unreachedGap: 73000,
    primaryScheme: 'Post-Matric Scholarship'
  },
  {
    state: 'Madhya Pradesh',
    stPopulation: 15316784,
    estimatedEligibleStudents: 612000,
    currentScholarshipBeneficiaries: 468000,
    coveragePercentage: 76.5,
    unreachedGap: 144000,
    primaryScheme: 'Pre-Matric & Post-Matric'
  },
  {
    state: 'Chhattisgarh',
    stPopulation: 7822902,
    estimatedEligibleStudents: 312000,
    currentScholarshipBeneficiaries: 248000,
    coveragePercentage: 79.5,
    unreachedGap: 64000,
    primaryScheme: 'Post-Matric Scholarship'
  },
  {
    state: 'Tamil Nadu',
    stPopulation: 794697,
    estimatedEligibleStudents: 38000,
    currentScholarshipBeneficiaries: 34200,
    coveragePercentage: 90.0,
    unreachedGap: 3800,
    primaryScheme: 'Post-Matric & Top Class'
  },
  {
    state: 'Assam',
    stPopulation: 3884371,
    estimatedEligibleStudents: 155000,
    currentScholarshipBeneficiaries: 119000,
    coveragePercentage: 76.8,
    unreachedGap: 36000,
    primaryScheme: 'Pre-Matric & Post-Matric'
  },
  {
    state: 'Rajasthan',
    stPopulation: 9238534,
    estimatedEligibleStudents: 369000,
    currentScholarshipBeneficiaries: 295000,
    coveragePercentage: 79.9,
    unreachedGap: 74000,
    primaryScheme: 'Post-Matric Scholarship'
  }
];

export const ADMIN_APPLICATIONS: AdminApplicationRecord[] = [
  {
    id: 'ADM-01',
    applicationId: 'MOTA-PMS-2026-001245',
    studentName: 'Ravi Kumar',
    avatarUrl: '/src/assets/images/student_avatar_ravi_1790316158644.jpg',
    schemeId: 'post_matric',
    schemeName: 'Post-Matric Scholarship',
    state: 'Tamil Nadu',
    district: 'The Nilgiris',
    institution: 'Madras Institute of Technology (MIT)',
    verificationPercentage: 85,
    status: 'action_required',
    lastUpdated: 'Today, 10:15 AM',
    flaggedDeficiency: true,
    incomeAmount: 180000,
    stVerified: true,
    dbtReady: true
  },
  {
    id: 'ADM-02',
    applicationId: 'MOTA-TCS-2026-001246',
    studentName: 'Anita Devi',
    schemeId: 'top_class',
    schemeName: 'Top Class Scholarship',
    state: 'Odisha',
    district: 'Mayurbhanj',
    institution: 'IIT Bhubaneswar',
    verificationPercentage: 100,
    status: 'approved',
    lastUpdated: 'Yesterday, 04:30 PM',
    flaggedDeficiency: false,
    incomeAmount: 220000,
    stVerified: true,
    dbtReady: true
  },
  {
    id: 'ADM-03',
    applicationId: 'MOTA-NFST-2026-000892',
    studentName: 'Suresh Nayak',
    schemeId: 'nfst',
    schemeName: 'National Fellowship (NFST)',
    state: 'Jharkhand',
    district: 'Ranchi',
    institution: 'Central University of Jharkhand',
    verificationPercentage: 90,
    status: 'under_verification',
    lastUpdated: 'Yesterday, 02:15 PM',
    flaggedDeficiency: false,
    incomeAmount: 150000,
    stVerified: true,
    dbtReady: true
  },
  {
    id: 'ADM-04',
    applicationId: 'MOTA-NOS-2026-000104',
    studentName: 'Pooja Marandi',
    schemeId: 'nos',
    schemeName: 'National Overseas Scholarship',
    state: 'Jharkhand',
    district: 'Dumka',
    institution: 'University of Edinburgh, UK',
    verificationPercentage: 75,
    status: 'under_verification',
    lastUpdated: '22 Sep 2026',
    flaggedDeficiency: false,
    incomeAmount: 480000,
    stVerified: true,
    dbtReady: false
  },
  {
    id: 'ADM-05',
    applicationId: 'MOTA-PMS-2026-003891',
    studentName: 'Bikram Gond',
    schemeId: 'pre_matric',
    schemeName: 'Pre-Matric Scholarship',
    state: 'Madhya Pradesh',
    district: 'Dindori',
    institution: 'Eklavya Model Residential School',
    verificationPercentage: 100,
    status: 'sanctioned',
    lastUpdated: '21 Sep 2026',
    flaggedDeficiency: false,
    incomeAmount: 95000,
    stVerified: true,
    dbtReady: true
  }
];

export const FAMILY_MEMBERS_DATA = [
  {
    relation: 'Father / Guardian',
    name: 'M. Selvan Kumar',
    occupation: 'Traditional Cultivator & Forest Produce Worker',
    annualIncome: '₹1,80,000',
    scholarshipStatus: 'No active application (Guardian profile)',
    badge: 'Guardian'
  },
  {
    relation: 'Child 1 (Current Student)',
    name: 'Ravi Kumar',
    education: '3rd Year B.Tech, Madras Institute of Technology (MIT)',
    activeScheme: 'Post-Matric Scholarship (PMS-ST)',
    sanctionedAmount: '₹45,000',
    disbursedAmount: '₹25,000',
    status: 'Active (Installment 3 Processing)',
    badge: 'Higher Education'
  },
  {
    relation: 'Child 2 (Sister)',
    name: 'Priya Kumar',
    education: 'Class X, Government Tribal Residential Higher Secondary School, Ooty',
    activeScheme: 'Pre-Matric Scholarship for ST Students',
    sanctionedAmount: '₹7,000',
    disbursedAmount: '₹7,000',
    status: 'Disbursed (Full Benefit Received)',
    badge: 'Secondary School'
  },
  {
    relation: 'Child 3 (Brother)',
    name: 'Karthik Kumar',
    education: 'Class VI, Government Middle School, Nilgiris',
    activeScheme: 'No scholarship application found',
    sanctionedAmount: '₹0',
    disbursedAmount: '₹0',
    status: 'Eligible for Pre-Matric in Class IX',
    badge: 'Primary Education'
  }
];
