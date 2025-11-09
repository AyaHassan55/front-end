
import { faLayerGroup, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

export const links =[
    {
        name:"Users",
        icon:faUsers,
        path:"users",
        role:'1995'
       

    },
    {
        name:"Add user",
        icon:faPlus,
        path:"/dashboard/user/add",
         role:'1995'
        

    },
    {
        name:"Categories",
        icon:faLayerGroup,
        path:"/dashboard/products",
        role:['1995','1999']
        

    },
    {
        name:"Writer",
        icon:faPlus,
        path:"/dashboard/writer",
        role:[ '1995','1996']
       
    }

]