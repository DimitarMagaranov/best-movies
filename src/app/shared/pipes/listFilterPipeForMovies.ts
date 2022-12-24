import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from '../interfaces/movie';

@Pipe({ name: 'listFilterForMovies'})
export class ListFilterPipeForMovies implements PipeTransform {

    transform(list: IMovie[], filterText: string): any {
        return list ? list.filter(item => item.title.search(new RegExp(filterText, 'i')) > -1) : [];
    }
}