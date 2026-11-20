import { Lang } from '../types';

export const navItems = [
  { id: 'home', en: 'Home', ar: 'الرئيسية' },
  { id: 'introduction', en: 'Introduction', ar: 'المقدمة' },
  { id: 'problem', en: 'Problem Statement', ar: 'المشكلة' },
  { id: 'motivation', en: 'Motivation', ar: 'الدوافع' },
  { id: 'objectives', en: 'Objectives', ar: 'الأهداف' },
  { id: 'literature', en: 'Literature Review', ar: 'الدراسات والأدبيات السابقة' },
  { id: 'solution', en: 'Proposed Solution', ar: 'الحل المقترح' },
  { id: 'architecture', en: 'System Architecture', ar: 'بنية النظام' },
  { id: 'how', en: 'How It Works', ar: 'آلية العمل' },
  { id: 'technologies', en: 'Technologies', ar: 'التقنيات' },
  { id: 'lab', en: 'Interactive Lab', ar: 'المختبر التفاعلي' },
  { id: 'team', en: 'About the Team', ar: 'فريق العمل' },
];

export const t = {
  hero: {
    title: { en: 'AUTONOMOUS SELF-HEALING ENTERPRISE NETWORK FRAMEWORK', ar: 'إطار عمل الشبكات المؤسسية ذاتية الإصلاح المستقلة' },
    subtitle: { en: 'An intelligent framework designed to detect, analyze, and automatically respond to network failures and security threats.', ar: 'إطار ذكي مصمم لاكتشاف أعطال الشبكة والتهديدات الأمنية وتحليلها والاستجابة لها تلقائياً.' },
    ctaExplore: { en: 'Explore the Framework', ar: 'استكشف الإطار' },
    ctaLab: { en: 'Launch Interactive Lab', ar: 'تشغيل المختبر التفاعلي' },
    status: { en: 'SYSTEM STATUS: OPERATIONAL', ar: 'حالة النظام: يعمل' },
  },
  intro: {
    title: { en: 'Project Introduction', ar: 'مقدمة المشروع' },
    what: { en: 'What is a Self-Healing Network?', ar: 'ما هي الشبكة ذاتية الإصلاح؟' },
    whatDesc: { en: 'A self-healing network is designed to continuously monitor its own state, detect abnormal conditions or failures, and initiate appropriate recovery or mitigation actions with minimal human intervention.', ar: 'الشبكة ذاتية الإصلاح مصممة لمراقبة حالتها باستمرار، واكتشاف الحالات الشاذة أو الأعطال، وبدء إجراءات الاستعادة أو التخفيف المناسبة بأقل تدخل بشري.' },
    whyHard: { en: 'Why are enterprise networks difficult to manage?', ar: 'لماذا يصعب إدارة الشبكات المؤسسية؟' },
    whyHardDesc: { en: 'Enterprise networks generate large volumes of traffic across many devices and segments. Manual monitoring, troubleshooting, and coordination between tools increase complexity and response time.', ar: 'تولد الشبكات المؤسسية أحجاماً كبيرة من الحركة عبر أجهزة وقطاعات متعددة. المراقبة اليدوية واستكشاف الأخطاء والتنسيق بين الأدوات تزيد التعقيد وزمن الاستجابة.' },
    failures: { en: 'What happens when network failures occur?', ar: 'ماذا يحدث عند وقوع أعطال؟' },
    failuresDesc: { en: 'Failures can interrupt services, disrupt communication, and impact business operations. Delayed detection and recovery extend downtime and increase administrative workload.', ar: 'قد تؤدي الأعطال إلى انقطاع الخدمات وتعطيل الاتصال والتأثير على العمليات. تأخر الاكتشاف والاستعادة يطيل فترة التوقف ويزيد عبء الإدارة.' },
    automation: { en: 'Why is automation important?', ar: 'لماذا الأتمتة مهمة؟' },
    automationDesc: { en: 'Automation enables faster, consistent responses to known conditions, reduces reliance on continuous manual intervention, and supports timely incident handling.', ar: 'تمكّن الأتمتة من استجابات أسرع ومتسقة للحالات المعروفة، وتقلل الاعتماد على التدخل اليدوي المستمر، وتدعم معالجة الحوادث في الوقت المناسب.' },
    intelligent: { en: 'How can intelligent monitoring improve reliability?', ar: 'كيف تحسّن المراقبة الذكية الموثوقية؟' },
    intelligentDesc: { en: 'By collecting and analyzing network information, an intelligent framework can help identify abnormal behavior, classify incidents, and guide or trigger predefined recovery and security actions.', ar: 'من خلال جمع معلومات الشبكة وتحليلها، يمكن للإطار الذكي المساعدة في تحديد السلوك غير الطبيعي وتصنيف الحوادث وتوجيه أو تفعيل إجراءات الاستعادة والأمن المحددة مسبقاً.' },
  },
  problem: {
    title: { en: 'Problem Statement', ar: 'صياغة المشكلة' },
    items: [
      { en: 'Traditional networks require manual intervention.', ar: 'الشبكات التقليدية تتطلب تدخلاً يدوياً.' },
      { en: 'Network failures can cause service interruptions.', ar: 'أعطال الشبكة قد تسبب انقطاع الخدمات.' },
      { en: 'Detecting abnormal traffic can be difficult.', ar: 'اكتشاف الحركة غير الطبيعية قد يكون صعباً.' },
      { en: 'Security threats require rapid responses.', ar: 'التهديدات الأمنية تتطلب استجابات سريعة.' },
      { en: 'Manual troubleshooting increases recovery time.', ar: 'استكشاف الأخطاء اليدوي يزيد زمن الاستعادة.' },
      { en: 'Network administrators need continuous monitoring.', ar: 'مديرو الشبكات بحاجة إلى مراقبة مستمرة.' },
    ],
  },
  motivation: {
    title: { en: 'Motivation', ar: 'الدوافع' },
    intro: { en: 'The motivation for this project arises from the following considerations:', ar: 'تنشأ دوافع هذا المشروع من الاعتبارات التالية:' },
    items: [
      { en: 'Reducing the time between the detection of a threat and the application of a defensive action.', ar: 'تقليل الزمن بين اكتشاف التهديد وتطبيق إجراء دفاعي.' },
      { en: 'Reducing the dependence on continuous manual monitoring of network traffic.', ar: 'تقليل الاعتماد على المراقبة اليدوية المستمرة لحركة مرور الشبكة.' },
      { en: 'Exploring the practical application of machine learning to network intrusion detection using a recognised public dataset.', ar: 'استكشاف التطبيق العملي لتعلّم الآلة في كشف اختراق الشبكات باستخدام مجموعة بيانات عامة معترف بها.' },
      { en: 'Providing administrators with a centralised view of network security events and the actions taken in response to them.', ar: 'تزويد المسؤولين برؤية مركزية لأحداث أمن الشبكة والإجراءات المتخذة استجابةً لها.' },
      { en: 'Gaining hands-on experience in combining networking, cybersecurity, machine learning, and software development within one integrated system.', ar: 'اكتساب خبرة عملية في دمج الشبكات والأمن السيبراني وتعلّم الآلة وتطوير البرمجيات ضمن نظام متكامل واحد.' },
    ],
  },
  objectives: {
    title: { en: 'Project Objectives', ar: 'أهداف المشروع' },
    items: [
      { en: 'Continuous Network Monitoring', ar: 'مراقبة مستمرة للشبكة' },
      { en: 'Automatic Failure Detection', ar: 'اكتشاف تلقائي للأعطال' },
      { en: 'Abnormal Traffic Identification', ar: 'تحديد الحركة غير الطبيعية' },
      { en: 'Incident Classification', ar: 'تصنيف الحوادث' },
      { en: 'Automated Response', ar: 'استجابة آلية' },
      { en: 'Network Recovery', ar: 'استعادة الشبكة' },
      { en: 'Reduced Downtime', ar: 'تقليل زمن التوقف' },
      { en: 'Improved Network Reliability', ar: 'تحسين موثوقية الشبكة' },
    ],
  },
  literature: {
    title: { en: 'Literature Review', ar: 'الدراسات والأدبيات السابقة' },
    subtitle: { en: 'Review of related concepts and prior work relevant to the proposed framework.', ar: 'استعراض للمفاهيم والأعمال السابقة ذات الصلة بالإطار المقترح.' },
    idps: {
      number: '4.1',
      title: { en: 'Existing Intrusion Detection and Prevention Systems', ar: 'أنظمة كشف ومنع الاختراق الحالية' },
      paragraphs: [
        {
          en: 'Scarfone and Mell (2007), in NIST Special Publication 800-94, define intrusion detection as the process of monitoring events occurring in a computer system or network and analysing them for signs of possible incidents, and intrusion prevention as the process of performing intrusion detection and attempting to stop detected possible incidents. The guide describes the principal categories of IDPS technologies, including network-based, wireless, network behaviour analysis, and host-based systems, and discusses common detection methodologies such as signature-based, anomaly-based, and stateful protocol analysis.',
          ar: 'عرّف سكارفون ومل (Scarfone & Mell, 2007) في منشور NIST الخاص 800-94 كشف الاختراق بأنه عملية مراقبة الأحداث التي تقع في نظام حاسوبي أو شبكة وتحليلها بحثاً عن مؤشرات لحوادث محتملة، ومنع الاختراق بأنه عملية إجراء كشف الاختراق ومحاولة إيقاف الحوادث المحتملة المكتشفة. ويصف الدليل الفئات الرئيسية لتقنيات أنظمة كشف ومنع الاختراق (IDPS)، بما في ذلك الأنظمة المعتمدة على الشبكة، واللاسلكية، وتحليل سلوك الشبكة، والأنظمة المعتمدة على المضيف، كما يناقش منهجيات الكشف الشائعة مثل الكشف المعتمد على التوقيع، والكشف المعتمد على الشذوذ، وتحليل البروتوكول ذي الحالة.',
        },
        {
          en: 'Signature-based detection is effective at identifying known threats but is generally limited in its ability to detect previously unseen attack patterns. Anomaly-based detection compares observed activity against a profile of normal behaviour and can potentially identify novel threats, although it may produce false positives. These characteristics have motivated ongoing research into more adaptive detection approaches.',
          ar: 'يُعد الكشف المعتمد على التوقيع فعالاً في تحديد التهديدات المعروفة، لكنه غالباً ما يكون محدوداً في قدرته على اكتشاف أنماط الهجوم غير المرصودة سابقاً. أما الكشف المعتمد على الشذوذ فيقارن النشاط المُلاحظ بملف تعريف للسلوك الطبيعي ويمكنه احتمالياً تحديد تهديدات جديدة، وإن كان قد يُنتج إنذارات إيجابية كاذبة. وقد دفعت هذه الخصائص إلى استمرار الأبحاث نحو مناهج كشف أكثر تكيفاً.',
        },
      ],
    },
    gap: {
      number: '4.3',
      title: { en: 'Research Gap', ar: 'الفجوة البحثية' },
      paragraphs: [
        {
          en: 'Much of the work on machine learning-based intrusion detection concentrates on the detection and classification stage, often evaluating models offline against datasets. Detection results must still be acted upon, and in many practical settings the response to a detected threat remains a manual task. Consequently, there is scope for practical prototypes that connect intelligent detection with controlled, automated response actions and centralised visibility within a single workflow.',
          ar: 'يركّز قدر كبير من الأعمال المتعلقة بكشف الاختراق المعتمد على تعلّم الآلة على مرحلتي الاكتشاف والتصنيف، وغالباً ما يتم تقييم النماذج بشكل غير متصل (Offline) على مجموعات بيانات. ومع ذلك، لا بد من اتخاذ إجراءات بناءً على نتائج الكشف، وفي كثير من البيئات العملية تظل الاستجابة للتهديد المكتشف مهمة يدوية. وبناءً على ذلك، هناك مجال لتطوير نماذج أولية عملية تربط بين الكشف الذكي وإجراءات استجابة آلية مضبوطة مع رؤية مركزية ضمن سير عمل واحد.',
        },
      ],
    },
  },
  solution: {
    title: { en: 'Proposed Solution', ar: 'الحل المقترح' },
    desc: { en: 'The proposed framework integrates monitoring, detection, classification, decision-making, and controlled automated response into a single workflow. Implementation details (specific ML models, algorithms, or protocols) remain configurable/proposed unless confirmed in the project.', ar: 'يدمج الإطار المقترح المراقبة والاكتشاف والتصنيف واتخاذ القرار والاستجابة الآلية المضبوطة في سير عمل واحد. تبقى تفاصيل التنفيذ (نماذج تعلم آلي أو خوارزميات أو بروتوكولات محددة) قابلة للتحديد/مقترحة ما لم تُعتمد في المشروع.' },
    steps: [
      { id: 'monitoring', en: 'Network Monitoring', ar: 'مراقبة الشبكة', detail: { en: 'Continuously observes network status and traffic conditions across the simulated enterprise environment.', ar: 'يراقب باستمرار حالة الشبكة وظروف الحركة عبر بيئة المؤسسة المحاكاة.' } },
      { id: 'collection', en: 'Data Collection', ar: 'جمع البيانات', detail: { en: 'Captures and organizes relevant traffic and status information for analysis.', ar: 'يلتقط وينظم معلومات الحركة والحالة ذات الصلة للتحليل.' } },
      { id: 'detection', en: 'Anomaly Detection', ar: 'اكتشاف الشذوذ', detail: { en: 'Identifies deviations from expected behavior or signs of failure/suspicious activity (proposed ML-based analysis).', ar: 'يحدد الانحرافات عن السلوك المتوقع أو علامات العطل/النشاط المشبوه (تحليل مقترح قائم على التعلم الآلي).' } },
      { id: 'classification', en: 'Incident Classification', ar: 'تصنيف الحادثة', detail: { en: 'Classifies the condition as a network failure or a security-related incident to guide the response.', ar: 'يصنف الحالة كعطل شبكي أو حادثة أمنية لتوجيه الاستجابة.' } },
      { id: 'decision', en: 'Decision Engine', ar: 'محرك القرار', detail: { en: 'Selects an appropriate predefined, controlled action based on the classified incident and configured rules.', ar: 'يختار إجراءً محدداً مسبقاً ومضبوطاً بناءً على الحادثة المصنفة والقواعد المهيأة.' } },
      { id: 'response', en: 'Automated Response', ar: 'الاستجابة الآلية', detail: { en: 'Executes the selected simulated action (e.g., recovery step or isolation) in a controlled manner.', ar: 'ينفذ الإجراء المحاكى المختار (مثل خطوة استعادة أو عزل) بطريقة مضبوطة.' } },
      { id: 'recovery', en: 'Network Recovery', ar: 'استعادة الشبكة', detail: { en: 'Restores affected connectivity or mitigates the condition according to the chosen response.', ar: 'يعيد الاتصال المتأثر أو يخفف الحالة وفق الاستجابة المختارة.' } },
      { id: 'verification', en: 'System Verification', ar: 'التحقق من النظام', detail: { en: 'Checks whether the issue is resolved and records the outcome for visibility and review.', ar: 'يتحقق مما إذا تم حل المشكلة ويسجل النتيجة للعرض والمراجعة.' } },
    ],
  },
  arch: {
    title: { en: 'System Architecture', ar: 'بنية النظام' },
    hint: { en: 'Click a component to view details. Animated arrows represent logical data flow.', ar: 'انقر على مكوّن لعرض التفاصيل. الأسهم المتحركة تمثل تدفق البيانات المنطقي.' },
    components: [
      { id: 'infra', en: 'Enterprise Network Infrastructure', ar: 'البنية التحتية للشبكة المؤسسية', resp: { en: 'Simulated routers, switches, servers, clients, and segments.', ar: 'موجهات ومبدلات وخوادم وعملاء وقطاعات محاكاة.' }, input: { en: 'Traffic and connectivity state.', ar: 'حركة البيانات وحالة الاتصال.' }, output: { en: 'Operational network events.', ar: 'أحداث تشغيل الشبكة.' } },
      { id: 'mon', en: 'Network Monitoring Layer', ar: 'طبقة مراقبة الشبكة', resp: { en: 'Observes status and traffic conditions.', ar: 'تراقب الحالة وظروف الحركة.' }, input: { en: 'Network events and packets (simulated).', ar: 'أحداث الشبكة والحزم (محاكاة).' }, output: { en: 'Monitoring signals.', ar: 'إشارات المراقبة.' } },
      { id: 'collect', en: 'Data Collection Layer', ar: 'طبقة جمع البيانات', resp: { en: 'Gathers and structures monitored information.', ar: 'تجمع وتنظم المعلومات المراقبة.' }, input: { en: 'Monitoring signals.', ar: 'إشارات المراقبة.' }, output: { en: 'Collected features/status records.', ar: 'سجلات خصائص/حالة مجمعة.' } },
      { id: 'detect', en: 'Detection and Analysis Engine', ar: 'محرك الاكتشاف والتحليل', resp: { en: 'Analyzes collected data to identify anomalies or threats (proposed).', ar: 'يحلل البيانات المجمعة لتحديد الشذوذ أو التهديدات (مقترح).' }, input: { en: 'Collected records.', ar: 'السجلات المجمعة.' }, output: { en: 'Detection findings.', ar: 'نتائج الاكتشاف.' } },
      { id: 'classify', en: 'Incident Classification Module', ar: 'وحدة تصنيف الحوادث', resp: { en: 'Labels incidents (failure vs. security).', ar: 'تصنف الحوادث (عطل مقابل أمني).' }, input: { en: 'Detection findings.', ar: 'نتائج الاكتشاف.' }, output: { en: 'Incident class and context.', ar: 'فئة الحادثة وسياقها.' } },
      { id: 'decision', en: 'Decision Engine', ar: 'محرك القرار', resp: { en: 'Chooses predefined controlled actions.', ar: 'يختار إجراءات مضبوطة محددة مسبقاً.' }, input: { en: 'Incident class.', ar: 'فئة الحادثة.' }, output: { en: 'Selected response action.', ar: 'إجراء الاستجابة المختار.' } },
      { id: 'response', en: 'Automated Response Module', ar: 'وحدة الاستجابة الآلية', resp: { en: 'Executes simulated defensive/recovery actions.', ar: 'تنفذ إجراءات دفاع/استعادة محاكاة.' }, input: { en: 'Selected action.', ar: 'الإجراء المختار.' }, output: { en: 'Action execution status.', ar: 'حالة تنفيذ الإجراء.' } },
      { id: 'recover', en: 'Recovery and Verification Module', ar: 'وحدة الاستعادة والتحقق', resp: { en: 'Confirms resolution and restores state.', ar: 'تؤكد الحل وتعيد الحالة.' }, input: { en: 'Execution status.', ar: 'حالة التنفيذ.' }, output: { en: 'Verified outcome.', ar: 'نتيجة مُتحقق منها.' } },
      { id: 'dash', en: 'Monitoring Dashboard', ar: 'لوحة المراقبة', resp: { en: 'Displays status, alerts, logs, and metrics.', ar: 'تعرض الحالة والتنبيهات والسجلات والمؤشرات.' }, input: { en: 'Events and outcomes.', ar: 'الأحداث والنتائج.' }, output: { en: 'Administrator visibility.', ar: 'رؤية للمسؤول.' } },
    ],
  },
  how: {
    title: { en: 'How the Framework Works', ar: 'كيف يعمل الإطار' },
    scenario: { en: 'Scenario: A server suddenly becomes unreachable.', ar: 'سيناريو: يصبح الخادم غير متاح فجأة.' },
    steps: [
      { en: 'Normal Operation — The network operates normally.', ar: 'تشغيل طبيعي — تعمل الشبكة بشكل طبيعي.' },
      { en: 'Failure Simulation — A network device or connection becomes unavailable.', ar: 'محاكاة عطل — يصبح جهاز أو اتصال غير متاح.' },
      { en: 'Monitoring — The monitoring layer detects an abnormal condition.', ar: 'المراقبة — تكتشف طبقة المراقبة حالة شاذة.' },
      { en: 'Analysis — The system examines the collected information.', ar: 'التحليل — يفحص النظام المعلومات المجمعة.' },
      { en: 'Classification — The incident is classified as a network failure.', ar: 'التصنيف — تُصنف الحادثة كعطل شبكي.' },
      { en: 'Decision Making — The decision engine selects an appropriate response.', ar: 'اتخاذ القرار — يختار محرك القرار استجابة مناسبة.' },
      { en: 'Automated Recovery — The framework performs a simulated recovery action.', ar: 'استعادة آلية — ينفذ الإطار إجراء استعادة محاكياً.' },
      { en: 'Verification — The system checks whether connectivity has been restored.', ar: 'التحقق — يتحقق النظام من استعادة الاتصال.' },
    ],
  },
  tech: {
    title: { en: 'Technologies and Tools', ar: 'التقنيات والأدوات' },
    note: { en: 'IMPORTANT: Technologies are shown as implemented, proposed, or under consideration based on the project proposal. No unconfirmed implementation is claimed.', ar: 'هام: تُعرض التقنيات كمنفذة أو مقترحة أو قيد الدراسة وفقاً لمقترح المشروع. لا يتم ادعاء أي تنفيذ غير مؤكد.' },
    categories: [
      { cat: { en: 'Network Simulation', ar: 'محاكاة الشبكات' }, items: [
        { name: 'GNS3', status: 'proposed', desc: { en: 'Used to build and simulate an enterprise network topology and run controlled test scenarios safely.', ar: 'سيُستخدم لبناء ومحاكاة طوبولوجيا شبكة مؤسسية وتشغيل سيناريوهات اختبار مضبوطة بأمان.' } },
        { name: 'Cisco IOS / Virtual Devices', status: 'proposed', desc: { en: 'Emulate routers, switches, and other devices to mimic realistic network behavior in the lab.', ar: 'لمحاكاة الموجهات والمبدلات والأجهزة الافتراضية لتقريب سلوك الشبكة الواقعي في بيئة الاختبار.' } },
      ]},
      { cat: { en: 'Network Monitoring', ar: 'مراقبة الشبكة' }, items: [
        { name: 'Scapy (packet inspection)', status: 'proposed', desc: { en: 'Capture and inspect network packets in Python to extract useful traffic features for analysis.', ar: 'لالتقاط وفحص حزم الشبكة باستخدام بايثون واستخراج خصائص الحركة اللازمة للتحليل.' } },
        { name: 'Traffic analysis concepts', status: 'proposed', desc: { en: 'Analyze traffic patterns and status to help distinguish normal behavior from abnormal conditions.', ar: 'لتحليل أنماط الحركة والحالة للمساعدة في التمييز بين السلوك الطبيعي والحالات الشاذة.' } },
      ]},
      { cat: { en: 'Programming Languages', ar: 'لغات البرمجة' }, items: [
        { name: 'Python', status: 'proposed', desc: { en: 'Main language for developing monitoring, detection, automation, and integration components.', ar: 'اللغة الأساسية المقترحة لتطوير مكونات المراقبة والاكتشاف والأتمتة والتكامل.' } },
        { name: 'TypeScript (this interactive platform)', status: 'implemented', desc: { en: 'Used to build this interactive browser-based simulation platform and its user interface.', ar: 'استُخدمت لبناء هذه المنصة التفاعلية للمحاكاة داخل المتصفح وواجهتها.' } },
      ]},
      { cat: { en: 'Backend Development', ar: 'تطوير الخلفية' }, items: [
        { name: 'FastAPI', status: 'proposed', desc: { en: 'Provide a backend API to connect monitoring, detection, response logic, and the dashboard.', ar: 'لتوفير واجهة برمجية خلفية تربط المراقبة والاكتشاف ومنطق الاستجابة ولوحة العرض.' } },
      ]},
      { cat: { en: 'Frontend Development', ar: 'تطوير الواجهة' }, items: [
        { name: 'React + Vite + Tailwind', status: 'implemented', desc: { en: 'Used to build this responsive, interactive web interface and visualizations.', ar: 'استُخدمت لبناء هذه الواجهة التفاعلية المتجاوبة والعروض المرئية.' } },
        { name: 'Streamlit (dashboard option)', status: 'proposed', desc: { en: 'An optional tool to quickly build a simple monitoring dashboard if selected.', ar: 'خيار بديل مقترح لبناء لوحة مراقبة بسيطة بسرعة عند الحاجة.' } },
      ]},
      { cat: { en: 'Database', ar: 'قاعدة البيانات' }, items: [
        { name: 'SQLite (event logging)', status: 'proposed', desc: { en: 'Store security events, detected incidents, and executed responses for later review.', ar: 'لتخزين أحداث الأمان والحوادث المكتشفة والاستجابات المنفذة للمراجعة لاحقاً.' } },
      ]},
      { cat: { en: 'Cybersecurity', ar: 'الأمن السيبراني' }, items: [
        { name: 'IDPS concepts (NIST SP 800-94)', status: 'proposed', desc: { en: 'Guide the design of detection and prevention principles and incident handling approach.', ar: 'لاسترشاد بها في مبادئ الكشف والمنع ومنهجية التعامل مع الحوادث.' } },
        { name: 'Threat detection/classification workflow', status: 'proposed', desc: { en: 'Define how traffic/incidents are analyzed and labeled (e.g. failure vs. threat) to trigger the right response.', ar: 'لتحديد كيفية تحليل الحركة/الحوادث وتصنيفها (عطل أو تهديد) لتفعيل الاستجابة المناسبة.' } },
      ]},
      { cat: { en: 'Automation', ar: 'الأتمتة' }, items: [
        { name: 'Netmiko (device automation)', status: 'proposed', desc: { en: 'Apply predefined, controlled actions on supported network devices (e.g. access-control rules) when needed.', ar: 'لتطبيق إجراءات مضبوطة ومحددة مسبقاً على أجهزة الشبكة المدعومة (مثل قواعد التحكم بالوصول) عند الحاجة.' } },
        { name: 'Rule-based automated response', status: 'proposed', desc: { en: 'Automatically execute safe, predefined responses based on the classified incident type.', ar: 'لتنفيذ استجابات آمنة ومحددة مسبقاً تلقائياً بناءً على نوع الحادثة المصنفة.' } },
      ]},
    ],
  },
  results: {
    title: { en: 'Results and Performance Visualization', ar: 'النتائج وتصور الأداء' },
    note: { en: 'Illustrative/conceptual comparison only. No experimental results or measured performance improvements are claimed.', ar: 'مقارنة توضيحية/تصورية فقط. لا يتم ادعاء نتائج تجريبية أو تحسينات أداء مقاسة.' },
    traditional: { en: 'Traditional Manual Network Management', ar: 'الإدارة اليدوية التقليدية' },
    automated: { en: 'Automated Self-Healing Framework (Conceptual)', ar: 'إطار ذاتي الإصلاح آلي (تصوري)' },
    dims: [
      { en: 'Failure Detection', ar: 'اكتشاف الأعطال', t: 30, a: 85 },
      { en: 'Incident Response', ar: 'الاستجابة للحوادث', t: 35, a: 80 },
      { en: 'Recovery Workflow', ar: 'سير عمل الاستعادة', t: 40, a: 82 },
      { en: 'Network Monitoring', ar: 'مراقبة الشبكة', t: 45, a: 90 },
      { en: 'Administrator Intervention', ar: 'تدخل المسؤول (أقل أفضل)', t: 80, a: 30, invert: true },
    ],
  },
  team: {
    title: { en: 'Project Team', ar: 'فريق المشروع' },
    dept: { en: 'Department of Information Technology', ar: 'قسم تقنية المعلومات' },
    uni: { en: 'University German International – Aden', ar: 'الجامعة الألمانية الدولية – عدن' },
    roleEditable: { en: 'Role: (editable)', ar: 'الدور: (قابل للتعديل)' },
    members: [
      { name: 'Ehab Tawfik', role: { en: 'Project Coordination, System Architecture, and Integration', ar: 'تنسيق المشروع، بنية النظام، والتكامل' } },
      { name: 'Osama Ahmed', role: { en: 'Network Design, GNS3 Simulation, and Network Configuration', ar: 'تصميم الشبكة، محاكاة GNS3، وتهيئة الشبكة' } },
      { name: 'Ahmed Anees', role: { en: 'Machine Learning, Dataset Preparation, and Threat Detection', ar: 'تعلم الآلة، إعداد البيانات، واكتشاف التهديدات' } },
      { name: 'Ahmed Saleh', role: { en: 'Backend Development, Dashboard, Database, and Logging', ar: 'تطوير الخلفية، لوحة التحكم، قاعدة البيانات، والسجلات' } },
    ],
  },
  closing: {
    title: { en: 'BUILDING MORE RESILIENT AND INTELLIGENT NETWORKS', ar: 'بناء شبكات أكثر مرونة وذكاءً' },
    subtitle: { en: 'Moving from traditional manual network management toward automated detection, response, and recovery.', ar: 'الانتقال من الإدارة اليدوية التقليدية للشبكات نحو الاكتشاف والاستجابة والاستعادة الآلية.' },
    cta: { en: 'EXPLORE THE INTERACTIVE LAB', ar: 'استكشف المختبر التفاعلي' },
  },
  lab: {
    title: { en: 'Interactive Network Simulation Lab', ar: 'مختبر محاكاة الشبكة التفاعلي' },
    disclaimer: { en: 'Browser-based simulation only. This does not connect to physical Cisco devices, execute real network commands, block actual attacks, or run a live GNS3 environment.', ar: 'محاكاة داخل المتصفح فقط. لا يتصل بأجهزة سيسكو حقيقية، ولا ينفذ أوامر شبكة فعلية، ولا يحظر هجمات حقيقية، ولا يشغل بيئة GNS3 حية.' },
    controls: { en: 'Simulation Controls', ar: 'أدوات التحكم' },
    addDevice: { en: 'Add Device', ar: 'إضافة جهاز' },
    scenarios: { en: 'Ready-to-Run Scenarios', ar: 'سيناريوهات جاهزة' },
    dashboard: { en: 'Live Monitoring Dashboard', ar: 'لوحة المراقبة الحية' },
    logs: { en: 'Event Logs', ar: 'سجل الأحداث' },
  },
  statusLabels: {
    proposed: { en: 'Proposed', ar: 'مقترح' },
    implemented: { en: 'Implemented (this platform)', ar: 'منفذ (في هذه المنصة)' },
    consideration: { en: 'Under consideration', ar: 'قيد الدراسة' },
  },
};

export function tr(lang: Lang, obj: { en: string; ar: string }): string {
  return obj[lang] ?? obj.en;
}
