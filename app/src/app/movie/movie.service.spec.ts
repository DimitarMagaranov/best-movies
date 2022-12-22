import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { MovieService } from './movie.service';
import { environment } from 'src/environments/environment';


describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a single movie result', () => {
    service.loadMovieById('639e25ecfa4ae70b9cf16dee').subscribe(result => {
      expect(result).toBeTruthy();
      // expect(result._id).toEqual('639e25ecfa4ae70b9cf16dee');
      // expect(result.title).toEqual('The Godfather: Part II');
      console.log('result verified');
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/movies/639e25ecfa4ae70b9cf16dee`);
    expect(req.request.method).toBe('GET');
    req.flush({
      _id: '639e25ecfa4ae70b9cf16dee',
      title: 'The Godfather: Part II'
    });
  })
});
