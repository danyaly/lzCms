import { GroupComponent } from './group/group';
import { UserComponent } from './user/user';
import { MenuComponent } from './menu/menu';

export let SystemRouting = [
    {
        /*角色管理*/
        path : 'group',
        component : GroupComponent
    },
    {
        /*用户管理*/
        path : 'user',
        component : UserComponent
    },
    {
        /*菜单管理*/
        path : 'menu',
        component : MenuComponent
    }
];