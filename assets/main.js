(function () {
  const root = document.documentElement;
  const year = document.getElementById("year");
  const themeToggle = document.getElementById("themeToggle");
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const originalText = new WeakMap();
  const originalTitle = document.title;

  const ar = {
    "Othman Alabed": "عثمان العابد",
    "Home": "الرئيسية",
    "Projects": "المشاريع",
    "About": "نبذة",
    "Resume": "السيرة الذاتية",
    "Contact": "تواصل",
    "GitHub": "جيت هب",
    "Hosted on GitHub Pages (free)": "مستضاف على GitHub Pages",
    "Data Analyst • Tableau • Power BI • SQL • Excel Dashboards": "محلل بيانات • Tableau • Power BI • SQL • لوحات Excel",
    "Data Analyst Portfolio": "ملف أعمال محلل بيانات",
    "I analyze data to produce reliable insights, KPIs, and clear dashboards. My work focuses on practical reporting using Tableau, SQL, Power BI, Excel, and Python foundations to support decision-making.": "أحلل البيانات لإنتاج رؤى موثوقة، ومؤشرات أداء واضحة، ولوحات معلومات تساعد على اتخاذ القرار. يركز عملي على التقارير العملية باستخدام Tableau وSQL وPower BI وExcel وأساسيات Python.",
    "View Projects": "عرض المشاريع",
    "View Resume": "عرض السيرة الذاتية",
    "Featured work": "أعمال مميزة",
    "Business intelligence and analytics projects using Tableau, Power BI, SQL, Excel, and practical reporting workflows.": "مشاريع ذكاء أعمال وتحليلات باستخدام Tableau وPower BI وSQL وExcel مع أسلوب تقارير عملي وواضح.",
    "Tableau Sales & Customer Dashboard": "لوحة مبيعات وعملاء Tableau",
    "2023 KPIs • Customer analytics • Trend insights": "مؤشرات 2023 • تحليل العملاء • رؤى الاتجاهات",
    "Power BI & SQL Pizza Sales Analysis": "تحليل مبيعات البيتزا باستخدام Power BI وSQL",
    "Revenue KPIs • Order trends • Product performance": "مؤشرات الإيرادات • اتجاهات الطلبات • أداء المنتجات",
    "Data Roles Analytics (Excel)": "تحليل وظائف البيانات (Excel)",
    "Skills demand • Salary benchmarks • Trend analysis": "طلب المهارات • مقارنات الرواتب • تحليل الاتجاهات",
    "Salary Dashboard (Excel)": "لوحة الرواتب (Excel)",
    "Interactive filtering • KPIs • Comparison visuals": "تصفية تفاعلية • مؤشرات أداء • مرئيات مقارنة",
    "What I do": "ماذا أقدم",
    "A practical Data Analyst skillset aligned with real business and operational needs.": "مهارات تحليل بيانات عملية مرتبطة باحتياجات الأعمال والتشغيل.",
    "Analytics & KPI Reporting": "التحليل وتقارير مؤشرات الأداء",
    "Clean data, define KPIs, and produce concise summaries that answer business questions.": "تنظيف البيانات، تعريف مؤشرات الأداء، وإنتاج ملخصات واضحة تجيب عن أسئلة الأعمال.",
    "Dashboards & Visualization": "لوحات المعلومات والتصور البصري",
    "Build clear Excel dashboards and charts that communicate insights quickly and accurately.": "بناء لوحات Excel ومخططات واضحة تنقل الرؤى بسرعة ودقة.",
    "Data Preparation (Practical)": "إعداد البيانات عملياً",
    "Structure datasets, handle missing values, and standardize fields to improve reporting quality.": "تنظيم مجموعات البيانات، معالجة القيم الناقصة، وتوحيد الحقول لتحسين جودة التقارير.",
    "Skills": "المهارات",
    "Focused, job-relevant tools and methods.": "أدوات وأساليب عملية مرتبطة بسوق العمل.",
    "Projects demonstrating Data Analyst skills: data preparation, SQL analysis, KPI reporting, Tableau dashboards, Power BI dashboards, pivot-based summaries, and clear visuals. Each project is documented and reproducible.": "مشاريع تعرض مهارات تحليل البيانات: إعداد البيانات، تحليل SQL، تقارير مؤشرات الأداء، لوحات Tableau وPower BI، ملخصات محورية، ومرئيات واضحة. كل مشروع موثق وقابل للمراجعة.",
    "Tableau dashboard project comparing 2023 sales and customer performance against the previous year, with KPI cards, trend analysis, subcategory performance, customer distribution, and top-customer profit insights.": "مشروع لوحة Tableau يقارن أداء المبيعات والعملاء في 2023 بالسنة السابقة، مع بطاقات مؤشرات، تحليل الاتجاهات، أداء الفئات الفرعية، توزيع العملاء، ورؤى أفضل العملاء ربحية.",
    "Sales dashboard with total sales, profit, quantity, subcategory performance, and trend comparisons": "لوحة مبيعات تشمل إجمالي المبيعات والربح والكمية وأداء الفئات الفرعية ومقارنات الاتجاهات",
    "Customer dashboard with total customers, sales per customer, order volume, distribution, and top customers": "لوحة عملاء تشمل إجمالي العملاء والمبيعات لكل عميل وحجم الطلبات والتوزيع وأفضل العملاء",
    "Packaged Tableau workbook and dashboard PDF included for review and download": "تم تضمين ملف Tableau المجهز وملف PDF للوحة للمراجعة والتحميل",
    "Dashboard PDF": "PDF اللوحة",
    "Tableau Workbook": "ملف Tableau",
    "End-to-end business intelligence project analyzing pizza sales revenue, total orders, best/worst sellers, category performance, size performance, and daily/monthly trends.": "مشروع ذكاء أعمال متكامل يحلل إيرادات مبيعات البيتزا، إجمالي الطلبات، أفضل وأسوأ المنتجات، أداء الفئات والأحجام، والاتجاهات اليومية والشهرية.",
    "PDF export included": "يتضمن تصدير PDF",
    "Dashboard visuals are provided through the project PDF, not separate image exports.": "تتوفر مرئيات اللوحة من خلال ملف PDF الخاص بالمشروع.",
    "SQL KPI calculations for revenue, orders, quantity, and average order value": "حساب مؤشرات SQL للإيرادات والطلبات والكمية ومتوسط قيمة الطلب",
    "Power BI dashboard with product, category, size, daily, and monthly analysis": "لوحة Power BI لتحليل المنتجات والفئات والأحجام والاتجاهات اليومية والشهرية",
    "Business insights on high-performing and low-performing pizza items": "رؤى أعمال حول المنتجات الأعلى والأقل أداءً",
    "SQL Queries": "استعلامات SQL",
    "Workbook analyzing data-related roles, salary benchmarks, in-demand skills, and the relationship between skills requested and pay.": "مصنف يحلل وظائف البيانات، مقارنات الرواتب، المهارات المطلوبة، والعلاقة بين المهارات والأجر.",
    "Excel analytics workbook": "مصنف تحليلات Excel",
    "Documented on GitHub with workbook analysis, salary benchmarks, and skills-demand summaries.": "موثق على GitHub مع تحليل المصنف ومقارنات الرواتب وملخصات طلب المهارات.",
    "Skills demand analysis (job count by skill)": "تحليل طلب المهارات حسب عدد الوظائف",
    "Top skills: average salary vs demand (combo chart)": "أهم المهارات: متوسط الراتب مقابل الطلب",
    "Salary benchmarks across common data roles": "مقارنات الرواتب بين وظائف البيانات الشائعة",
    "Skills-per-job vs median salary analysis (scatter + trendline)": "تحليل المهارات لكل وظيفة مقابل متوسط الراتب",
    "View on GitHub": "عرض على GitHub",
    "Interactive dashboard with filters and KPIs to explore how salaries vary by role, location, and schedule type.": "لوحة تفاعلية بفلاتر ومؤشرات أداء لاستكشاف اختلاف الرواتب حسب الدور والموقع ونوع الدوام.",
    "Interactive Excel dashboard": "لوحة Excel تفاعلية",
    "Built for filtered salary comparison across role, country, and schedule type.": "مصممة لمقارنة الرواتب باستخدام فلاتر الدور والدولة ونوع الدوام.",
    "Dropdown filters (job title, country, schedule type)": "فلاتر منسدلة للمسمى الوظيفي والدولة ونوع الدوام",
    "KPIs (e.g., median salary, posting volume)": "مؤشرات أداء مثل متوسط الراتب وحجم الإعلانات",
    "Comparison charts with highlighted selections": "مخططات مقارنة مع إبراز الاختيارات",
    "Written for recruiters and graduate admissions—clear, factual, and outcomes-focused.": "مكتوبة للمسؤولين عن التوظيف والقبول الجامعي بأسلوب واضح وعملي ومركز على النتائج.",
    "Profile": "الملف الشخصي",
    "I am an MIS student based in Doha, Qatar, positioning myself as a Data Analyst. I focus on analytics projects that turn raw datasets into structured insights, KPIs, and dashboards that support decision-making.": "أنا طالب نظم معلومات إدارية في الدوحة، قطر، أعمل على بناء مساري كمحلل بيانات. أركز على مشاريع التحليل التي تحول البيانات الخام إلى رؤى منظمة ومؤشرات أداء ولوحات تدعم اتخاذ القرار.",
    "My strengths are Excel analytics (pivot-style summaries, dashboard design, and KPI reporting) and Python foundations for data analysis (Pandas/NumPy in Jupyter). I prioritize clarity, documentation, and accuracy.": "نقاط قوتي تشمل تحليلات Excel، تصميم اللوحات، تقارير مؤشرات الأداء، وأساسيات Python لتحليل البيانات باستخدام Pandas وNumPy. أضع الوضوح والتوثيق والدقة في الأولوية.",
    "Highlights": "أبرز النقاط",
    "Excel dashboards and pivot-based reporting": "لوحات Excel وتقارير مبنية على الجداول المحورية",
    "KPI definition, aggregation logic, and insight communication": "تعريف مؤشرات الأداء ومنطق التجميع وتوصيل الرؤى",
    "Python foundations for data analysis (Pandas/NumPy)": "أساسيات Python لتحليل البيانات",
    "Clear documentation and stakeholder-ready outputs": "توثيق واضح ومخرجات جاهزة للعرض",
    "Current focus": "التركيز الحالي",
    "Strengthening my analytics portfolio and preparing for data analyst opportunities.": "تعزيز ملف أعمالي التحليلي والاستعداد لفرص محلل البيانات.",
    "Excel": "Excel",
    "Dashboards, pivot summaries, KPI reporting, and clean visual storytelling.": "لوحات معلومات، ملخصات محورية، تقارير مؤشرات الأداء، وسرد بصري واضح.",
    "Python": "Python",
    "Foundations in data analysis and automation with Pandas/NumPy.": "أساسيات تحليل البيانات والأتمتة باستخدام Pandas وNumPy.",
    "Communication": "التواصل",
    "Clear documentation and concise explanations for non-technical audiences.": "توثيق واضح وشروحات مختصرة للجمهور غير التقني.",
    "View the resume below. If your browser does not display embedded PDFs, use the button to open it in a new tab.": "يمكنك عرض السيرة الذاتية أدناه. إذا لم يعرض المتصفح ملف PDF المضمن، استخدم الزر لفتحه في تبويب جديد.",
    "Open PDF in New Tab": "فتح PDF في تبويب جديد",
    "If the embed is not working on mobile, tap “Open PDF in New Tab”.": "إذا لم يعمل التضمين على الهاتف، اضغط فتح PDF في تبويب جديد.",
    "For internships, collaborations, or project discussions.": "للتدريب، التعاون، أو مناقشة المشاريع.",
    "Email": "البريد الإلكتروني",
    "Preferred contact method.": "طريقة التواصل المفضلة.",
    "Phone": "الهاتف",
    "Optional.": "اختياري.",
    "Location": "الموقع",
    "Doha, Qatar • Open to global opportunities and remote collaboration.": "الدوحة، قطر • منفتح على الفرص العالمية والتعاون عن بعد.",
    "Tableau • Sales Analytics • Customer Analytics • KPI Reporting": "Tableau • تحليل المبيعات • تحليل العملاء • تقارير مؤشرات الأداء",
    "A Tableau business intelligence project analyzing 2023 sales and customer performance against the previous year, with KPI summaries, subcategory performance, trend views, customer distribution, and top-customer profit insights.": "مشروع ذكاء أعمال في Tableau يحلل أداء مبيعات وعملاء 2023 مقارنة بالسنة السابقة، مع ملخصات مؤشرات الأداء، أداء الفئات الفرعية، اتجاهات الأداء، توزيع العملاء، ورؤى أفضل العملاء ربحية.",
    "Download Tableau Workbook": "تحميل ملف Tableau",
    "Dashboard Views": "عروض اللوحة",
    "Business Intelligence": "ذكاء الأعمال",
    "Tableau Workbook": "ملف Tableau",
    "Sales Reporting": "تقارير المبيعات",
    "Customer Insights": "رؤى العملاء",
    "2023 KPI Snapshot": "ملخص مؤشرات 2023",
    "Main dashboard measures comparing 2023 performance against the previous year.": "أهم مقاييس اللوحة لمقارنة أداء 2023 بالسنة السابقة.",
    "Total Sales": "إجمالي المبيعات",
    "Total Profit": "إجمالي الربح",
    "Total Quantity": "إجمالي الكمية",
    "Total Customers": "إجمالي العملاء",
    "Sales Per Customer": "المبيعات لكل عميل",
    "Total Orders": "إجمالي الطلبات",
    "15.01% above previous year": "أعلى من السنة السابقة بنسبة 15.01%",
    "30.30% above previous year": "أعلى من السنة السابقة بنسبة 30.30%",
    "26.83% above previous year": "أعلى من السنة السابقة بنسبة 26.83%",
    "8.62% above previous year": "أعلى من السنة السابقة بنسبة 8.62%",
    "5.88% above previous year": "أعلى من السنة السابقة بنسبة 5.88%",
    "28.29% above previous year": "أعلى من السنة السابقة بنسبة 28.29%",
    "The workbook includes dedicated views for sales performance and customer performance.": "يتضمن المصنف عروضاً مخصصة لأداء المبيعات وأداء العملاء.",
    "Sales Dashboard: sales, profit, quantity, subcategory performance, and trend comparison.": "لوحة المبيعات: المبيعات والربح والكمية وأداء الفئات الفرعية ومقارنة الاتجاهات.",
    "Customer Dashboard: total customers, sales per customer, orders, distribution, and top customers.": "لوحة العملاء: إجمالي العملاء والمبيعات لكل عميل والطلبات والتوزيع وأفضل العملاء.",
    "Analysis Coverage": "نطاق التحليل",
    "Sales, profit, and quantity KPI tracking with current-year versus previous-year comparison.": "تتبع مؤشرات المبيعات والربح والكمية مع مقارنة السنة الحالية بالسنة السابقة.",
    "Subcategory-level sales and profit analysis to identify stronger and weaker product areas.": "تحليل المبيعات والربح على مستوى الفئات الفرعية لتحديد المجالات الأقوى والأضعف.",
    "Sales and profit trend views highlighting above-average and below-average periods.": "عروض اتجاهات المبيعات والربح مع إبراز الفترات أعلى وأقل من المتوسط.",
    "Customer distribution by number of orders and top customers ranked by profit.": "توزيع العملاء حسب عدد الطلبات وترتيب أفضل العملاء حسب الربح.",
    "Workbook Details": "تفاصيل المصنف",
    "Built in Tableau with two dashboard tabs: Sales Dashboard and Customer Dashboard.": "تم بناؤه في Tableau مع تبويبين: لوحة المبيعات ولوحة العملاء.",
    "Packaged workbook includes a Hyper extract and source tables for orders, customers, products, and location.": "يتضمن المصنف المجهز مستخرج Hyper وجداول مصدرية للطلبات والعملاء والمنتجات والموقع.",
    "Uses a year selection parameter set to 2023 for current-year KPI comparisons.": "يستخدم محدد سنة مضبوطاً على 2023 لمقارنة مؤشرات السنة الحالية.",
    "Includes dashboard navigation and filter controls for category, subcategory, region, state, and city.": "يتضمن تنقلاً داخل اللوحة وفلاتر للفئة والفئة الفرعية والمنطقة والولاية والمدينة.",
    "Dashboard PDF Preview": "معاينة PDF للوحة",
    "Embedded from the provided Tableau dashboard PDF export.": "مضمنة من ملف PDF المصدر من لوحة Tableau.",
    "Open Dashboard PDF": "فتح PDF اللوحة",
    "Business Value": "القيمة العملية",
    "Supports sales performance monitoring through clear KPI comparison against the previous year.": "يدعم متابعة أداء المبيعات عبر مقارنة واضحة لمؤشرات الأداء بالسنة السابقة.",
    "Helps identify product subcategories that drive sales and profit outcomes.": "يساعد على تحديد الفئات الفرعية التي تدفع المبيعات والربح.",
    "Highlights customer concentration and ordering patterns for better follow-up and retention decisions.": "يبرز تركيز العملاء وأنماط الطلب لدعم قرارات المتابعة والاحتفاظ.",
    "Files Included": "الملفات المضمنة",
    "Dashboard PDF export (.pdf)": "تصدير PDF للوحة (.pdf)",
    "Packaged Tableau workbook (.twbx)": "مصنف Tableau مجهز (.twbx)",
    "Sales dashboard screenshot (.png)": "لقطة شاشة للوحة المبيعات (.png)",
    "Customer dashboard screenshot (.png)": "لقطة شاشة للوحة العملاء (.png)",
    "Back to projects": "العودة إلى المشاريع",
    "Power BI • SQL Server • DAX • Power Query": "Power BI • SQL Server • DAX • Power Query",
    "Pizza Sales Analysis Dashboard": "لوحة تحليل مبيعات البيتزا",
    "An end-to-end business intelligence project analyzing pizza sales transactions to identify revenue performance, ordering patterns, product demand, category contribution, and underperforming items.": "مشروع ذكاء أعمال متكامل يحلل معاملات مبيعات البيتزا لتحديد أداء الإيرادات وأنماط الطلب وطلب المنتجات ومساهمة الفئات والعناصر الأقل أداءً.",
    "Download Power BI Template": "تحميل قالب Power BI",
    "View SQL Queries": "عرض استعلامات SQL",
    "Download Dataset": "تحميل البيانات",
    "Sales Analytics": "تحليل المبيعات",
    "Dashboard Design": "تصميم اللوحات",
    "Data Storytelling": "سرد البيانات",
    "Dashboard PDF Export": "تصدير PDF للوحة",
    "The visual report is included as a two-page PDF export from Power BI. No separate dashboard image exports are used on this page.": "التقرير المرئي مرفق كملف PDF من صفحتين من Power BI، ولا توجد صور منفصلة للوحة في هذه الصفحة.",
    "Page 1": "الصفحة 1",
    "KPIs, daily/monthly trends, category and size performance": "مؤشرات الأداء والاتجاهات اليومية والشهرية وأداء الفئات والأحجام",
    "Page 2": "الصفحة 2",
    "Best sellers and worst sellers by revenue, quantity, and orders": "أفضل وأسوأ المنتجات حسب الإيرادات والكمية والطلبات",
    "Open PDF": "فتح PDF",
    "Executive KPI Summary": "ملخص مؤشرات الأداء التنفيذية",
    "Core measures calculated using SQL and modeled visually in Power BI.": "مقاييس أساسية محسوبة باستخدام SQL وممثلة بصرياً في Power BI.",
    "Total Revenue": "إجمالي الإيرادات",
    "Pizzas Sold": "عدد البيتزا المباعة",
    "Average Order Value": "متوسط قيمة الطلب",
    "Avg. Pizzas Per Order": "متوسط البيتزا لكل طلب",
    "Daily Order Trend": "اتجاه الطلبات اليومي",
    "Friday generated the highest total orders, followed by Thursday and Saturday.": "حقق يوم الجمعة أعلى إجمالي طلبات، يليه الخميس والسبت.",
    "Monthly Order Trend": "اتجاه الطلبات الشهري",
    "July and January are the strongest months by order volume.": "يوليو ويناير هما الأقوى من حيث حجم الطلبات.",
    "Sales by Category": "المبيعات حسب الفئة",
    "Classic contributes the highest revenue and the highest quantity sold.": "تساهم فئة Classic بأعلى إيرادات وأعلى كمية مباعة.",
    "Sales by Size": "المبيعات حسب الحجم",
    "Large pizzas dominate revenue contribution.": "تهيمن البيتزا الكبيرة على مساهمة الإيرادات.",
    "Best and Worst Sellers": "الأفضل والأسوأ مبيعاً",
    "Product-level ranking by revenue, quantity, and total orders.": "ترتيب المنتجات حسب الإيرادات والكمية وإجمالي الطلبات.",
    "Embedded directly from the Power BI PDF export. Open the PDF for the full two-page report.": "مضمن مباشرة من تصدير Power BI PDF. افتح الملف لعرض التقرير الكامل من صفحتين.",
    "Supports menu and promotion decisions by identifying revenue leaders and low-performing products.": "يدعم قرارات القائمة والعروض عبر تحديد المنتجات الأعلى إيراداً والأقل أداءً.",
    "Improves staffing and inventory planning by showing peak order days and high-demand months.": "يحسن تخطيط الموظفين والمخزون عبر توضيح أيام الذروة والأشهر الأعلى طلباً.",
    "Connects SQL analysis with Power BI visuals to create a repeatable reporting workflow.": "يربط تحليل SQL بمرئيات Power BI لإنشاء سير عمل تقارير قابل للتكرار.",
    "Power BI template file (.pbit)": "قالب Power BI (.pbit)",
    "SQL query file (.sql)": "ملف استعلام SQL (.sql)",
    "Original SQL documentation (.docx)": "توثيق SQL الأصلي (.docx)",
    "Pizza sales dataset (.csv)": "بيانات مبيعات البيتزا (.csv)"
  };

  const titleTranslations = {
    "Othman Alabed | Data Analyst Portfolio": "عثمان العابد | ملف أعمال محلل بيانات",
    "Projects | Othman Alabed": "المشاريع | عثمان العابد",
    "About | Othman Alabed": "نبذة | عثمان العابد",
    "Resume | Othman Alabed": "السيرة الذاتية | عثمان العابد",
    "Contact | Othman Alabed": "تواصل | عثمان العابد",
    "Tableau Sales & Customer Dashboard | Othman Alabed": "لوحة مبيعات وعملاء Tableau | عثمان العابد",
    "Power BI & SQL Pizza Sales Analysis | Othman Alabed": "تحليل مبيعات البيتزا باستخدام Power BI وSQL | عثمان العابد"
  };

  const normalize = (value) => value
    .replace(/â€¢/g, "•")
    .replace(/â€”/g, "—")
    .replace(/â€œ|â€/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
  const walkTextNodes = (node, callback) => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode(textNode) {
        if (!normalize(textNode.nodeValue || "")) return NodeFilter.FILTER_REJECT;
        if (textNode.parentElement && textNode.parentElement.closest("script, style, iframe")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(callback);
  };

  const applyLanguage = (lang) => {
    const isArabic = lang === "ar";
    root.lang = isArabic ? "ar" : "en";
    root.dir = isArabic ? "rtl" : "ltr";
    root.setAttribute("data-language", lang);
    document.title = isArabic ? (titleTranslations[originalTitle] || originalTitle) : originalTitle;

    walkTextNodes(document.body, (node) => {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      if (!isArabic) {
        node.nodeValue = originalText.get(node);
        return;
      }

      const original = originalText.get(node);
      const key = normalize(original);
      if (!ar[key]) return;
      const leading = (original.match(/^\s*/) || [""])[0];
      const trailing = (original.match(/\s*$/) || [""])[0];
      node.nodeValue = leading + ar[key] + trailing;
    });

    updateThemeLabel();
    updateLanguageLabel();
  };

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  const updateThemeLabel = () => {
    if (!themeToggle) return;
    const isLight = root.getAttribute("data-theme") === "light";
    const isArabic = root.lang === "ar";
    themeToggle.textContent = isArabic ? (isLight ? "داكن" : "فاتح") : (isLight ? "Dark" : "Light");
    themeToggle.setAttribute("aria-label", isArabic ? (isLight ? "التبديل إلى الوضع الداكن" : "التبديل إلى الوضع الفاتح") : (isLight ? "Switch to dark theme" : "Switch to light theme"));
  };

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      updateThemeLabel();
    });
  }

  let languageToggle = null;
  const updateLanguageLabel = () => {
    if (!languageToggle) return;
    const isArabic = root.lang === "ar";
    languageToggle.textContent = isArabic ? "English" : "العربية";
    languageToggle.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
  };

  if (themeToggle && themeToggle.parentElement) {
    languageToggle = document.createElement("button");
    languageToggle.className = "language-toggle";
    languageToggle.type = "button";
    themeToggle.insertAdjacentElement("afterend", languageToggle);
    languageToggle.addEventListener("click", () => {
      const next = root.lang === "ar" ? "en" : "ar";
      localStorage.setItem("language", next);
      applyLanguage(next);
    });
  }

  if (year) year.textContent = new Date().getFullYear();

  const progressEl = document.getElementById("scrollProgress");
  const updateProgress = () => {
    if (!progressEl) return;
    const page = document.documentElement;
    const distance = page.scrollHeight - page.clientHeight || 1;
    const progress = ((page.scrollTop || document.body.scrollTop) / distance) * 100;
    progressEl.style.width = progress.toFixed(2) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  const revealNodes = document.querySelectorAll([
    ".page-head",
    ".section-head",
    ".card",
    ".mini-item",
    ".hero h1",
    ".hero .lead",
    ".hero .cta",
    ".pills li",
    ".bar-row",
    ".tableau-metric-card"
  ].join(","));

  revealNodes.forEach((node, index) => {
    node.classList.add("reveal");
    node.style.setProperty("--reveal-delay", Math.min(index % 8, 7) * 55 + "ms");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });

    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("in"));
  }

  const initPointerEffects = () => {
    if (reduceMotion) return;
    const interactive = document.querySelectorAll(".card, .btn, .mini-item, .chip");
    interactive.forEach((el) => {
      el.addEventListener("pointermove", (event) => {
        const rect = el.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--px", x.toFixed(2) + "%");
        el.style.setProperty("--py", y.toFixed(2) + "%");
      });
      el.addEventListener("pointerleave", () => {
        el.style.removeProperty("--px");
        el.style.removeProperty("--py");
      });
    });
  };

  const initAuroraCanvas = () => {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const state = { width: 0, height: 0, dpr: 1, time: 0, pointerX: 0.5, pointerY: 0.25 };
    const resize = () => {
      state.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = state.width + "px";
      canvas.style.height = state.height + "px";
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    const pointer = (event) => {
      state.pointerX = event.clientX / Math.max(1, state.width);
      state.pointerY = event.clientY / Math.max(1, state.height);
    };

    const drawWave = (offset, color, amplitude, speed, thickness) => {
      const gradient = ctx.createLinearGradient(0, 0, state.width, state.height);
      gradient.addColorStop(0, "rgba(57,214,201,0)");
      gradient.addColorStop(0.34, color);
      gradient.addColorStop(0.72, "rgba(242,184,75,0.18)");
      gradient.addColorStop(1, "rgba(152,223,107,0)");

      ctx.beginPath();
      for (let x = -40; x <= state.width + 40; x += 16) {
        const progress = x / Math.max(1, state.width);
        const y = state.height * (0.18 + offset)
          + Math.sin(progress * Math.PI * 2.2 + state.time * speed) * amplitude
          + Math.sin(progress * Math.PI * 5.6 - state.time * (speed * 0.7)) * (amplitude * 0.38)
          + (state.pointerY - 0.5) * 40;
        if (x === -40) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = thickness;
      ctx.shadowColor = color;
      ctx.shadowBlur = 28;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      state.time += 0.009;
      ctx.clearRect(0, 0, state.width, state.height);
      ctx.globalCompositeOperation = "lighter";

      const glow = ctx.createRadialGradient(
        state.width * state.pointerX,
        state.height * state.pointerY,
        10,
        state.width * state.pointerX,
        state.height * state.pointerY,
        Math.max(state.width, state.height) * 0.72
      );
      glow.addColorStop(0, "rgba(57,214,201,0.20)");
      glow.addColorStop(0.5, "rgba(242,184,75,0.08)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, state.width, state.height);

      drawWave(0.04, "rgba(57,214,201,0.24)", 48, 1.1, 34);
      drawWave(0.23, "rgba(242,184,75,0.17)", 36, -0.9, 24);
      drawWave(0.42, "rgba(152,223,107,0.12)", 28, 0.7, 18);

      ctx.globalCompositeOperation = "source-over";
      window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", pointer, { passive: true });
  };

  initPointerEffects();
  initAuroraCanvas();
  applyLanguage(localStorage.getItem("language") === "ar" ? "ar" : "en");
})();
