export interface ServiceItem {
  num: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  longDescEn: string;
  longDescAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
  targetAudienceEn: string[];
  targetAudienceAr: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    num: "01",
    titleEn: "Training Needs Analysis (TNA) Assistance",
    titleAr: "تحليل الاحتياجات التدريبية (TNA)",
    descEn: "Turn a client request into a defensible learning need.",
    descAr: "تحويل طلب العميل الأولي إلى احتياج تدريبي دقيق ومثبت.",
    longDescEn:
      "Freelance trainers can access structured support to diagnose performance and capability gaps before proposing a training intervention. The Hub can provide TNA frameworks, interview and survey templates, competency-gap tools, stakeholder-question guides, and support in interpreting findings. This helps trainers move beyond simply accepting a requested course title and instead recommend solutions that are aligned with the client's actual business and capability needs.",
    longDescAr:
      "يمكن للمدربين المستقلين الوصول إلى دعم هيكلي لتشخيص فجوات الأداء والقدرات قبل اقتراح أي برنامج تدريبي. يوفر المركز أطر عمل TNA، ونماذج المقابلات والاستبيانات، وأدوات قياس فجوات الجدارات، وأدلة توجيه أسئلة أصحاب المصلحة، بالإضافة إلى الدعم في تحليل النتائج. يتيح ذلك للمدربين الانتقال من مجرد قبول عنوان الدورة المطلوبة إلى تقديم حلول تدريبية تتوافق مع الأهداف الفعلية والاحتياجات المؤسسية للعميل.",
    deliverablesEn: [
      "TNA Diagnostic Frameworks & Competency Gap Tools",
      "Interview & Survey Questionnaire Templates",
      "Stakeholder Findings Interpretation Support",
    ],
    deliverablesAr: [
      "أطر تشخيص TNA وأدوات قياس فجوات الجدارات",
      "نماذج الاستبيانات ودليل المقابلات المعيارية",
      "دعم تحليل النتائج وتفسير احتياجات أصحاب المصلحة",
    ],
    targetAudienceEn: ["Corporate Trainers", "L&D Consultants", "HR Managers"],
    targetAudienceAr: [
      "المدربون المؤسسيون",
      "استشاريو التعلم والتطوير",
      "مدراء الموارد البشرية",
    ],
  },
  {
    num: "02",
    titleEn: "Program Mapping & Learning Architecture",
    titleAr: "هيكلة البرامج والمسارات التدريبية",
    descEn: "Convert identified needs into a coherent learning journey.",
    descAr: "تحويل الاحتياجات المحددة إلى مسار تعليمي متكامل ومترابط.",
    longDescEn:
      "The Hub supports trainers in mapping learning needs to competencies, learning objectives, modules, activities, assessment methods, and expected outcomes. This can include curriculum maps, learning pathways, module sequencing, prerequisite logic, duration planning, and alignment between objectives and assessment. The result is a clearer, more professional program structure that trainers can confidently present to corporate and institutional clients.",
    longDescAr:
      "يدعم المركز المدربين في ربط الاحتياجات التدريبية بالجدارات والأهداف التعليمية والوحدات والأنشطة وأساليب التقييم والمخرجات المتوقعة. يشمل ذلك خرائط المناهج، ومسارات التعلم، وتسلسل الوحدات، ومنطق المتطلبات السابقة، وتخطيط المدة الزمنية، والربط بين الأهداف والتقييم. والنتيجة هي هيكل برنامج أكثر وضوحاً واحترافية يمكن للمدربين تقديمه بثقة للعملاء المؤسسيين.",
    deliverablesEn: [
      "Curriculum Maps & Learning Pathways Blueprint",
      "Module Sequencing & Prerequisite Logic Guides",
      "Objectives-to-Assessment Alignment Framework",
    ],
    deliverablesAr: [
      "خرائط المناهج ومخطط مسارات التعلم المتكاملة",
      "أدلة تسلسل الوحدات ومنطق المتطلبات السابقة",
      "إطار الربط المباشر بين الأهداف التعليمية والتقييم",
    ],
    targetAudienceEn: [
      "Instructional Designers",
      "Master Trainers",
      "Curriculum Developers",
    ],
    targetAudienceAr: ["مصممو التعليم", "كبار المدربين", "مطورو المناهج"],
  },
  {
    num: "03",
    titleEn: "Proposal Building & Commercial Solution Support",
    titleAr: "إعداد المقترحات والعروض الفنية والمالية",
    descEn: "Transform expertise into a client-ready proposal.",
    descAr: "تحويل خبرتك إلى عرض فني وتجاري جاهز للتقديم للعملاء.",
    longDescEn:
      "Freelance trainers can receive structured assistance in developing professional training proposals and statements of work. Support can cover executive summaries, understanding of client needs, solution architecture, methodology, learning outcomes, delivery plan, trainer positioning, measurement approach, assumptions, deliverables, and commercial presentation. The objective is not to replace the trainer's expertise, but to package it in a persuasive, decision-ready format that improves the trainer's ability to compete for opportunities.",
    longDescAr:
      "يتلقى المدرب المستقل دعماً منظماً لإعداد المقترحات التدريبية ونطاق العمل الاحترافي (SOW). يغطي الدعم الملخصات التنفيذية، واستيعاب احتياجات العميل، وهندسة الحلول، والمنهجية، ومخرجات التعلم، وخطة التنفيذ، واستراتيجية القياس، والمخرجات، والعرض التجاري. الهدف ليس استبدال خبرة المدرب، بل صياغتها في قالب مقنع وجاهز لاتخاذ القرار مما يعزز قدرة المدرب على التنافس والفوز بالفرص.",
    deliverablesEn: [
      "Executive Summaries & Solution Architecture Templates",
      "Statement of Work (SOW) & Delivery Plan Frameworks",
      "Commercial Presentation & Value Proposition Deck",
    ],
    deliverablesAr: [
      "نماذج الملخص التنفيذي وهندسة الحلول التدريبية",
      "أطر وثيقة نطاق العمل (SOW) وخطط التنفيذ",
      "عرض القيمة المضافة والصياغة التجارية المقنعة",
    ],
    targetAudienceEn: [
      "Freelance Consultants",
      "Training Business Owners",
      "B2B Sales Specialists",
    ],
    targetAudienceAr: [
      "الاستشاريون المستقلون",
      "أصحاب المراكز التدريبية",
      "مسؤولو مبيعات التدريب",
    ],
  },
  {
    num: "04",
    titleEn: "Content Design & Development",
    titleAr: "تصميم وتطوير المحتوى التدريبي",
    descEn:
      "Build learning content that is instructionally sound and professionally structured.",
    descAr: "بناء محتوى تدريبي متين تعليمياً ومصمم باحترافية عالية.",
    longDescEn:
      "The Hub provides instructional-design support for developing or upgrading training programs using established learning-design approaches. Services can include learning-objective development, curriculum structure, facilitator guides, participant materials, presentations, exercises, case studies, simulations, knowledge checks, assessments, and evaluation instruments. Where appropriate, the design can apply frameworks such as ADDIE, backward design, Bloom's taxonomy, adult-learning principles, experiential learning, and other relevant instructional-design models.",
    longDescAr:
      "يقدم المركز دعماً للتصميم التعليمي لتطوير البرامج التدريبية أو تحديثها باستخدام أحدث مناهج التصميم. تشمل الخدمات تطوير الأهداف التعليمية، وهيكل المنهج، وأدلة الميسر، ومواد المشاركين، والعروض التقديمية، والتمارين، ودراسات الحالة، والمحاكاة، واختبارات المعرفة، وأدوات التقييم. كما يتم تطبيق نماذج عالمية مثل ADDIE، والتصميم العكسي، وتصنيف بلوم، ومبادئ تعليم الكبار، والتعلم التجريبي.",
    deliverablesEn: [
      "Facilitator Guides & Participant Material Workbooks",
      "Interactive Case Studies, Simulations & Exercises",
      "Instructional Framework Integration (ADDIE, Bloom's, Experiential)",
    ],
    deliverablesAr: [
      "أدلة الميسر وحقائب المتدرب والأنشطة التفاعلية",
      "دراسات حالة ومحاكاة واختبارات قياس المعرفة",
      "تطبيق نماذج التصميم التعليمي (ADDIE، بلوم، التعلم التجريبي)",
    ],
    targetAudienceEn: [
      "Subject Matter Experts",
      "Corporate Facilitators",
      "E-Learning Creators",
    ],
    targetAudienceAr: [
      "الخبراء المتخصصون",
      "ميسرو التدريب المؤسسي",
      "منشئو المحتوى الرقمي",
    ],
  },
  {
    num: "05",
    titleEn: "Training Mode & Strategy Selection",
    titleAr: "تحديد أساليب واستراتيجيات التدريب",
    descEn: "Choose the right delivery approach for the audience and outcome.",
    descAr: "اختيار نمط التنفيذ الأنسب للجمهور ولتحقيق مخرجات التعلم.",
    longDescEn:
      "Not every learning objective requires the same training method. The Hub helps trainers select appropriate delivery modes and learning strategies based on audience, content complexity, client context, geography, technology, duration, and desired behavior change. Options may include face-to-face workshops, virtual instructor-led training, blended learning, flipped learning, coaching, action learning, simulations, case-based learning, microlearning, peer learning, and workplace application assignments. This improves both learner engagement and the credibility of the proposed solution.",
    longDescAr:
      "ليست كل الأهداف التعليمية تتطلب نفس أسلوب التدريب. يساعد المركز المدربين على اختيار أنماط التقديم واستراتيجيات التعلم المناسبة بناءً على الجمهور، وتعقيد المحتوى، وسياق العميل، والتكنولوجيا، والمدة، وتغيير السلوك المطلوب. تشمل الخيارات الورش الحضوريه، والتدريب الافتراضي، والتعلم المدمج، والتعلم المقلوب، والتوجيه، والتعلم بالممارسة، والمحاكاة، والتعلم المصغر، والتكليفات العملية في مكان العمل.",
    deliverablesEn: [
      "Delivery Mode Decision Matrix (Face-to-Face vs VILT vs Blended)",
      "Learner Engagement & Action Learning Strategies",
      "Workplace Application & Microlearning Integration Toolkit",
    ],
    deliverablesAr: [
      "مصفوفة اختيار نمط التدريب (حضوري / افتراضي / مدمج)",
      "استراتيجيات التفاعل والتعلم بالممارسة والتوجيه",
      "مجموعة أدوات التكليفات العملية والتعلم المصغر",
    ],
    targetAudienceEn: [
      "Executive Coaches",
      "Virtual Facilitators",
      "L&D Strategists",
    ],
    targetAudienceAr: [
      "المدربون التنفيذيون",
      "ميسرو التدريب الافتراضي",
      "مخططو الاستراتيجيات",
    ],
  },
  {
    num: "06",
    titleEn: "Training ROI & Impact Measurement Toolkit",
    titleAr: "قياس الأثر وعائد الاستثمار التدريبي",
    descEn: "Show clients what changed because of the training.",
    descAr: "إثبات التغيير والقيمة المضافة التي أحدثها التدريب للعميل.",
    longDescEn:
      "Freelance trainers can access practical measurement tools to evaluate learning effectiveness and communicate business value to clients. The toolkit can include pre/post assessments, reaction and learning measures, behavior-transfer tools, manager follow-up instruments, KPI alignment templates, impact dashboards, and ROI calculation frameworks. Trainers can use these resources to strengthen post-training reports, demonstrate evidence of impact, and create a stronger basis for repeat business and longer-term client relationships.",
    longDescAr:
      "يمكن للمدربين المستقلين الوصول إلى أدوات قياس عملية لتقييم فاعلية التعلم وتوضيح القيمة التجارية للعملاء. وتتضمن مجموعة الأدوات تقييمات قبلية وبعدية، ومقاييس رد الفعل والتعلم، وأدوات نقل أثر السلوك، وأدوات متابعة المدراء، ونماذج محاذاة مؤشرات الأداء (KPIs)، ولوحات تحكم الأثر، وأطر حساب عائد الاستثمار (ROI) لتعزيز تقارير ما بعد التدريب وبناء علاقات مستدامة.",
    deliverablesEn: [
      "Pre/Post Assessment & Behavior Transfer Instruments",
      "Manager Follow-up & KPI Alignment Templates",
      "Impact Dashboards & ROI Calculation Frameworks",
    ],
    deliverablesAr: [
      "أدوات التقييم القبلية والبعدية ونقل أثر السلوك",
      "نماذج متابعة المدراء ومحاذاة مؤشرات الأداء (KPIs)",
      "لوحات تحكم قياس الأثر وأطر حساب عائد الاستثمار (ROI)",
    ],
    targetAudienceEn: [
      "L&D Managers",
      "Performance Consultants",
      "Senior Trainers",
    ],
    targetAudienceAr: [
      "مدراء التعلم والتطوير",
      "مستشارو الأداء",
      "كبار المدربين",
    ],
  },
  {
    num: "07",
    titleEn: "Trainer Help Desk & Expert Support",
    titleAr: "مكتب مساندة المدرب والدعم الاستشاري",
    descEn:
      "Get practical support when an opportunity or delivery challenge arises.",
    descAr: "مساندة عملية فورية عند ظهور تحديات تدريبية أو فرص جديدة.",
    longDescEn:
      "The Help Desk provides a central support channel for registered freelance trainers seeking guidance on training design, proposal preparation, client requirements, assessment approaches, learning methodologies, documentation, or platform-related questions. The purpose is to reduce the isolation often experienced by independent trainers and give them access to structured professional support when they need a second opinion, a template, a tool, or guidance on the next step.",
    longDescAr:
      "يوفر مكتب المساندة قناة دعم مركزية للمدربين المستقلين المسجلين للحصول على التوجيه بشأن تصميم التدريب، وإعداد المقترحات، ومتطلبات العملاء، ونهج التقييم، والمنهجيات، والتوثيق، والاستفسارات التقنية. والهدف هو الحد من العزلة التي يعاني منها المدرب المستقل وتوفير دعم مهني متخصص عند الحاجة لرأي ثانٍ، أو نموذج، أو أداة، أو إرشاد للخطوة التالية.",
    deliverablesEn: [
      "Centralized Advisory Support Channel for Freelancers",
      "Proposal & Delivery Troubleshooting Consultation",
      "On-Demand Methodology & Documentation Guidance",
    ],
    deliverablesAr: [
      "قناة الدعم والمشورة المركزية للمدربين المستقلين",
      "جلسات حل التحديات الفنية وإعداد المقترحات",
      "إرشادات المنهجيات والتوثيق عند الطلب",
    ],
    targetAudienceEn: [
      "Independent Freelancers",
      "New Trainers",
      "Consultants",
    ],
    targetAudienceAr: ["المدربون المستقلون", "المدربون الجدد", "الاستشاريون"],
  },
  {
    num: "08",
    titleEn: "Professional Profile, Visibility & Opportunity Showcase",
    titleAr: "الملف المهني وإبراز الخبرات والفرص",
    descEn: "Make trainer expertise easier for the market to discover.",
    descAr: "تسهيل اكتشاف وصول الخبرات التدريبية لسوق العمل والشركات.",
    longDescEn:
      "Each trainer can build a structured professional profile that presents areas of expertise, sectors served, credentials, languages, delivery locations, training modes, program portfolio, experience, and client-relevant evidence. Searchable profiles and curated trainer showcases can increase discoverability among organizations and potential partners. This service directly supports the Hub's core promise of expanding visibility and creating more routes to business opportunities.",
    longDescAr:
      "يمكن لكل مدرب بناء ملف مهني هيكلي يعرض مجالات الخبرة، والقطاعات، والشهادات، واللغات، وأماكن التنفيذ، وأنماط التدريب، ومحفظة البرامج، والخبرات، والأدلة الموثقة. تساهم الملفات القابلة للبحث ومعارض المدربين المنسقة في زيادة فرص الاكتشاف من قبل المؤسسات والشركاء المحتملين، مما يدعم هدف المركز الأساسي في زيادة الانتشار وتوفير مسارات للفرص.",
    deliverablesEn: [
      "Structured Digital Trainer Profile & Portfolio",
      "Searchable Corporate Directory & Showcase Listing",
      "Verified Client Evidence & Credential Index",
    ],
    deliverablesAr: [
      "الملف الرقمي الهيكلي ومحفظة الأعمال للمدرب",
      "دليل المدربين القابل للبحث المتاح للشركات والمؤسسات",
      "سجل الشهادات والوثائق المعتمدة للعملاء",
    ],
    targetAudienceEn: ["All Certified Trainers", "Consultants", "L&D Vendors"],
    targetAudienceAr: [
      "جميع المدربين المعتمدين",
      "الاستشاريون",
      "مقدمو الخدمات",
    ],
  },
  {
    num: "09",
    titleEn: "Business Networking & Collaboration",
    titleAr: "التواصل المهني والتعاون المشترك",
    descEn:
      "Turn a network of independent trainers into a professional community.",
    descAr: "تحويل مجتمع المدربين المستقلين إلى شبكة تعاون احترافية.",
    longDescEn:
      "The Hub can facilitate connections among trainers, learning providers, subject-matter experts, and potential institutional partners across the GCC. Networking features may support referrals, co-facilitation, consortium bids, cross-border delivery, content collaboration, and specialist partnerships. For freelance trainers, this creates access to opportunities that may be difficult to pursue individually and enables them to broaden both capability and geographic reach.",
    longDescAr:
      "يسهل المركز التواصل بين المدربين، ومزودي التعلم، والخبراء، والشركاء المؤسسيين المحتملين في دول مجلس التعاون الخليجي. تدعم ميزات التواصل الإحالات، والتيسير المشترك، وتقديم العروض الكبرى في تحالفات، والتنفيذ عابر الحدود، والتعاون في المحتوى والشراكات التخصصية. مما يتيح للمدربين الوصول لفرص قد يصعب تحقيقها فردياً وتوسيع نطاق أعمالهم جغرافيًا.",
    deliverablesEn: [
      "GCC Trainer & Subject-Matter Expert Alliance Network",
      "Consortium Bidding & Co-Facilitation Matchmaking",
      "Cross-Border Delivery & Content Collaboration Hub",
    ],
    deliverablesAr: [
      "شبكة التحالفات والتواصل للمدربين والخبراء في الخليج",
      "منصة التنسيق للتقديم المشترك والتيسير المزدوج للمشاريع",
      "مركز التعاون والتنفيذ عابر الحدود وتطوير المحتوى",
    ],
    targetAudienceEn: [
      "Professional Members",
      "Training Agencies",
      "Lead Consultants",
    ],
    targetAudienceAr: [
      "الأعضاء المحترفون",
      "وكالات التدريب",
      "قادة الاستشارات",
    ],
  },
  {
    num: "10",
    titleEn: "Accreditation & Professional Recognition Pathway",
    titleAr: "مسار الاعتماد والاعتراف المهني",
    descEn: "Strengthen market credibility through recognized standards.",
    descAr: "تعزيز المصداقية في السوق عبر معايير اعتماد معترف بها.",
    longDescEn:
      "Through the IBDL ecosystem, eligible trainers can be guided toward relevant professional trainer accreditation and recognition pathways. IBDL's published Professional Corporate Trainer Accreditation includes assessment, training, examination and evaluation, an accreditation certificate, and listing/visibility on its corporate trainers platform. The Hub can make these pathways easier to understand and access, helping trainers strengthen professional credibility and differentiate themselves in competitive client environments.",
    longDescAr:
      "من خلال منظومة IBDL، يتم توجيه المدربين المؤهلين نحو مسارات الاعتماد والاعتراف المهني. يتضمن اعتماد مدرب الشركات المهني الصادر عن IBDL التقييم والتدريب والامتحان والشهادة، بالإضافة إلى الإدراج والظهور على منصة مدربي الشركات. يجعل المركز هذه المسارات سهلة الفهم والوصول، مما يساعد المدربين على تعزيز مصداقيتهم التنافسية.",
    deliverablesEn: [
      "IBDL Professional Corporate Trainer Accreditation Pathway",
      "Assessment, Examination & Certification Guidance",
      "Listing & Visibility on IBDL Corporate Trainers Platform",
    ],
    deliverablesAr: [
      "مسار اعتماد مدرب الشركات المهني المعتمد من IBDL",
      "إرشادات التقييم والاختبار والحصول على الشهادة",
      "الإدراج والظهور في منصة مدربي الشركات لدى IBDL",
    ],
    targetAudienceEn: [
      "Professional Trainers",
      "Accredited Educators",
      "Corporate Faculty",
    ],
    targetAudienceAr: [
      "المدربون المحترفون",
      "المعلمون المعتمدون",
      "خبراء التدريب المؤسسي",
    ],
  },
  {
    num: "11",
    titleEn: "Templates, Tools & Resource Library",
    titleAr: "مكتبة النماذج والأدوات والمصادر",
    descEn: "Stop rebuilding essential documents from scratch.",
    descAr: "توفير وقتك ونماذج العمل الجاهزة دون الحاجة للبدء من الصفر.",
    longDescEn:
      "Registered trainers can access a curated library of reusable business and L&D resources, such as proposal structures, TNA templates, program maps, lesson-plan formats, facilitation checklists, evaluation forms, assessment templates, attendance and completion records, client-report formats, ROI worksheets, and quality checklists. Standardized tools improve productivity, consistency, and professional presentation while allowing trainers to customize materials for each client.",
    longDescAr:
      "يمكن للمدربين المسجلين الوصول إلى مكتبة منسقة من موارد الأعمال والتعلم والتطوير القابلة للإعادة، مثل أطر المقترحات، ونماذج TNA، وخرائط البرامج، وخطط الدروس، وقوائم التيسير، ونماذج التقييم، وسجلات الحضور، وتقارير العملاء، وأوراق عمل ROI، وقوائم الجودة. تساهم هذه الأدوات المعيارية في رفع الإنتاجية والاتساق مع إمكانية التخصيص لكل عميل.",
    deliverablesEn: [
      "Reusable Proposal, TNA & Curriculum Templates",
      "Facilitation, Evaluation & Client-Report Formats",
      "ROI Worksheets & Quality Control Checklists",
    ],
    deliverablesAr: [
      "نماذج المقترحات والـ TNA وخرائط المناهج القابلة للتعديل",
      "أطر التيسير والتقييم وصياغة تقارير العملاء",
      "أوراق عمل حساب عائد الاستثمار وقوائم ضبط الجودة",
    ],
    targetAudienceEn: [
      "Active Freelance Trainers",
      "Facilitators",
      "Course Authors",
    ],
    targetAudienceAr: ["المدربون الممارسون", "ميسرو الورش", "مؤلفو الدورات"],
  },
  {
    num: "12",
    titleEn: "Continuous Professional Development & Market Insights",
    titleAr: "التطوير المهني المستمر ورؤى السوق",
    descEn:
      "Keep trainer capability relevant to a changing GCC learning market.",
    descAr: "مواكبة متغيرات واحتياجات سوق التدريب في الخليج باستمرار.",
    longDescEn:
      "The Hub can provide webinars, expert sessions, practice updates, learning-design insights, technology briefings, and selected market intelligence relevant to freelance trainers. Topics may include AI-enabled learning, digital facilitation, assessment, learning analytics, emerging capability priorities, and GCC client expectations. The objective is to help trainers continuously refresh both their subject expertise and their ability to operate as commercially effective learning professionals.",
    longDescAr:
      "يوفر المركز ندوات عبر الإنترنت، وجلسات مع الخبراء، وتحديثات الممارسة، ورؤى تصميم التعلم، وإيجازات التكنولوجيا، واستخبارات السوق لخدمة المدربين. وتغطي الموضوعات التعلم المدعوم بالذكاء الاصطناعي، والتيسير الرقمي، والتقييم، وتحليلات التعلم، وأولويات القدرات الناشئة، وتوقعات العملاء في الخليج لمساعدة المدربين على التجديد المستمر.",
    deliverablesEn: [
      "Webinars & Expert Sessions on AI & Digital Facilitation",
      "GCC Market Intelligence & Client Expectation Briefings",
      "Learning Analytics & Emerging Capability Insights",
    ],
    deliverablesAr: [
      "ندوات وجلسات خبراء في الذكاء الاصطناعي والتيسير الرقمي",
      "تقارير استخبارات السوق وتوقعات العملاء في الخليج",
      "رؤى تحليلات التعلم وأولويات المهارات المستقبلية",
    ],
    targetAudienceEn: [
      "Forward-Thinking Trainers",
      "L&D Executives",
      "Thought Leaders",
    ],
    targetAudienceAr: [
      "المدربون المبتكرون",
      "قياديو التعلم والتطوير",
      "قادة الفكر التدريبي",
    ],
  },
];
