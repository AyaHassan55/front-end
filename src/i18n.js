import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "dashboard": "Dashboard",
                    "management": "Management",
                    "users": "Users",
                    "categories": "Categories",
                    "products": "Products",
                    "quickActions": "Quick Actions",
                    "addUser": "Add User",
                    "addCategory": "Add Category",
                    "addProduct": "Add Product",
                    "footerText": "© 2025 Admin Dashboard. All rights reserved."
                }
            },
            ar: {
                translation: {
                    "dashboard": "لوحة التحكم",
                    "management": "الإدارة",
                    "users": "المستخدمون",
                    "categories": "الفئات",
                    "products": "المنتجات",
                    "quickActions": "إجراءات سريعة",
                    "addUser": "إضافة مستخدم",
                    "addCategory": "إضافة فئة",
                    "addProduct": "إضافة منتج",
                    "footerText": "© 2025 لوحة تحكم المدير. كل الحقوق محفوظة."
                }
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
