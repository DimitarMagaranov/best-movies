import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/user';

@Pipe({ name: 'listFilterForUsers'})
export class ListFilterPipeForUsers implements PipeTransform {

    transform(list: IUser[], filterText: string): any {
        return list ? list.filter(item => item.username.search(new RegExp(filterText, 'i')) > -1) : [];
    }
}