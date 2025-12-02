
import { faBox, faCartPlus, faFolderPlus, faLayerGroup, faPlus, faTachometerAlt, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';


export const links = [
    {
        name: 'Dashboard',
        icon: faTachometerAlt,
        path: '',
        role: '1995'
    },
    {
        label: "Management",
        items: [
            {
                name: "Users",
                icon: faUsers,
                path: "users",
                role: '1995'


            },

            {
                name: "Categories",
                icon: faLayerGroup,
                path: "/dashboard/categories",
                role: ['1995', '1999']


            },

            {
                name: "Products",
                icon: faBox,
                path: "/dashboard/products",
                role: ['1995', '1999']


            },
        ]
    },


    {
        label: 'Quick Actions',
        items: [
            {
                name: "Add user",
                icon: faUserPlus,
                path: "/dashboard/user/add",
                role: '1995'


            },
            {
                name: "Add Category",
                icon: faFolderPlus,
                path: "/dashboard/category/add",
                role: ['1995', '1999']


            },
            {
                name: "Add Product",
                icon: faCartPlus,
                path: "/dashboard/product/add",
                role: ['1995', '1999']


            },
        ]
    }


]