
import { faBox, faCartPlus, faFolderPlus, faLayerGroup, faPlus, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

export const links =[
    {
        name:"Users",
        icon:faUsers,
        path:"users",
        role:'1995'
       

    },
    {
        name:"Add user",
        icon:faUserPlus,
        path:"/dashboard/user/add",
         role:'1995'
        

    },
    {
        name:"Categories",
        icon:faLayerGroup,
        path:"/dashboard/categories",
        role:['1995','1999']
        

    },
    {
        name:"Add Category",
        icon:faFolderPlus,
        path:"/dashboard/category/add",
        role:['1995','1999']
        

    },
        {
        name:"Products",
        icon:faBox,
        path:"/dashboard/products",
        role:['1995','1999']
        

    },
    {
        name:"Add Product",
        icon:faCartPlus,
        path:"/dashboard/product/add",
        role:['1995','1999']
        

    },
    {
        name:"Writer",
        icon:faPlus,
        path:"/dashboard/writer",
        role:[ '1995','1996']
       
    }

]