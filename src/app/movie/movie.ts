import { Component, ChangeDetectorRef } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StarRating } from '../feature/star-rating/star-rating';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie',
  imports: [Header, StarRating, NgbModalModule, CommonModule],
  templateUrl: './movie.html',
  styleUrl: './movie.scss',
})
export class Movie {
  type = '';
  id = '';
  url = '';
  movies: any;
  movie: any;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    this.setUrl();
    this.getMovie();
  }

  setUrl() {
    if (this.type === 'trending') {
      this.url = 'assets/data/trending-movies.json';
    }
    if (this.type === 'theatre') {
      this.url = 'assets/data/theatre-movies.json';
    }
    if (this.type === 'popular') {
      this.url = 'assets/data/popular-movies.json';
    }
  }

  getMovie() {
    this.http.get(this.url).subscribe((movies) => {
      this.movies = movies;
      let index = this.movies.findIndex((movie: { id: string }) => movie.id == this.id);
      if (index > -1) {
        this.movie = this.movies[index];
        this.cdr.detectChanges();
      }
    });
  }
}