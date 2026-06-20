تشغيل المشروع عبر Docker (سهل ومباشر)

هذا الملف يشرح كيفية تشغيل المشروع محليًا باستخدام Docker و docker-compose.

المتطلبات:
- Docker مثبت
- docker-compose مثبت

الأوامر لتشغيل المشروع:
1) من جذر المستودع شغل:
   docker-compose up --build

2) عند اكتمال البناء:
   - الواجهة الخلفية (Laravel) ستكون متاحة على: http://localhost:8000
   - الواجهة الأمامية (Vite) ستكون متاحة على: http://localhost:5173
   - قاعدة البيانات PostgreSQL متاحة على المنفذ 5432

ملاحظات مهمة:
- ملف .env.example موجود في backend/laravel/.env.example. يمكنك نسخه إلى backend/laravel/.env وتعديل القيم إن رغبت، لكن إعدادات Docker الافتراضية تعمل مع الإعدادات التالية:
  DB_HOST=db
  DB_PORT=5432
  DB_DATABASE=massjed_db
  DB_USERNAME=postgres
  DB_PASSWORD=password

- بعد تشغيل الحاويات، شغّل مهاجرات Laravel وseeders داخل الحاوية backend:
  docker-compose exec backend php artisan key:generate
  docker-compose exec backend php artisan migrate --seed

- إنشاء مستخدم admin تجريبي (داخل الحاوية backend):
  docker-compose exec backend php artisan tinker
  ثم داخل tinker:
    use App\\Models\\User; use Illuminate\\Support\\Facades\\Hash;
    User::create(['username'=>'admin','password'=>Hash::make('secret123'),'role'=>'admin','full_name'=>'المدير']);
    exit;

- إذا واجهت مشاكل في أذونات الملفات، تأكد أن المجلدات storage و bootstrap/cache قابلة للكتابة للحاوية.

هل تريد أن أُنشئ أيضًا Workflow (GitHub Actions) لنشر الحاويات تلقائيًا أو رفع الصور إلى Docker Hub؟ أستطيع إضافته إذا رغبت.
