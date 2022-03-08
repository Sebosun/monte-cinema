export default function getGenres(movies) {
  const genres = movies.reduce((uniqueGenres, currentMovie) => {
    //checks if value already exists within uniqueGenres arr
    const isUnique = !uniqueGenres.some((genre) => {
      return (
        genre.name === currentMovie.genre.name &&
        genre.id === currentMovie.genre.id
      );
    });
    //if it does not exist, add the genre
    if (isUnique) {
      uniqueGenres.push({
        id: currentMovie.genre.id,
        name: currentMovie.genre.name,
      });
    }
    return uniqueGenres;
  }, []);

  return genres;
}
