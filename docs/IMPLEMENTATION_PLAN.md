# خطة التنفيذ والاختيارات التقنية — مشروع "تسميعات الطلاب" 

قمت باختيار المسار العملي الأنسب لتنفيذ المشروع بناءً على متطلباتك (لا تسجيل صوتي، ثلاث أدوار: مدير/معلم/طالب، المعلم يدير كل الطلاب، الطلاب بلا كلمات مرور). التوصية المُطبَّقة هنا: بناء backend بــLaravel + PostgreSQL، وواجهة أمامية خفيفة بــVue.js (RTL) + TailwindCSS. السبب: Laravel يوفّر CRUD، Authentication، ومهاجرات بسرعة، ويُسرّع تطوير MVP.

ما أضفته الآن إلى المستودع
- ملف SQL أساسي: database/schema.sql — يحتوي على جداول النظام (users للـadmin/teacher فقط، teachers, students, surahs, juz_pages, years, recitations). (تمّت إضافته بالفعل.)
- أضفت هذا الملف: docs/IMPLEMENTATION_PLAN.md — يشرح الخطوات التالية والتعليمات لتشغيل المشروع محليًا ونشره.

الخطوات الموصى بها التالية (الأولوية للأردة):
1) تعبئة بيانات المراجع (seed):
   - إدراج أسماء السور (114 سورة) في جدول surahs.
   - إدراج خريطة juz_pages (الصفحات المرتبطة بكل جزء). هذه خطوة مفيدة لواجهات إدخال التسميع.
2) إعداد مشروع Laravel:
   - إنشاؤه محليًا: composer create-project laravel/laravel massjed
   - إعداد اتصال PostgreSQL في .env
   - إنشاء مهاجرات (migrations) بناءً على database/schema.sql أو تحويل schema.sql إلى ملفات migration باستخدام artisan
   - تشغيل: php artisan migrate
3) إنشاء نماذج ونسب العلاقات (Eloquent models): User (role: admin|teacher), Teacher, Student, Surah, JuzPage, Year, Recitation.
4) Authentication وAuthorization:
   - استخدام Laravel Breeze أو Laravel Jetstream (بـ API + Sanctum) لتأمين جلسات admin/teacher.
   - سيحظر الوصول لواجهات الـ CRUD حسب الدور.
5) واجهات API الأساسية (REST):
   - /api/login (admin/teacher)
   - /api/teachers (GET/POST/PUT/DELETE)
   - /api/students (GET/POST/PUT/DELETE)
   - /api/years (GET/POST/PUT) + /api/years/{id}/activate
   - /api/students/{id}/recitations (GET)
   - /api/recitations (POST/PUT/DELETE)
6) واجهة الإدارة (Front-end):
   - لوحة المدير: إدارة المعلمين والطلاب والسنة الدراسية النشطة.
   - لوحة المعلم: إدارة كل الطلاب وإدخال/تعديل تسميعاتهم.
   - لوحة الطالب: عرض بياناته والتسميعات فقط (بدون تسجيل دخول أو كلمة مرور).
   - استخدم Vue.js + TailwindCSS (RTL)، أو يمكنك استعمال Blade + Inertia إذا تفضّل المشروع أحادي المصدر مع Laravel.
7) منطق الألوان والسنة:
   - لا نخزن اللون؛ العرض يحدد اللون حسب السنة النشطة في جدول years.
   - عند تفعيل سنة جديدة، تُعامل سجلات السنوات السابقة كـ"قديمة" (الأصفر) وسجلات السنة النشطة تُعرض بالأخضر.
8) اختبارات وقاعدة بيانات تجريبية:
   - إعداد seeders لملء عدد تجريبي من الطلاب والمعلمين وسنة نشطة وبعض سجلات recitations للاختبار.
9) نشر/استضافة:
   - Dockerfile بسيط، أو استضافة على DigitalOcean/Render/Railway.

أوامر سريعة للتنفيذ المحلي (باستخدام schema.sql مباشرة)
- إنشاء قاعدة بيانات PostgreSQL (مثال):
  createdb massjed_db
  psql -d massjed_db -f database/schema.sql
- إعداد Laravel: قم بتحديث .env لربط DB، ثم php artisan migrate (إذا استخدمت مهاجرات Laravel بدلاً من schema.sql مباشرة).

ماذا أبدأ الآن فعليًا؟ — اقترحتي التالي وأقوم به فورًا إذا وافقت:
A) توليد مهاجرات Laravel (migrations) وملف seeders أساسي: يحوّل schema.sql إلى ملفات migration وSeeder لسور وخرائط juz_pages. هذا يسمح بالبدء فورًا بتشغيل php artisan migrate --seed.
B) إنشاء scaffold API بسيط (Controllers + Routes) للـUsers/Students/Recitations مع نموذج auth باستخدام Laravel Sanctum.
C) توليد ملف seed (CSV/SQL) يحتوى على سور القرآن وبارت-صفحات (لو أردت أن أملأها بدقة).

أين أضع العمل؟
- أستطيع رفع المهاجرات والملفات مباشرة إلى المستودع shadiantoz171-source/massjed-al-ghufrann (لدي إذن للكتابة لهذا المستودع الآن). أو أرسلك الملفات لتستضيفها محليًا.

الخطوة المقترحة مني الآن (سأطبقها تلقائيًا إذا لم تعارضني):
- أبدأ بـ(A): توليد مهاجرات Laravel + Seeder أساسي لتحويل schema.sql إلى مهاجرات قابلة للتشغيل؛ وأرفعها إلى مسار backend/laravel/migrations و backend/laravel/seeders في المستودع.

أم تريد أن أبدأ بخيار آخر (B أو C)؟

ملاحظة: بما أن الطلاب لا يملكون حسابات دخول، لن أنشئ user accounts لهم إلا إذا رغبت لاحقًا. المعلم يتمثل في users مع role='teacher' وكلمة مرور يعينها المدير أو تُنشأ مبدئياً ويتم تغييرها لاحقًا.
