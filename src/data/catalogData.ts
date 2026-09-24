import type { ProductData } from "@/types/catalog";

export const ASSESSMENT_TOOLS_DATA: ProductData[] = [
  {
    id: "pqp",
    slug: "pqp",
    title: "PQP™",
    category: {
      en: "ASSESSMENT TOOL",
      ar: "أداة تقييم",
    },
    tagline: {
      en: "Personality & Qualities Portfolio",
      ar: "محفظة الشخصية والصفات القيادية",
    },
    description: {
      en: "PQP™ is not another personality test. It is a comprehensive, scientifically validated work-based assessment designed specifically for business environments, focusing on the traits that actually predict workplace performance.",
      ar: "تعد PQP™ أكثر من مجرد اختبار شخصية آخر؛ بل هي تقييم مهني شامل ومثبت علمياً صُمم خصيصاً لبيئات الأعمال، مع التركيز على السمات التي تتنبأ بالفعل بالأداء الوظيفي.",
    },
    about: {
      en: "PQP™ is not another personality test. It is a comprehensive, scientifically validated work-based assessment designed specifically for business environments, focusing on the traits that actually predict workplace performance. The instrument measures twenty critical professional dimensions across two validated scales: a Behaviour scale capturing observable workplace behaviour, and a Motives scale revealing the core motivators beneath it. It is used across the full talent lifecycle, from selection through to development and retention.",
      ar: "تعد PQP™ أكثر من مجرد اختبار شخصية آخر؛ بل هي تقييم مهني شامل ومثبت علمياً صُمم خصيصاً لبيئات الأعمال، مع التركيز على السمات التي تتنبأ بالفعل بالأداء الوظيفي. تقيس الأداة عشرين بعداً مهنياً حاسماً عبر مقياسين معتمدين: مقياس السلوكيات ومقياس الدوافع.",
    },
    logoImg: "/tools_logos/pqp.png",
    stats: {
      stat1: {
        num: "500+",
        label: {
          en: "Organisations worldwide",
          ar: "منظمة حول العالم",
        },
      },
      stat2: {
        num: "87%",
        label: {
          en: "Reduction in mis-hires",
          ar: "انخفاض التوظيف الخاطئ",
        },
      },
      stat3: {
        num: "92%",
        label: {
          en: "Retention achieved",
          ar: "نسبة استبقاء موظفين محققة",
        },
      },
    },
    targetAudience: {
      en: [
        "HR and talent acquisition teams",
        "L&D professionals designing development plans",
        "Line managers making selection decisions",
        "Independent consultants running assessment centres",
      ],
      ar: [
        "فرق الموارد البشرية واستقطاب المواهب",
        "أخصائيو التعلم والتطوير الذين يصممون خطط التطوير",
        "مدراء الأقسام الذين يتخذون قرارات الاختيار",
        "المستشارون المستقلون الذين يديرون مراكز التقييم",
      ],
    },
    useCases: {
      en: [
        "Selection and hiring decisions",
        "Role and culture fit evaluation",
        "Individual development planning",
        "Succession and high-potential identification",
        "Team composition analysis",
      ],
      ar: [
        "قرارات الاختيار والتوظيف",
        "تقييم التوافق مع الدور والثقافة",
        "تخطيط التطوير الفردي",
        "تحديد التعاقب الوظيفي والمواهب العالية",
        "تحليل تركيب الفرق",
      ],
    },
    keyLearningAreas: {
      en: [
        "20 professional personality dimensions",
        "The Behaviour scale — observable workplace behaviour",
        "The Motives scale — underlying core drivers",
        "Role fit and culture fit interpretation",
        "Reading and debriefing assessment output",
      ],
      ar: [
        "٢٠ بعداً للشخصية المهنية",
        "مقياس السلوكيات — السلوكيات الوظيفية الملاحظة",
        "مقياس الدوافع — المحركات الأساسية الضمنية",
        "تفسير التوافق مع الدور والثقافة",
        "قراءة وتحليل مخرجات التقييم",
      ],
    },
    chips: {
      en: [
        "20 Dimensions",
        "Behaviour Scale",
        "Motives Scale",
        "Role & Culture Fit",
      ],
      ar: [
        "٢٠ بعداً مهنياً",
        "مقياس السلوكيات",
        "مقياس الدوافع",
        "التوافق مع الدور",
      ],
    },
    flyers: {
      en: "/flyers/en/pqp.pdf",
      ar: "/flyers/ar/pqp.pdf",
    },
  },
  {
    id: "cpat",
    slug: "cpat",
    title: "CPAT™",
    category: {
      en: "ASSESSMENT TOOL",
      ar: "أداة تقييم",
    },
    tagline: {
      en: "Change Profile & Adaptability Tool",
      ar: "أداة تشخيص التكيّف والتغيير",
    },
    description: {
      en: "Measure and predict workforce readiness, capability and energy for change — before the initiative launches.",
      ar: "قياس والتنبؤ بجاهزية القوة العاملة وقدرتها وطاقتها للتحول قبل إطلاق المبادرة.",
    },
    about: {
      en: "Only about a third of organisational change initiatives succeed; the rest fail to resistance, fatigue and a workforce that was never ready. CPAT™ is a change intelligence system, not merely an assessment: built on more than fifteen years of organisational psychology research and validated across industries, it comprises three core components across six critical dimensions, enabling organisations to understand readiness, anticipate resistance and design targeted interventions at individual, team and enterprise levels.",
      ar: "تنجح حوالي ثلث مبادرات التغيير المؤسسي فقط؛ بينما يفشل الباقي بسبب المقاومة والإرهاق عدم جاهزية القوة العاملة. CPAT™ هو نظام ذكاء تغيير متكامل وليس مجرد تقييم: بُني على أكثر من 15 عاماً من أبحاث علم النفس التنظيمي لتمكين المنظمات من فهم الجاهزية وتوقع المقاومة وتصميم تدخلات موجهة.",
    },
    logoImg: "/tools_logos/cpat.png",
    stats: {
      stat1: {
        num: "63%",
        label: {
          en: "Reduction in change initiative failures",
          ar: "انخفاض في فشل مبادرات التغيير",
        },
      },
      stat2: {
        num: "41%",
        label: {
          en: "Faster implementation timelines",
          ar: "سرعة أكبر في الجدول الزمني للتنفيذ",
        },
      },
      stat3: {
        num: "15+ yrs",
        label: {
          en: "Of validation research",
          ar: "سنوات من الأبحاث والدراسات المعتمدة",
        },
      },
    },
    targetAudience: {
      en: [
        "Transformation and change leads",
        "HR and organisational development teams",
        "Executive sponsors of major change",
        "Consultants advising on transformation",
      ],
      ar: [
        "قادة التحول والتغيير",
        "فرق الموارد البشرية والتطوير التنظيمي",
        "الرعاة التنفيذيون لمبادرات التغيير الرئيسية",
        "المستشارون الموجهون لمسارات التحول",
      ],
    },
    useCases: {
      en: [
        "Pre-launch change readiness diagnostics",
        "Mapping and anticipating resistance",
        "Designing targeted change interventions",
        "Tracking adaptability through a transformation",
        "Post-implementation review",
      ],
      ar: [
        "تشخيص الجاهزية للتغيير قبل الإطلاق",
        "رسم خرائط المقاومة وتوقعها",
        "تصميم تدخلات تغيير موجهة",
        "تتبع القدرة على التكيف خلال التحول",
        "مراجعة ما بعد التنفيذ",
      ],
    },
    keyLearningAreas: {
      en: [
        "Six critical dimensions of change adaptability",
        "Individual, team and enterprise readiness profiles",
        "Anticipating and interpreting resistance patterns",
        "Designing interventions from diagnostic evidence",
        "Reading change intelligence reporting",
      ],
      ar: [
        "الأبعاد الستة الحاسمة للتكيف مع التغيير",
        "ملفات الجاهزية للأفراد والفرق والمؤسسة",
        "توقع وتفسير أنماط المقاومة",
        "تصميم التدخلات بناءً على الأدلة التشخيصية",
        "قراءة تقارير ذكاء التغيير",
      ],
    },
    chips: {
      en: [
        "Change Adaptability",
        "Readiness Profiles",
        "Resistance Patterns",
        "Change Intelligence",
      ],
      ar: [
        "التكيف مع التغيير",
        "ملفات الجاهزية",
        "أنماط المقاومة",
        "ذكاء التغيير",
      ],
    },
    flyers: {
      en: "/flyers/en/cpat.pdf",
      ar: "/flyers/ar/cpat.pdf",
    },
  },
  {
    id: "management-drives",
    slug: "management-drives",
    title: "Management Drives™",
    category: {
      en: "ASSESSMENT TOOL",
      ar: "أداة تقييم",
    },
    tagline: {
      en: "Individual & Group Profiles",
      ar: "تحليل ملفات الأفراد والفرق",
    },
    description: {
      en: "A globally validated instrument that maps motivation across six colour-coded drives, at individual, team and organisational level.",
      ar: "أداة معتمدة عالمياً ترسم دوافع المحركات عبر 6 ألوان رمزية على مستوى الأفراد والفرق والمنظمات.",
    },
    about: {
      en: "IBDL Learning Group is the regional learning partner for Management Drives in the Middle East. The instrument scientifically maps motivation patterns across six core drives — Yellow: analyse and explore in depth; Green: people and relationships first; Orange: results, progress and achievement; Blue: certainty, clarity and structure; Red: courage, speed and strength; Purple: bonding, security and care. The result is a shared, colour-coded language that lets an organisation describe culture and behaviour objectively rather than anecdotally.",
      ar: "IBDL Learning Group هي الشريك الإقليمي المعتمد لـ Management Drives في الشرق الأوسط. ترسم الأداة علمياً أنماط الدوافع عبر ستة محركات أساسية — الأصفر: التحليل والاستكشاف العميق؛ الأخضر: الأفراد والعلاقات أولاً؛ البرتقالي: النتائج والتقدم والإنجاز؛ الأزرق: اليقين والوضوح والهيكل؛ الأحمر: الشجاعة والسرعة والقوة؛ البنفسجي: الترابط والأمان والرعاية.",
    },
    logoImg: "/tools_logos/management-drives.png",
    stats: {
      stat1: {
        num: "6",
        label: {
          en: "Core motivational drives",
          ar: "محركات دوافع أساسية",
        },
      },
      stat2: {
        num: "75%",
        label: {
          en: "Increase in job satisfaction reported",
          ar: "زيادة في الرضا الوظيفي أُبلغ عنها",
        },
      },
      stat3: {
        num: "3",
        label: {
          en: "Levels: individual, team, organisation",
          ar: "مستويات: الفرد، الفريق، المنظمة",
        },
      },
    },
    targetAudience: {
      en: [
        "Leadership and executive teams",
        "HR and organisational development functions",
        "Team leads managing diverse working styles",
        "Consultants working on culture and collaboration",
      ],
      ar: [
        "فرق القيادة والإدارة العليا",
        "وظائف الموارد البشرية والتطوير التنظيمي",
        "قادة الفرق الذين يديرون أساليب عمل متنوعة",
        "المستشارون العاملون في الثقافة والتعاون",
      ],
    },
    useCases: {
      en: [
        "Team development and collaboration workshops",
        "Leadership self-awareness programmes",
        "Culture description and alignment work",
        "Conflict resolution grounded in motivation",
        "Organisational design and team composition",
      ],
      ar: [
        "ورش عمل تطوير الفرق والتعاون",
        "برامج الوعي الذاتي للقيادة",
        "توصيل ومحاذاة الثقافة المؤسسية",
        "حل النزاعات المرتكز على الدوافع",
        "التصميم التنظيمي وتركيب الفرق",
      ],
    },
    keyLearningAreas: {
      en: [
        "The six colour drives and what each seeks",
        "Individual and group motivation profiles",
        "A common language for culture and behaviour",
        "Predicting collaboration and friction patterns",
        "Designing development at every level",
      ],
      ar: [
        "المحركات الستة الملونة وما تسعى إليه كل منها",
        "ملفات دوافع الأفراد والمجموعات",
        "لغة مشتركة للثقافة والسلوك",
        "التنبؤ بأنماط التعاون والاحتياك",
        "تصميم التطوير عند كل مستوى",
      ],
    },
    chips: {
      en: [
        "6 Colour Drives",
        "Motivation Profiles",
        "Culture & Behaviour",
        "Team Collaboration",
      ],
      ar: [
        "٦ محركات ملونة",
        "ملفات الدوافع",
        "الثقافة والسلوك",
        "التعاون بين الفرق",
      ],
    },
    flyers: {
      en: "/flyers/en/management-drives.pdf",
      ar: "/flyers/ar/management-drives.pdf",
    },
  },
];

export const SIMULATION_GAMES_DATA: ProductData[] = [
  {
    id: "strategic-victory",
    slug: "strategic-victory",
    title: "Strategic Victory™",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Business Battle Simulation",
      ar: "محاكاة معارك استراتيجية الأعمال",
    },
    description: {
      en: "High-pressure decision scenarios, sharpening leadership, planning and competitive instincts.",
      ar: "سيناريوهات قرارات عالية الضغط تهدف لشحذ مهارات القيادة والتخطيط والتنافس.",
    },
    about: {
      en: "Strategic Victory™ is an immersive business war-game in which teams compete as rival organisations, managing finite resources and making consequential strategic decisions round after round. Participants role-play as leaders confronting market, customer and competitive challenges, with each decision feeding directly into the competitive position they hold in the next round. Designed as an engaging full-day experience that mirrors fast-moving business environments.",
      ar: "تعد محاكاة Strategic Victory™ لعبة حرب أعمال تفاعلية تتنافس فيها الفرق كمنظمات متنافسة، حيث تدير الموارد المحدودة وتتخذ قرارات استراتيجية حاسمة جولة تلو الأخرى. يتقمص المشاركون دور القادة الذين يواجهون تحديات السوق والعملاء والتنافس، مع انعكاس كل قرار مباشرة على موقعهم التنافسي في الجولة التالية. صممت التجربة لتكون تجربة يوم كامل تفاعلية تعكس بيئات الأعمال سريعة التغير.",
    },
    logoImg: "/tools_logos/strategic-victory.png",
    stats: {
      stat1: {
        num: "91%",
        label: {
          en: "Improvement in strategic planning",
          ar: "تحسن في التخطيط الاستراتيجي",
        },
      },
      stat2: {
        num: "95%",
        label: {
          en: "Immediate application at work",
          ar: "تطبيق فوري في بيئة العمل",
        },
      },
      stat3: {
        num: "1,800+",
        label: {
          en: "Organisations worldwide",
          ar: "منظمة حول العالم",
        },
      },
    },
    targetAudience: {
      en: [
        "Senior and mid-level leadership teams",
        "Strategic planning and corporate strategy functions",
        "High-potential talent programmes",
        "Cross-functional teams preparing for a planning cycle",
      ],
      ar: [
        "فرق القيادة العليا والمتوسطة",
        "وظائف التخطيط الاستراتيجي والاستراتيجية المؤسسية",
        "برامج المواهب والقيادات الشابة",
        "الفرق المتقاطعة المهام لإعداد دورات التخطيط",
      ],
    },
    useCases: {
      en: [
        "Annual strategy kick-offs and planning offsites",
        "Leadership development programmes",
        "Building competitive analysis capability",
        "Breaking down silos across business units",
      ],
      ar: [
        "انطلاقات الاستراتيجية السنوية والملتقيات التخطيطية",
        "برامج تطوير القيادات والمدرين",
        "بناء قدرات التحليل والتفكير التنافسي",
        "إزالة الحواجز بين الإدارات والقطاعات",
      ],
    },
    keyLearningAreas: {
      en: [
        "Strategic planning and execution",
        "Competitive analysis and market positioning",
        "Negotiation and financial thinking",
        "Resource allocation under constraint",
        "Team alignment and role distribution",
        "Adaptability and creative problem-solving",
      ],
      ar: [
        "التخطيط والتنفيذ الاستراتيجي",
        "التحليل التنافسي والتموضع في السوق",
        "التفاوض والتفكير المالي",
        "توزيع الموارد تحت قيود الضغط",
        "تناغم الفريق وتوزيع الأدوار",
        "المرونة وحل المشكلات الإبداعي",
      ],
    },
    chips: {
      en: [
        "Strategic planning and execution",
        "Competitive analysis and market positioning",
        "Negotiation and financial thinking",
        "Resource allocation under constraint",
      ],
      ar: [
        "التخطيط والتنفيذ الاستراتيجي",
        "التحليل التنافسي وتموضع السوق",
        "التفاوض والتفكير المالي",
        "توزيع الموارد تحت الضغط",
      ],
    },
    flyers: {
      en: "/flyers/en/strategic-victory.pdf",
      ar: "/flyers/ar/strategic-victory.pdf",
    },
  },
  {
    id: "master",
    slug: "master-board-game",
    title: "Master Board Game™",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Experiential Business Simulation",
      ar: "محاكاة أعمال تفاعلية شاملة",
    },
    description: {
      en: "Experiential management simulation making impactful decisions as if steering a live business.",
      ar: "محاكاة إدارة واقعية لاتخاذ قرارات مؤثرة وإدارة منظومة الأعمال الفعلية.",
    },
    about: {
      en: "Master Board Game™ turns business theory into strategic action. Participants collaborate in teams to manage company branches, allocate resources against competing objectives and make decisions under time pressure and competitive constraint. Because decisions are made openly and in teams, MBG surfaces real communication patterns, leadership styles and collaboration effectiveness as the game unfolds — giving the facilitator unusually rich material for debrief.",
      ar: "تحول لعبة Master Board Game™ النظريات التجارية إلى ممارسات استراتيجية فعلية. يتشارك المتدربون في فرق لإدارة فروع الشركة وتوزيع الموارد لاتخاذ القرارات تحت ضغط الوقت والقيود التنافسية. وبفضل اتخاذ القرارات بشكل علني وجماعي، تكشف المحاكاة عن أنماط التواصل الواقعية وأساليب القيادة وفعالية التعاون بشكل واضح أثناء الجلسة.",
    },
    logoImg: "/tools_logos/master-board-game.png",
    stats: {
      stat1: {
        num: "75%",
        label: {
          en: "Higher retention vs. traditional methods",
          ar: "معدل استيعاب أعلى مقارنة بالطرق التقليدية",
        },
      },
      stat2: {
        num: "85%",
        label: {
          en: "Report immediate collaboration gains",
          ar: "أفادوا بتحسن فوري في مهارات التعاون",
        },
      },
      stat3: {
        num: "87%",
        label: {
          en: "Of organisations investing in experiential learning",
          ar: "من المؤسسات تستثمر في التعلم التفاعلي",
        },
      },
    },
    targetAudience: {
      en: [
        "Emerging and mid-level managers",
        "Cross-functional teams",
        "Graduate and fast-track programmes",
        "Intact teams needing a shared decision language",
      ],
      ar: [
        "المدراء الواعدون والإدارة المتوسطة",
        "الفرق المتقاطعة الإدارات",
        "برامج الخريجين والمسارات السريعة",
        "الفرق المتكاملة التي تحتاج لغة قرارات موحدة",
      ],
    },
    useCases: {
      en: [
        "Leadership and management development programmes",
        "Team-building with a business substance",
        "Onboarding cohorts into commercial thinking",
        "Diagnosing team dynamics in a live setting",
      ],
      ar: [
        "برامج تطوير القيادة والإدارة",
        "بناء الفرق ذو المضمون التجاري الفعلي",
        "تأهيل الأقسام نحو التفكير التجاري",
        "تشخيص ديناميكيات الفرق في بيئة حية",
      ],
    },
    keyLearningAreas: {
      en: [
        "Strategic decision-making under pressure",
        "Resource allocation and planning",
        "Team communication and leadership style",
        "Collaboration across competing objectives",
        "Adapting to changing market conditions",
      ],
      ar: [
        "اتخاذ القرارات الاستراتيجية تحت الضغط",
        "توزيع الموارد والتخطيط",
        "التواصل ورؤية أسلوب القيادة",
        "التعاون عبر أهداف متنافسة",
        "التكيف مع ظروف السوق المتغيرة",
      ],
    },
    chips: {
      en: [
        "Strategic decision-making",
        "Resource allocation",
        "Team communication",
        "Collaboration",
      ],
      ar: [
        "اتخاذ القرارات الاستراتيجية",
        "توزيع الموارد",
        "التواصل في الفريق",
        "التعاون التكافلي",
      ],
    },
    flyers: {
      en: "/flyers/en/master-board-game.pdf",
      ar: "/flyers/ar/master-board-game.pdf",
    },
  },
  {
    id: "sparta",
    slug: "sparta",
    title: "Sparta™",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Coaching for Leaders",
      ar: "توجيه وتدريب القياديين",
    },
    description: {
      en: "Targeted coaching mechanics and leadership alignment developing exact skills to unlock individual potential.",
      ar: "آليات توجيه مركزة ومحاذاة قيادية لتطوير المهارات الدقيقة وإطلاق الطاقات.",
    },
    about: {
      en: "Sparta™ is an interactive coaching simulation and certification experience. Participants begin with an assessment that reveals their own leadership style and interpersonal approach, then progress through multi-stage simulations across four rounds, guided by expert facilitators. Individuals and teams compete to master coaching tools, turning theoretical models into practical conversational skill in a high-engagement environment.",
      ar: "تعد Sparta™ محاكاة توجيه وتجربة اعتماد تفاعلية. يبدأ المشاركون بتقييم يكشف عن أسلوبهم القيادي والشخصي، ثم يتقدمون عبر محاكاة متعددة المراحل على مدار أربع جولات بتوجيه من خبراء ميسرين. يتنافس الأفراد والفرق لإتقان أدوات التوجيه وتحويل النماذج النظرية إلى مهارات تواصل عملية.",
    },
    logoImg: "/tools_logos/sparta.png",
    stats: {
      stat1: {
        num: "91%",
        label: {
          en: "Report better coaching conversations",
          ar: "أفادوا بإجراء حوارات توجيهية أفضل",
        },
      },
      stat2: {
        num: "3,500+",
        label: {
          en: "Leaders certified across 18 countries",
          ar: "قائد معتمد عبر ١٨ دولة",
        },
      },
      stat3: {
        num: "94%",
        label: {
          en: "Facilitator satisfaction",
          ar: "معدل رضا الميسرين والمدربين",
        },
      },
    },
    targetAudience: {
      en: [
        "People managers who coach as part of the role",
        "HR business partners and L&D specialists",
        "Leaders preparing for a coaching certification",
        "Internal coaching pools and mentor networks",
      ],
      ar: [
        "مدراء الأفراد الذين يمارسون التوجيه كجزء من دورهم",
        "شركاء أعمال الموارد البشرية وأخصائيو التعلم",
        "القادة المستعدون للحصول على شهادة التوجيه",
        "شبكات التوجيه الداخلي والموجهين المؤسسيين",
      ],
    },
    useCases: {
      en: [
        "Coaching capability certification programmes",
        "Building a coaching culture across management layers",
        "Performance conversation and feedback training",
        "Leadership style and self-awareness development",
      ],
      ar: [
        "برامج اعتماد قدرات التوجيه المهني",
        "بناء ثقافة التوجيه عبر مستويات الإدارة",
        "التدريب على حوارات الأداء والتغذية الراجعة",
        "تطوير الوعي الذاتي والأسلوب القيادي",
      ],
    },
    keyLearningAreas: {
      en: [
        "Coaching conversation structure and technique",
        "Reading individual behavioural styles",
        "Leadership communication and influence",
        "Conflict resolution and difficult conversations",
        "Trust-building and psychological safety",
      ],
      ar: [
        "هيكل وتقنيات حوارات التوجيه",
        "قراءة الأنماط السلوكية للأفراد",
        "التواصل القيادي والتأثير",
        "حل النزاعات والحوارات الصعبة",
        "بناء الثقة والسلامة النفسية",
      ],
    },
    chips: {
      en: [
        "Coaching conversation structure",
        "Behavioural styles",
        "Leadership influence",
        "Conflict resolution",
      ],
      ar: [
        "هيكل حوارات التوجيه",
        "الأنماط السلوكية",
        "التأثير القيادي",
        "حل النزاعات",
      ],
    },
    flyers: {
      en: "/flyers/en/sparta.pdf",
      ar: "/flyers/ar/sparta.pdf",
    },
  },
  {
    id: "target-hunter",
    slug: "target-hunter",
    title: "Target Hunter™",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Sales Performance Simulation",
      ar: "محاكاة أداء وتميز المبيعات",
    },
    description: {
      en: "Fast-paced competitive sales simulation facing the ambiguity and uncertainty of real-world selling.",
      ar: "محاكاة مبيعات تنافسية سريعة الوتيرة لمواجهة تحديات وتقلبات سوق المبيعات الحقيقي.",
    },
    about: {
      en: "Target Hunter™ places sales professionals into realistic selling scenarios where teams compete head-to-head for limited opportunities against shifting customer behaviour. Every decision — target selection, pitch approach, negotiation posture — produces immediate consequences that the participant must then trade against. Sales skill is developed through action, competition and feedback rather than scripted role play.",
      ar: "تضع محاكاة Target Hunter™ محترفي المبيعات في سيناريوهات بيع واقعية حيث تتنافس الفرق رأساً برأس على فرص محدودة وسط سلوكيات عملاء متغيرة. ينتج عن كل قرار — سواء اختيار الهدف أو طريقة العرض أو موقف التفاوض — نتائج فورية يتعين على المشارك التعامل معها. تتطور مهارة البيع من خلال الممارسة والتنافس والتغذية الراجعة.",
    },
    logoImg: "/tools_logos/target-hunter.png",
    stats: {
      stat1: {
        num: "92%",
        label: {
          en: "Improvement in pitch confidence",
          ar: "تحسن في الثقة عند تقديم عروض المبيعات",
        },
      },
      stat2: {
        num: "67%",
        label: {
          en: "Faster deal-closing speed",
          ar: "سرعة أكبر في إغلاق الصفقات",
        },
      },
      stat3: {
        num: "2,000+",
        label: {
          en: "Sales professionals trained in MENA",
          ar: "محترف مبيعات تم تدريبهم بالمنطقة",
        },
      },
    },
    targetAudience: {
      en: [
        "Field and inside sales teams",
        "Key account and business development managers",
        "Sales managers and regional leads",
        "Technical specialists moving into commercial roles",
      ],
      ar: [
        "فرق المبيعات الميدانية والداخلية",
        "مدراء الحسابات الرئيسية وتطوير الأعمال",
        "مدراء المبيعات والقيادات الإقليمية",
        "المتخصصون الفنيون المنتقلون لأدوار تجارية",
      ],
    },
    useCases: {
      en: [
        "Sales kick-off events and annual conferences",
        "Onboarding new commercial hires",
        "Negotiation and pitch capability building",
        "Diagnosing where deals are actually being lost",
      ],
      ar: [
        "فعاليات انطلاق المبيعات والمؤتمرات السنوية",
        "تأهيل وأقلمة موظفي المبيعات الجدد",
        "بناء قدرات التفاوض والعروض التجارية",
        "تشخيص النقاط الحقيقية لخسارة الصفقات",
      ],
    },
    keyLearningAreas: {
      en: [
        "Pitch construction and delivery clarity",
        "Negotiation under competitive pressure",
        "Target selection and pipeline prioritisation",
        "Reading and responding to customer behaviour",
        "Team collaboration in a competitive setting",
      ],
      ar: [
        "صياغة وتقديم العروض بوضوح",
        "التفاوض تحت الضغوط التنافسية",
        "تحديد الأهداف وتحديد أولويات الصفقات",
        "قراءة سلوك العملاء والاستجابة له",
        "التعاون بين أعضاء الفريق في بيئة تنافسية",
      ],
    },
    chips: {
      en: [
        "Pitch construction",
        "Negotiation under pressure",
        "Target selection",
        "Customer behavior",
      ],
      ar: [
        "صياغة العروض",
        "التفاوض تحت الضغط",
        "تحديد الأهداف",
        "سلوك العملاء",
      ],
    },
    flyers: {
      en: "/flyers/en/target-hunter.pdf",
      ar: "/flyers/ar/target-hunter.pdf",
    },
  },
  {
    id: "micromatic",
    slug: "micromatic",
    title: "Micromatic™",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Strategic Management Simulation",
      ar: "محاكاة الإدارة الاستراتيجية",
    },
    description: {
      en: "Participants run a $2–4M manufacturing operation across three sales regions, making 30+ strategic decisions per round.",
      ar: "يدير المشاركون عملية تصنيع بقيمة 2-4 مليون دولار عبر ثلاثة أقاليم مبيعات مع 30+ قراراً بكل جولة.",
    },
    about: {
      en: "Micromatic™ hands participants a complete manufacturing business operating across three sales regions, with real financial dynamics and live market competition. Each round demands more than thirty strategic decisions spanning production, pricing, capacity and market entry — including global options such as EU and China markets. The simulation is built to expose the interconnection between functions: every choice registers on the bottom line, immediately and visibly.",
      ar: "تسلم Micromatic™ المشاركين شركة تصنيع متكاملة تعمل عبر ثلاثة أقاليم مبيعات مع ديناميكيات مالية حقيقية وتنافس مباشر بالسوق. تتطلب كل جولة أكثر من ثلاثين قراراً استراتيجياً تشمل الإنتاج والتسعير والطاقة ودخول الأسواق — بما في ذلك الخيارات العالمية مثل الاتحاد الأوروبي والصين.",
    },
    logoImg: "/tools_logos/micromatic.svg",
    stats: {
      stat1: {
        num: "30+",
        label: {
          en: "Strategic decisions per round",
          ar: "قرار استراتيجي بكل جولة",
        },
      },
      stat2: {
        num: "3",
        label: {
          en: "Sales regions plus global markets",
          ar: "أقاليم مبيعات بالإضافة للأسواق العالمية",
        },
      },
      stat3: {
        num: "$2–4M",
        label: {
          en: "Simulated operation scale",
          ar: "نطاق تشغيلي محاكى من ٢ إلى ٤ مليون دولار",
        },
      },
    },
    targetAudience: {
      en: [
        "Business and management students",
        "Functional specialists broadening into general management",
        "MBA and executive education cohorts",
        "Managers preparing for P&L responsibility",
      ],
      ar: [
        "طلاب إدارة الأعمال والماجستير",
        "الأخصائيون المنتقلون للإدارة العامة",
        "دفوعات ماجستير إدارة الأعمال والتعليم التنفيذي",
      ],
    },
    useCases: {
      en: [
        "Capstone strategic management courses",
        "General management development programmes",
        "Building financial and commercial acumen",
        "Cross-functional awareness for specialists",
      ],
      ar: [
        "دورات الإدارة الاستراتيجية الرئيسية",
        "برامج تطوير الإدارة العامة",
        "بناء الفطنة المالية والتجارية",
      ],
    },
    keyLearningAreas: {
      en: [
        "Integrated strategic decision-making",
        "Financial dynamics and bottom-line impact",
        "Production, capacity and operations planning",
        "International market entry considerations",
        "Managing complex trade-offs under uncertainty",
      ],
      ar: [
        "اتخاذ القرارات الاستراتيجية المتكاملة",
        "الديناميكيات المالية والأثر المالي",
        "تخطيط الإنتاج والقدرة التشغيلية",
        "اعتبارات دخول الأسواق العالمية",
      ],
    },
    chips: {
      en: [
        "Integrated decision-making",
        "Financial dynamics",
        "Operations planning",
        "International markets",
      ],
      ar: [
        "القرارات المتكاملة",
        "الديناميكيات المالية",
        "تخطيط العمليات",
        "الأسواق العالمية",
      ],
    },
    flyers: {
      en: "/flyers/en/micromatic.pdf",
      ar: "/flyers/ar/micromatic.pdf",
    },
  },
  {
    id: "mogul",
    slug: "mogul-ceo",
    title: "Mogul CEO™",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الرئيس التنفيذي",
    },
    description: {
      en: "A complete manufacturing company with two product lines — from raw materials to market distribution, decided by the participant.",
      ar: "شركة تصنيع متكاملة بخطي إنتاج — من المواد الخام إلى التوزيع بالسوق بقرارات المشارك.",
    },
    about: {
      en: "Mogul CEO™ is a computer-based simulation of a full manufacturing company running two product lines. Participants manage everything from raw material sourcing to market distribution, making make-or-buy calls, optimising product mix, setting market strategy and managing finance and operations in real time. The design compresses three to five years of business experience into eight to twelve hours, teaching functional interconnection without information overload.",
      ar: "تعد Mogul CEO™ محاكاة حاسوبية لشركة تصنيع متكاملة تدير خطي إنتاج. يدير المشاركون كل شيء بدءاً من توريد المواد الخام حتى التوزيع بالسوق، مع اتخاذ قرارات التصنيع أو الشراء وتحديد مزيج المنتجات وإدارة الاستراتيجية والتسويق والمالية مباشرة.",
    },
    logoImg: "/tools_logos/mogul-ceo.svg",
    stats: {
      stat1: {
        num: "3–5 yrs",
        label: {
          en: "Business experience in 8–12 hours",
          ar: "خبرة أعمال من ٣-٥ سنوات في ٨-١٢ ساعة",
        },
      },
      stat2: {
        num: "3×",
        label: {
          en: "Retention vs. traditional lectures",
          ar: "أضعاف معدل الاستيعاب مقارنة بالدروس التقليدية",
        },
      },
      stat3: {
        num: "87%",
        label: {
          en: "Of employers cite a practical decision gap",
          ar: "من أصحاب العمل يشيرون لفجوة القرارات العملية",
        },
      },
    },
    targetAudience: {
      en: [
        "Senior managers and general management candidates",
        "Executive education and MBA cohorts",
        "Operations and supply chain leaders",
        "Succession and leadership pipeline programmes",
      ],
      ar: [
        "كبار المدراء والمرشحون للإدارة العامة",
        "دفوعات التعليم التنفيذي وماجستير الإدارة",
        "قادة العمليات وسلاسل الإمداد",
        "برامج الإعداد والتعاقب القيادي",
      ],
    },
    useCases: {
      en: [
        "Executive education intensives",
        "General management capability building",
        "Succession-pipeline development",
        "Competitive team events with real substance",
      ],
      ar: [
        "الدورات المكثفة للتعليم التنفيذي",
        "بناء قدرات الإدارة العامة",
        "تطوير خطط التعاقب القيادي",
        "الفعاليات التنافسية ذات المضمون الفعلي",
      ],
    },
    keyLearningAreas: {
      en: [
        "Make-or-buy and product mix decisions",
        "Operations and production planning",
        "Market strategy and distribution",
        "Financial management and interpretation",
        "Connecting functional decisions to company results",
      ],
      ar: [
        "قرارات التصنيع أو الشراء ومزيج المنتجات",
        "تخطيط العمليات والإنتاج",
        "استراتيجيات السوق والتوزيع",
        "الإدارة المالية والتحليل المالي",
        "ربط القرارات الوظيفية بالنتائج المالية",
      ],
    },
    chips: {
      en: [
        "Make-or-buy decisions",
        "Product mix optimization",
        "Market distribution",
        "Financial interpretation",
      ],
      ar: [
        "قرارات التصنيع أو الشراء",
        "مزيج المنتجات",
        "توزيع الأسواق",
        "التحليل المالي",
      ],
    },
    flyers: {
      en: "/flyers/en/mogul-ceo.pdf",
      ar: "/flyers/ar/mogul-ceo.pdf",
    },
  },
  {
    id: "maven",
    slug: "maven",
    title: "Maven™",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Marketing Simulation Game",
      ar: "لعبة محاكاة التسويق الاستراتيجي",
    },
    description: {
      en: "Manage two independent products across three regional markets, applying the full marketing mix with 65+ decisions per round.",
      ar: "إدارة منتجين مستقلين عبر ثلاثة أسواق إقليمية بتطبيق المزيج التسويقي الكامل مع 65+ قراراً بالجولة.",
    },
    about: {
      en: "Maven™ is an entry-to-medium level marketing simulation that closes the distance between marketing theory and marketing practice. Participants manage two independent products with retail distribution across three regional markets, executing more than sixty-five strategic decisions per round while applying the complete marketing mix — product, price, place and promotion. Immediate feedback after each round converts abstract frameworks into judgement participants can actually use.",
      ar: "تعد Maven™ محاكاة تسويق للمستوى المبتدئ إلى المتوسط تقرب المسافة بين النظرية والممارسة التسويقية. يدير المشاركون منتجين مستقلين وتوزيع تجزئة عبر ثلاثة أسواق إقليمية، وينفذون أكثر من ٦٥ قراراً استراتيجياً بكل جولة لتطبيق المزيج التسويقي الكامل.",
    },
    logoImg: "/tools_logos/maven.svg",
    stats: {
      stat1: {
        num: "65+",
        label: {
          en: "Strategic decisions per round",
          ar: "قرار استراتيجي بكل جولة",
        },
      },
      stat2: {
        num: "3",
        label: {
          en: "Regional markets",
          ar: "أسواق إقليمية",
        },
      },
      stat3: {
        num: "78%",
        label: {
          en: "Of graduates feel unprepared without practice",
          ar: "من الخريجين يشعرون بعدم الجاهزية بدون ممارسة",
        },
      },
    },
    targetAudience: {
      en: [
        "Marketing and brand teams",
        "Commercial and product managers",
        "Marketing students and graduate programmes",
        "Non-marketers who must brief and evaluate marketing",
      ],
      ar: [
        "فرق التسويق والعلامات التجارية",
        "مدراء المنتجات والتسويق التجاري",
        "طلاب برامج التسويق والخريجون",
        "غير المتخصصين الذين يوجهون عمل التسويق",
      ],
    },
    useCases: {
      en: [
        "Marketing capability programmes",
        "Bridging academic theory and commercial practice",
        "Product and brand management development",
        "Cross-functional marketing literacy",
      ],
      ar: [
        "برامج بناء القدرات التسويقية",
        "سد الفجوة بين النظرية الأكاديمية والممارسة",
        "تطوير إدارة المنتجات والعلامات التجارية",
        "رفع الوعي التسويقي بين القطاعات",
      ],
    },
    keyLearningAreas: {
      en: [
        "The complete marketing mix in application",
        "Segmentation and multi-market strategy",
        "Pricing and promotional trade-offs",
        "Reading market response data",
        "Managing a portfolio of products",
      ],
      ar: [
        "تطبيق المزيج التسويقي الكامل",
        "التقسيم واستراتيجية الأسواق المتعددة",
        "التوازنات بين التسعير والترويج",
        "قراءة بيانات استجابة السوق",
        "إدارة محفظة المنتجات",
      ],
    },
    chips: {
      en: [
        "Complete marketing mix",
        "Segmentation strategy",
        "Pricing trade-offs",
        "Market response data",
      ],
      ar: [
        "المزيج التسويقي الكامل",
        "استراتيجية التقسيم",
        "توازنات التسعير",
        "بيانات استجابة السوق",
      ],
    },
    flyers: {
      en: "/flyers/en/maven.pdf",
      ar: "/flyers/ar/maven.pdf",
    },
  },
  {
    id: "synergystack",
    slug: "synergystack",
    title: "SynergyStack®",
    category: {
      en: "Business Simulation Game",
      ar: "لعبة محاكاة الأعمال",
    },
    tagline: {
      en: "Team Dynamics & Collaboration Workshop",
      ar: "ورشة عمل ديناميكيات وتناغم الفرق",
    },
    description: {
      en: "The workshop that moves teams from dysfunction to high performance — in a single day.",
      ar: "ورشة العمل التي تنقل الفرق من التعثر إلى الأداء الفائق المتميز — في يوم واحد.",
    },
    about: {
      en: "SynergyStack® is a structured team development system built around four pillars: Clarity — crystal-clear communication, role definition and decision frameworks; Connection — cross-functional trust and psychological safety; Commitment — an execution culture that converts intent into measurable follow-through; and Curiosity — an innovation mindset with courageous questions and continuous improvement. A single-day workshop is followed by a thirty-day structured sprint for habit adoption.",
      ar: "تعد SynergyStack® نظاماً منظماً لتطوير الفرق يبنى على أربعة أركان: الوضوح — التواصل الجلي وتحديد الأدوار وأطر اتخاذ القرارات؛ الاتصال — الثقة التكافلية والسلامة النفسية؛ الالتزام — ثقافة التنفيذ التي تحول النوايا لمتابعة ملموسة؛ والفضول — عقلية الابتكار والتحسين المستمر. تعقب ورشة العمل ذات اليوم الواحد خطة عمل مدتها ٣٠ يوماً لترسيخ العادات.",
    },
    logoImg: "/tools_logos/synergystack.png",
    stats: {
      stat1: {
        num: "90%",
        label: {
          en: "Report immediate clarity in roles",
          ar: "أفادوا بوضوح فوري في الأدوار والمسؤوليات",
        },
      },
      stat2: {
        num: "75%",
        label: {
          en: "Higher habit retention vs. lectures",
          ar: "معدل استمرار العادات أعلى مقارنة بالدروس",
        },
      },
      stat3: {
        num: "30 days",
        label: {
          en: "Structured adoption sprint",
          ar: "برنامج عملي منظَم لتثبيت العادات لمدة ٣٠ يوماً",
        },
      },
    },
    targetAudience: {
      en: [
        "Intact teams with collaboration friction",
        "Newly formed or newly merged teams",
        "Cross-functional project teams",
        "Leadership teams setting working norms",
      ],
      ar: [
        "الفرق القائمة التي تعاني من معوقات التعاون",
        "الفرق حديثة التشكيل أو المدمجة حديثاً",
        "فرق المشاريع المتقاطعة الإدارات",
        "فرق القيادة التي تضع قواعد العمل الموحدة",
      ],
    },
    useCases: {
      en: [
        "Team resets after restructuring or merger",
        "Project team kick-offs",
        "Addressing low trust and unclear ownership",
        "Establishing team working agreements",
      ],
      ar: [
        "إعادة ضبط الفرق بعد الهيكلة أو الدمج",
        "انطلاقات فرق المشاريع الجديدة",
        "معالجة انخفاض الثقة وعدم وضوح المسؤولية",
        "وضع اتفاقيات ومعايير العمل الجماعي",
      ],
    },
    keyLearningAreas: {
      en: [
        "Role clarity and decision rights",
        "Building cross-functional trust",
        "Psychological safety in practice",
        "Converting intent into follow-through",
        "Constructive challenge and continuous improvement",
      ],
      ar: [
        "وضوح الأدوار وصلاحيات اتخاذ القرارات",
        "بناء الثقة بين الإدارات المتقاطعة",
        "الممارسة العملية والسلامة النفسية",
        "تحويل النوايا لمتابعة وتنفيذ ملموس",
        "التحدي البناء والتحسين المستمر",
      ],
    },
    chips: {
      en: [
        "Role clarity & decision rights",
        "Cross-functional trust",
        "Psychological safety",
        "Continuous improvement",
      ],
      ar: [
        "وضوح الأدوار القرارات",
        "الثقة بين الإدارات",
        "السلامة النفسية",
        "التحسين المستمر",
      ],
    },
    flyers: {
      en: "/flyers/en/synergystack.pdf",
      ar: "/flyers/ar/synergystack.pdf",
    },
  },
];
