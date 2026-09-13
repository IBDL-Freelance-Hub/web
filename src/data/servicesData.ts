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
      "A structured consultation framework designed to help trainers accurately diagnose skill gaps, analyze organizational requirements, and define clear, measurable learning objectives before designing any training intervention.",
    longDescAr:
      "إطار عمل استشاري منظم يهدف لمساعدة المدرب على تشخيص الفجوات المهارية بدقة، وتحليل متطلبات المؤسسة، وتحديد أهداف تعليمية قابلة للقياس قبل البدء بتصميم أي برنامج تدريبي.",
    deliverablesEn: [
      "Standardized TNA Questionnaire & Interview Guides",
      "Skill Gap Analysis Matrix & Competency Mapping",
      "Comprehensive TNA Summary Report Template",
    ],
    deliverablesAr: [
      "استبيانات ومقابلات تحليل الاحتياجات المعيارية",
      "مصفوفة تحليل الفجوات المهارية ورسم الجدارات",
      "نموذج تقرير نتائج TNA الشامل للعملاء",
    ],
    targetAudienceEn: ["Corporate Trainers", "L&D Consultants", "HR Managers"],
    targetAudienceAr: ["المدربون المؤسسيون", "استشاريو التعلم والتطوير", "مدراء الموارد البشرية"],
  },
  {
    num: "02",
    titleEn: "Program Mapping & Learning Architecture",
    titleAr: "هيكلة البرامج والمسارات التدريبية",
    descEn: "Convert identified needs into a coherent learning journey.",
    descAr: "صياغة الاحتياجات في مسار تعليمي متكامل ومترابط.",
    longDescEn:
      "Transform high-level learning needs into fully articulated instructional blueprints. Build progressive learning paths, module breakdowns, and outcome-focused curriculum structures tailored to client expectations.",
    longDescAr:
      "تحويل الاحتياجات التدريبية إلى مخططات تعليمية متكاملة. صياغة مسارات تعلم تصاعدية، وتفكيك الوحدات التدريبية، وبناء مناهج تركز على المخرجات العملية التي تلبي تطلعات العملاء.",
    deliverablesEn: [
      "Instructional Design Blueprint & Module Maps",
      "Bloom's Taxonomy Learning Objective Rubrics",
      "Blended Learning Schedule & Timeline Framework",
    ],
    deliverablesAr: [
      "مخطط التصميم التعليمي وخارطة الوحدات",
      "مصفوفة صياغة الأهداف وفق تصنيف بلوم",
      "جدول المسار التدريبي المدمج والمدى الزمني",
    ],
    targetAudienceEn: ["Instructional Designers", "Master Trainers", "Curriculum Developers"],
    targetAudienceAr: ["مصممو التعليم", "كبار المدربين", "مطورو المناهج"],
  },
  {
    num: "03",
    titleEn: "Proposal Building & Commercial Solution Support",
    titleAr: "إعداد المقترحات والعروض الفنية والمالية",
    descEn: "Transform expertise into a client-ready proposal.",
    descAr: "تحويل خبرتك المهنية إلى عرض فني جاهز للتقديم للعملاء.",
    longDescEn:
      "Professional proposal design support that elevates your technical and financial pitches. Craft persuasive, value-driven training proposals that command higher rates and win competitive corporate contracts.",
    longDescAr:
      "دعم احترافي لإعداد وتصميم العروض الفنية والمالية. تقديم مقترحات تدريبية مقنعة مبنية على القيمة المضافة تمكّنك من الفوز بالمشاريع وتحديد أسعار عادلة ومنافسة.",
    deliverablesEn: [
      "Corporate RFP Response Templates & Boilerplates",
      "Financial Pricing Strategy & ROI Projection Models",
      "Executive Summary & Value Proposition Deck",
    ],
    deliverablesAr: [
      "نماذج الاستجابة لكراسات الشروط والمناقصات (RFP)",
      "نماذج تسعير الخدمات التدريبية وحساب العائد",
      "عرض الملخص التنفيذي والقيمة المضافة للعميل",
    ],
    targetAudienceEn: ["Freelance Consultants", "Training Business Owners", "B2B Sales Specialists"],
    targetAudienceAr: ["الاستشاريون المستقلون", "أصحاب المراكز التدريبية", "مسؤولو مبيعات التدريب"],
  },
  {
    num: "04",
    titleEn: "Content Design & Development",
    titleAr: "تصميم وتطوير المحتوى التدريبي",
    descEn:
      "Build learning content that is instructionally sound and professionally structured.",
    descAr: "بناء محتوى تدريبي متين تعليمياً ومصمم باحترافية عالية.",
    longDescEn:
      "Access professional content creation guidelines, presentation templates, participant workbooks, and interactive exercise designs that elevate the quality and credibility of your delivery.",
    longDescAr:
      "الوصول إلى أدلة ومعايير تطوير المحتوى الاحترافي، وعروض التقديم، وحقائب المتدرب، والتمارين التفاعلية التي ترفع من جودة واحترافية تقديمك في القاعة.",
    deliverablesEn: [
      "Slide Deck Guidelines & Visual Layout Assets",
      "Participant Workbook & Activity Guide Templates",
      "Facilitator Notes & Time-Budgeting Guides",
    ],
    deliverablesAr: [
      "دليل تصميم العروض التقديمية والأصول البصرية",
      "حقيبة المتدرب ودليل الأنشطة والتمارين",
      "دليل المدرب وإدارة الوقت والأنشطة",
    ],
    targetAudienceEn: ["Subject Matter Experts", "Corporate Facilitators", "E-Learning Creators"],
    targetAudienceAr: ["الخبراء المتخصصون", "ميسرو التدريب المؤسسي", "منشئو المحتوى الرقمي"],
  },
  {
    num: "05",
    titleEn: "Training Mode & Strategy Selection",
    titleAr: "تحديد أساليب واستراتيجيات التدريب",
    descEn: "Choose the right delivery approach for the audience and outcome.",
    descAr: "اختيار نمط التنفيذ الأنسب للجمهور ولتحقيق أهداف التعلم.",
    longDescEn:
      "Guidance on choosing and blending physical, virtual, synchronous, and asynchronous learning modes to maximize engagement, retention, and practical application across diverse corporate audiences.",
    longDescAr:
      "دعم استشاري لتحديد ودمج أساليب التدريب الحضوري والافتراضي، والمباشر والذاتي، لضمان أعلى مستويات التفاعل والتطبيق العملي لدى مختلف فئات المتدربين.",
    deliverablesEn: [
      "Delivery Mode Decision Matrix (VILT vs Face-to-Face)",
      "Interactive Engagement Methodologies Guide",
      "Gamification & Microlearning Integration Toolkit",
    ],
    deliverablesAr: [
      "مصفوفة اختيار نمط التدريب (افتراضي / حضوري)",
      "دليل استراتيجيات التفاعل والمشاركة الفعالة",
      "مجموعة أدوات التلعيب والتعلم المصغر (Microlearning)",
    ],
    targetAudienceEn: ["Executive Coaches", "Virtual Facilitators", "L&D Strategists"],
    targetAudienceAr: ["المدربون التنفيذيون", "ميسرو التدريب الافتراضي", "مخططو الاستراتيجيات"],
  },
  {
    num: "06",
    titleEn: "Training ROI & Impact Measurement Toolkit",
    titleAr: "قياس الأثر وعائد الاستثمار التدريبي",
    descEn: "Show clients what changed because of the training.",
    descAr: "إثبات التغيير والقيمة المضافة التي أحدثها التدريب للعميل.",
    longDescEn:
      "Implement Kirkpatrick's 4 Levels and Phillips ROI methodology with ready-to-use evaluation forms, pre/post assessment engines, and executive impact dashboards to demonstrate tangible business results.",
    longDescAr:
      "تطبيق مستويات كيركباتريك وأسلوب فيليبس لقياس عائد الاستثمار التدريبي عبر استبيانات تقييم جاهزة، وأدوات قياس قبلية وبعدية، ولوحات تحكم تقيس الأثر الفعلي على أعمال العميل.",
    deliverablesEn: [
      "Kirkpatrick Level 1-4 Evaluation Instruments",
      "Pre & Post Assessment Scoring Frameworks",
      "Executive ROI & Impact Report Dashboard",
    ],
    deliverablesAr: [
      "أدوات تقييم مستويات كيركباتريك (1-4)",
      "نماذج الاختبارات والتقييمات القبلية والبعدية",
      "لوحة تقرير عائد الاستثمار والأثر المؤسسي",
    ],
    targetAudienceEn: ["L&D Managers", "Performance Consultants", "Senior Trainers"],
    targetAudienceAr: ["مدراء التعلم والتطوير", "مستشارو الأداء", "كبار المدربين"],
  },
  {
    num: "07",
    titleEn: "Trainer Help Desk & Expert Support",
    titleAr: "مكتب مساندة المدرب والدعم الاستشاري",
    descEn:
      "Get practical support when an opportunity or delivery challenge arises.",
    descAr: "مساندة عملية فورية عند ظهور تحديات تدريبية أو فرص جديدة.",
    longDescEn:
      "Direct access to IBDL senior consultants and peer experts for fast advice on complex training scenarios, difficult client requests, content customization, and unexpected delivery challenges.",
    longDescAr:
      "دعم استشاري مباشر من خبراء IBDL لمساعدتك في التعامل مع التحديات التدريبية المعقدة، والطلبات الخاصة من العملاء، وتعديل المحتوى، وحل أي معوقات تظهر أثناء تنفيذ المشاريع.",
    deliverablesEn: [
      "1-on-1 Advisory Sessions with Senior Consultants",
      "Rapid Content Review & Feedback Support",
      "Emergency Delivery Troubleshooting Desk",
    ],
    deliverablesAr: [
      "جلسات استشارية فردية مع كبار الخبراء",
      "مراجعة سريعة للمحتوى وتزويدك بالملاحظات",
      "مكتب الدعم والمساعدة الفورية لأوقات الأزمات",
    ],
    targetAudienceEn: ["Independent Freelancers", "New Trainers", "Consultants"],
    targetAudienceAr: ["المدربون المستقلون", "المدربون الجدد", "الاستشاريون"],
  },
  {
    num: "08",
    titleEn: "Professional Profile, Visibility & Opportunity Showcase",
    titleAr: "الملف المهني وإبراز الخبرات والفرص",
    descEn: "Make your expertise easier for the market to discover.",
    descAr: "تسهيل وصول سوق التدريب والشركات إلى خبراتك وسيرتك.",
    longDescEn:
      "Showcase your verified credentials, client testimonials, track record, and verified expertise inside the Hub's directory accessed by corporate buyers, HR leaders, and training agencies across the GCC.",
    longDescAr:
      "إبراز اعتماداتك الموثقة، وتقييمات العملاء، وسجلك المهني في دليل المنصة المعتمد الذي يتصفحه مسؤولو الموارد البشرية ومشتري الخدمات التدريبية في شركات المنطقة.",
    deliverablesEn: [
      "Verified Freelancers Hub Digital Profile Badge",
      "Corporate Buyer Directory Listing & Search Index",
      "Client Testimonial & Endorsement Verification System",
    ],
    deliverablesAr: [
      "شارة ورابط الملف المهني المعتمد من المنصة",
      "الإدراج في دليل الخبراء المتاح لمشتري الخدمات",
      "نظام توثيق توصيات وتقييمات العملاء السابقين",
    ],
    targetAudienceEn: ["All Certified Trainers", "Consultants", "L&D Vendors"],
    targetAudienceAr: ["جميع المدربين المعتمدين", "الاستشاريون", "مقدمو الخدمات"],
  },
  {
    num: "09",
    titleEn: "Business Networking & Collaboration",
    titleAr: "التواصل المهني والتعاون المشترك",
    descEn:
      "Turn a network of independent trainers into a professional community.",
    descAr: "تحويل مجتمع المدربين المستقلين إلى شبكة تعاون احترافية.",
    longDescEn:
      "Connect with fellow trainers, form joint project alliances for large corporate RFPs, share regional market insights, and collaborate on multi-disciplinary consulting bids across the Middle East.",
    longDescAr:
      "التواصل مع زملائك الخبراء، وتشكيل تحالفات تنفيذية للمناقصات والمشاريع الضخمة، وتبادل الخبرات والمعرفة بسوق التدريب والفرص المتاحة في المنطقة.",
    deliverablesEn: [
      "Private Member Networking Forums & Groups",
      "Joint Venture & Co-Training Opportunity Matchmaker",
      "Quarterly Peer Exchange Roundtables",
    ],
    deliverablesAr: [
      "مجتمعات ومنتديات التواصل المهني المغلقة",
      "منصة الشراكات والتحالف للتقديم على المشاريع",
      "طاولات حوارية ربع سنوية لتبادل الخبرات",
    ],
    targetAudienceEn: ["Professional Members", "Training Agencies", "Lead Consultants"],
    targetAudienceAr: ["الأعضاء المحترفون", "وكالات التدريب", "قادة الاستشارات"],
  },
  {
    num: "10",
    titleEn: "Accreditation & Professional Recognition Pathway",
    titleAr: "مسار الاعتماد والاعتراف المهني",
    descEn: "Strengthen market credibility through recognized standards.",
    descAr: "تعزيز مصداقيتك في السوق عبر معايير اعتماد معترف بها دولياً.",
    longDescEn:
      "Clear, step-by-step pathways to obtain recognized trainer credentials, program accreditations, and international certification seals from IBDL that validate your mastery to prospective clients.",
    longDescAr:
      "مسارات واضحة ومتدرجة للحصول على اعتمادات مدرب معتمد وتوثيق البرامج التدريبية وشارات الجودة من IBDL، مما يمنحك مصداقية فورية أمام المؤسسات والعملاء.",
    deliverablesEn: [
      "IBDL Certified Trainer (ICT) Pathway Credentials",
      "Program & Curriculum Accreditation Audit Checklist",
      "Digital Credential Verification Portal for Clients",
    ],
    deliverablesAr: [
      "شهادة واعتماد مدرب IBDL المعتمد (ICT)",
      "قائمة مراجعة وتقييم اعتماد البرامج والمناهج",
      "بوابة توثيق التحقق الرقمي من الاعتمادات للعملاء",
    ],
    targetAudienceEn: ["Professional Trainers", "Accredited Educators", "Corporate Faculty"],
    targetAudienceAr: ["المدربون المحترفون", "المعلمون المعتمدون", "خبراء التدريب المؤسسي"],
  },
  {
    num: "11",
    titleEn: "Templates, Tools & Resource Library",
    titleAr: "مكتبة النماذج والأدوات والمصادر",
    descEn: "Stop rebuilding essential documents from scratch.",
    descAr: "توفير وقتك ونماذج العمل الجاهزة دون الحاجة للبدء من الصفر.",
    longDescEn:
      "Instant access to a continuously updated repository of editable training contracts, icebreakers, assessment rubrics, feedback forms, proposal slides, and delivery checklists.",
    longDescAr:
      "وصول فوري ومستمر لمكتبة محدثة تضم عقود التدريب الجاهزة، وأنشطة كسر الجليد، ومصفوفات التقييم، ونماذج العروض الفنية، وقوائم التنفيذ التي تقتصد وقتك وتضمن جودة عملك.",
    deliverablesEn: [
      "Editable Training Service Contract Templates",
      "100+ Classroom Icebreakers & Gamification Cards",
      "Workshop Logistics & Preparation Master Checklist",
    ],
    deliverablesAr: [
      "نماذج عقود واتفاقيات الخدمات التدريبية القابلة للتعديل",
      "أكثر من 100 لعبة تدريبية وبطاقة كسر الجليد",
      "قائمة المراجعة اللوجستية والتنفيذية للورش",
    ],
    targetAudienceEn: ["Active Freelance Trainers", "Facilitators", "Course Authors"],
    targetAudienceAr: ["المدربون الممارسون", "ميسرو الورش", "مؤلفو الدورات"],
  },
  {
    num: "12",
    titleEn: "Continuous Professional Development & Market Insights",
    titleAr: "التطوير المهني المستمر ورؤى السوق",
    descEn: "Keep your capability relevant to a changing GCC learning market.",
    descAr: "مواكبة متغيرات واحتياجات سوق التدريب في الخليج باستمرار.",
    longDescEn:
      "Stay ahead with exclusive webinars, GCC corporate training trend reports, pricing benchmarks, emerging skills insights, and masterclasses hosted by international L&D thought leaders.",
    longDescAr:
      "البقاء في صدارة السوق عبر ورش عمل حصرية، وتقارير اتجاهات التدريب في منطقة الخليج، ومعايير التسعير، ومستجدات المهارات، مع لقاءات دورية مع قادة الفكر والتعلم الدوليين.",
    deliverablesEn: [
      "Annual GCC L&D Market & Compensation Reports",
      "Monthly Masterclasses with Global L&D Leaders",
      "Emerging Tech & AI in Training Upskilling Modules",
    ],
    deliverablesAr: [
      "التقرير السنوي لسوق التعلم وأجور التدريب بالخليج",
      "ورش عمل شهرية مع كبار قادة التعلم الدوليين",
      "وحدات تطوير مهارات استخدام الذكاء الاصطناعي في التدريب",
    ],
    targetAudienceEn: ["Forward-Thinking Trainers", "L&D Executives", "Thought Leaders"],
    targetAudienceAr: ["المدربون المبتكرون", "قياديو التعلم والتطوير", "قادة الفكر التدريبي"],
  },
];
