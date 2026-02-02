
import { faBox, faCartPlus, faFolderPlus, faLayerGroup, faPlus, faTachometerAlt, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';


export const links = [
    {
        name: 'dashboard',
       
        icon: faTachometerAlt,
        path: '',
        role: '1995'
    },
    {
        label: "Management",
         labelKey: "management",
        items: [
            {
                name: "Users",
                nameKey: "users",
                icon: faUsers,
                path: "users",
                role: '1995'


            },

            {
                name: "Categories",
                nameKey: "categories",
                icon: faLayerGroup,
                path: "/dashboard/categories",
                role: ['1995', '1999']


            },

            {
                name: "Products",
                nameKey:'products',
                icon: faBox,
                path: "/dashboard/products",
                role: ['1995', '1999']


            },
        ]
    },


    {
        label: 'Quick Actions',
         labelKey: "quickActions",
        items: [
            {
                name: "Add user",
                 nameKey:'addUser',
                icon: faUserPlus,
                path: "/dashboard/user/add",
                role: '1995'


            },
            {
                name: "Add Category",
                 nameKey:'addCategory',
                icon: faFolderPlus,
                path: "/dashboard/category/add",
                role: ['1995', '1999']


            },
            {
                name: "Add Product",
                 nameKey:'addProduct',
                icon: faCartPlus,
                path: "/dashboard/product/add",
                role: ['1995', '1999']


            },
        ]
    }


]