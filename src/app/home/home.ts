import { Component, ChangeDetectorRef } from '@angular/core';
import { Header } from "../header/header";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRating } from "../feature/star-rating/star-rating";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, CommonModule, NgbRatingModule, StarRating],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {
    
  }

  trendingMovies: any;
  theatreMovies: any;
  popularMovies: any;

  ngOnInit() {
    this.getTrendingMovies();
    this.getTheatreMovies();
    this.getPopularMovies();
  }

  getPopularMovies() {
    this.http.get('/assets/data/popular-movies.json').subscribe({
      next: (movies) => {
        this.popularMovies = movies;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading popular movies:', error);
      }
    });
  }

  getTheatreMovies() {
    this.http.get('/assets/data/theatre-movies.json').subscribe({
      next: (movies) => {
        this.theatreMovies = movies;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading theatre movies:', error);
      }
    });
  }

  getTrendingMovies() {
    this.http.get('/assets/data/trending-movies.json').subscribe({
      next: (movies) => {
        this.trendingMovies = movies;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading trending movies:', error);
      }
    });
  }

  goToMovie(type: string, id: string) {
    this.router.navigate(['movie', type, id]);
  }
}