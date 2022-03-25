export interface Movie {
  id: number;
  title: string;
  genre: {
    id: number;
    name: string;
  };
  poster_url: string;
  length: number;
  release_date: string;
  description: string;
}

export interface ScreeningTypes {
  id: number;
  datetime: string;
  movie: number;
  hall: number;
}

export interface MovieWithScreenings extends Movie {
  screenings: ScreeningTypes[];
}
