import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          dashboard: "Dashboard",
          products: "Products",
          orders: "Orders",
          addProduct: "Add Product"
        }
      },
      ar: {
        translation: {
          dashboard: "لوحة التحكم",
          products: "المنتجات",
          orders: "الطلبات",
          addProduct: "إضافة منتج"
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
