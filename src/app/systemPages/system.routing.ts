import { GroupComponent } from './group/group';
import { UserComponent } from './user/user';

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
    }
];