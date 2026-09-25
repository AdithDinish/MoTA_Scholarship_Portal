import React, { createContext, useContext, useState } from 'react';
import {
  Language,
  UserRole,
  StudentProfile,
  StudentApplication,
  DocumentItem,
  VerificationItem,
  PaymentItem,
  NotificationItem,
  AdminApplicationRecord,
  SchemeId
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_APPLICATION,
  INITIAL_VERIFICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_PAYMENTS,
  INITIAL_NOTIFICATIONS,
  ADMIN_APPLICATIONS
} from '../data/mockData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'jago';
  text: string;
  timestamp: string;
  sourceNote?: string;
  suggestedActions?: { label: string; tab: string }[];
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  student: StudentProfile;
  application: StudentApplication;
  verifications: VerificationItem[];
  documents: DocumentItem[];
  payments: PaymentItem[];
  notifications: NotificationItem[];
  adminApplications: AdminApplicationRecord[];
  chatMessages: ChatMessage[];
  selectedSchemeForApply: SchemeId | null;
  setSelectedSchemeForApply: (id: SchemeId | null) => void;
  
  // Actions
  resolveIncomeDeficiency: (fileName?: string) => void;
  uploadNewDocument: (category: DocumentItem['category'], name: string, file: File | null) => void;
  importDigiLockerDoc: (docType: string) => void;
  markNotificationAsRead: (id: string) => void;
  sendJagoMessage: (text: string) => void;
  adminUpdateStatus: (id: string, newStatus: AdminApplicationRecord['status']) => void;
  resetDemoData: () => void;
  triggerScenario: (scenarioId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedSchemeForApply, setSelectedSchemeForApply] = useState<SchemeId | null>(null);

  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [application, setApplication] = useState<StudentApplication>(INITIAL_APPLICATION);
  const [verifications, setVerifications] = useState<VerificationItem[]>(INITIAL_VERIFICATIONS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [payments] = useState<PaymentItem[]>(INITIAL_PAYMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [adminApplications, setAdminApplications] = useState<AdminApplicationRecord[]>(ADMIN_APPLICATIONS);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'jago',
      text: 'Namaste Ravi! I am JAGO, your Ministry of Tribal Affairs Scholarship Assistant. How can I help you today? You can ask me about your Post-Matric application status, required documents, DBT payment schedule, or eligibility for other schemes.',
      timestamp: '10:00 AM',
      sourceNote: 'JAGO responses are based on verified information available through connected MoTA systems.',
      suggestedActions: [
        { label: 'Why is my application pending?', tab: 'tracking' },
        { label: 'What documents do I need?', tab: 'documents' },
        { label: 'When will I get my next payment?', tab: 'payments' },
        { label: 'Check other schemes I can apply for', tab: 'schemes' }
      ]
    }
  ]);

  const resolveIncomeDeficiency = (fileName: string = 'Income_Certificate_2025_Reissued_Clear.pdf') => {
    // 1. Update Documents
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === 'doc-income'
          ? {
              ...doc,
              status: 'pending',
              fileName: fileName,
              source: 'Re-submitted via Tamil Nadu e-District Portal',
              dateVerified: 'Just now (Verification queued)',
              deficiencyReason: undefined
            }
          : doc
      )
    );

    // 2. Update Verifications
    setVerifications(prev =>
      prev.map(v =>
        v.id === 'v-income'
          ? {
              ...v,
              status: 'pending',
              lastChecked: 'Today (Just now)',
              message: 'Corrected certificate uploaded. Automated verification in progress with State Revenue database.'
            }
          : v
      )
    );

    // 3. Update Application
    setApplication(prev => ({
      ...prev,
      actionRequired: false,
      expectedNextAction: 'Automated verification in progress (Est. 24-48 hours)',
      timeline: [
        ...prev.timeline.slice(0, 3),
        {
          title: 'Deficiency Corrected by Student',
          date: 'Just now',
          status: 'completed',
          actor: 'Student (Ravi Kumar)',
          remarks: 'Updated Income Certificate re-uploaded with valid QR barcode.'
        },
        {
          title: 'Ministry Verification & Scrutiny',
          date: 'Queued for final clearance',
          status: 'in_progress',
          actor: 'MoTA Central Scrutiny Cell',
          remarks: 'Awaiting automatic digital signature validation.'
        },
        prev.timeline[4],
        prev.timeline[5]
      ]
    }));

    // 4. Update Notifications
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Income Certificate Re-submitted',
        message: 'Your corrected income certificate has been queued for verification. No further action needed right now.',
        type: 'verification',
        date: 'Just now',
        read: false,
        actionRoute: 'tracking'
      },
      ...prev
    ]);

    // 5. Update Admin Applications view
    setAdminApplications(prev =>
      prev.map(app =>
        app.applicationId === 'MOTA-PMS-2026-001245'
          ? {
              ...app,
              flaggedDeficiency: false,
              status: 'under_verification',
              verificationPercentage: 92,
              lastUpdated: 'Just now'
            }
          : app
      )
    );

    // 6. Update student profile completion
    setStudent(prev => ({ ...prev, profileCompletion: 96 }));
  };

  const uploadNewDocument = (category: DocumentItem['category'], name: string, _file: File | null) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: name,
      category: category,
      status: 'pending',
      source: 'Student Upload',
      dateVerified: 'Just now',
      fileName: `${name.replace(/\s+/g, '_')}.pdf`,
      fileSize: '512 KB',
      issueAuthority: 'Self-Uploaded for Verification'
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const importDigiLockerDoc = (docType: string) => {
    const newDoc: DocumentItem = {
      id: `doc-dl-${Date.now()}`,
      name: docType,
      category: 'Education',
      status: 'verified',
      source: 'DigiLocker Authorized Government Repository',
      dateVerified: 'Just now (Instant OAuth 2.0 Sync)',
      fileName: `${docType.replace(/\s+/g, '_')}_DigiLocker_Verified.pdf`,
      fileSize: '320 KB',
      certificateNumber: `DL-GOV-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      issueAuthority: 'Authorized Issuing Authority via DigiLocker',
      issueDate: '01 Jan 2026'
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const sendJagoMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Generate accurate, context-aware government response
    setTimeout(() => {
      let botResponse = '';
      let sourceNote = 'JAGO responses are based on information available through connected systems.';
      let actions: { label: string; tab: string }[] | undefined;

      const lower = text.toLowerCase();

      if (lower.includes('document') || lower.includes('need') || lower.includes('upload')) {
        botResponse = `For your current Post-Matric Scholarship application (MOTA-PMS-2026-001245), your ST Certificate, Higher Secondary Marksheet, College Bonafide, and Bank Passbook are fully verified. You currently have 8 verified documents. Reusable verified records are stored in your Document Wallet so you never have to re-upload them for future renewals.`;
        actions = [
          { label: 'Open Document Wallet', tab: 'documents' },
          { label: 'Check Income Certificate', tab: 'deficiency' }
        ];
      } else if (lower.includes('pending') || lower.includes('status') || lower.includes('why')) {
        if (application.actionRequired) {
          botResponse = `Your Post-Matric Scholarship application is currently at the 'Ministry Verification & Scrutiny' stage. A deficiency was flagged regarding your Family Income Certificate (mismatch in digital QR hash). Please resolve this deficiency to proceed with the sanction order.`;
          actions = [
            { label: 'Resolve Income Certificate Now', tab: 'deficiency' },
            { label: 'View Application Timeline', tab: 'tracking' }
          ];
        } else {
          botResponse = `Your Post-Matric Scholarship application is currently undergoing final Ministry scrutiny. All institution and state welfare checks are completed (100% cleared). No action is required from you at this time.`;
          actions = [{ label: 'Track Application', tab: 'tracking' }];
        }
      } else if (lower.includes('payment') || lower.includes('dbt') || lower.includes('money') || lower.includes('when')) {
        botResponse = `Your total sanctioned scholarship is ₹45,000 for academic year 2026-27. ₹25,000 has been disbursed across two installments via PFMS into your Aadhaar-seeded SBI account (••••4892). The remaining ₹20,000 (tuition fee reimbursement) is in 'Processing' status and will be credited directly upon final ministry clearance.`;
        actions = [{ label: 'View DBT Payment History', tab: 'payments' }];
      } else if (lower.includes('apply') || lower.includes('other') || lower.includes('scheme') || lower.includes('top class')) {
        botResponse = `Based on your profile (Kurumbas ST, B.Tech CSE at MIT Anna University, family income ₹1,80,000), you are already receiving the Post-Matric Scholarship. You also appear potentially eligible for the Top Class Scholarship if MIT is notified under premier technical institutes. Note that central rules permit availing only one full scholarship at a time for the same course duration.`;
        actions = [
          { label: 'Check Scheme Overview', tab: 'overview' },
          { label: 'Run Eligibility Checker', tab: 'eligibility' }
        ];
      } else if (lower.includes('eligib') || lower.includes('check')) {
        botResponse = `You appear eligible for Post-Matric and Top Class schemes based on your verified Scheduled Tribe status and family income (< ₹2.5 Lakh). You can test any combination in our Interactive Eligibility Checker. Final eligibility is always subject to official verification.`;
        actions = [{ label: 'Start Eligibility Checker', tab: 'eligibility' }];
      } else if (language === 'hi' || lower.includes('hindi') || lower.includes('नमस्ते')) {
        botResponse = `नमस्ते रवि! आपकी पोस्ट-मैट्रिक छात्रवृत्ति आवेदन स्थिति वर्तमान में मंत्रालय सत्यापन चरण में है। कुल स्वीकृत ₹45,000 में से ₹25,000 का डीबीटी भुगतान आपके आधार से जुड़े एसबीआई खाते में सफलतापूर्वक भेजा जा चुका है।`;
        actions = [{ label: 'आवेदन ट्रैक करें', tab: 'tracking' }];
      } else if (language === 'ta' || lower.includes('tamil') || lower.includes('வணக்கம்')) {
        botResponse = `வணக்கம் ரவி! உங்கள் போஸ்ட்-மெட்ரிக் உதவித்தொகை விண்ணப்பம் தற்போது அமைச்சக சரிபார்ப்பு நிலையில் உள்ளது. அனுமதிக்கப்பட்ட ₹45,000-ல் ₹25,000 உங்கள் வங்கிக் கணக்கில் டிபிடி மூலம் செலுத்தப்பட்டுள்ளது.`;
        actions = [{ label: 'விண்ணப்பத்தைக் கண்காணிக்கவும்', tab: 'tracking' }];
      } else {
        botResponse = `I have cross-checked the MoTA unified database for Application ID MOTA-PMS-2026-001245. Your ST credentials, institution enrolment, and Aadhaar-seeded bank status are in order. How else can I assist your scholarship journey?`;
        actions = [
          { label: 'Track Application', tab: 'tracking' },
          { label: 'View Payments', tab: 'payments' }
        ];
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'jago',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceNote,
        suggestedActions: actions
      };

      setChatMessages(m => [...m, botMsg]);
    }, 600);
  };

  const adminUpdateStatus = (id: string, newStatus: AdminApplicationRecord['status']) => {
    setAdminApplications(prev =>
      prev.map(app =>
        app.applicationId === id
          ? {
              ...app,
              status: newStatus,
              verificationPercentage: newStatus === 'approved' ? 100 : app.verificationPercentage,
              flaggedDeficiency: newStatus === 'action_required',
              lastUpdated: 'Just now by Officer'
            }
          : app
      )
    );
  };

  const resetDemoData = () => {
    setStudent(INITIAL_STUDENT_PROFILE);
    setApplication(INITIAL_APPLICATION);
    setVerifications(INITIAL_VERIFICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAdminApplications(ADMIN_APPLICATIONS);
    setActiveTab('home');
  };

  const triggerScenario = (scenarioId: string) => {
    switch (scenarioId) {
      case 'dashboard':
        setRole('student');
        setActiveTab('home');
        break;
      case 'deficiency':
        setRole('student');
        setActiveTab('deficiency');
        break;
      case 'resolved':
        resolveIncomeDeficiency();
        setActiveTab('tracking');
        break;
      case 'tracking':
        setRole('student');
        setActiveTab('tracking');
        break;
      case 'documents':
        setRole('student');
        setActiveTab('documents');
        break;
      case 'payments':
        setRole('student');
        setActiveTab('payments');
        break;
      case 'schemes':
        setRole('student');
        setActiveTab('schemes');
        break;
      case 'eligibility':
        setRole('student');
        setActiveTab('eligibility');
        break;
      case 'apply':
        setRole('student');
        setSelectedSchemeForApply('top_class');
        setActiveTab('apply');
        break;
      case 'family':
        setRole('student');
        setActiveTab('family');
        break;
      case 'jago':
        setRole('student');
        setActiveTab('jago');
        break;
      case 'admin':
        setRole('admin');
        setActiveTab('admin_dashboard');
        break;
      case 'onboarding':
        setRole('student');
        setActiveTab('onboarding');
        break;
      default:
        setActiveTab('home');
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        student,
        application,
        verifications,
        documents,
        payments,
        notifications,
        adminApplications,
        chatMessages,
        selectedSchemeForApply,
        setSelectedSchemeForApply,
        resolveIncomeDeficiency,
        uploadNewDocument,
        importDigiLockerDoc,
        markNotificationAsRead,
        sendJagoMessage,
        adminUpdateStatus,
        resetDemoData,
        triggerScenario
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
