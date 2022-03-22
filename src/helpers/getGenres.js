export default function getGenres(movies) {
  const genres = movies.reduce((uniqueGenres, currentMovie) => {
    //checks if value already exists within uniqueGenres arr
    const isUnique = !uniqueGenres.some((oneUniqueGenre) => {
      return (
        oneUniqueGenre.name === currentMovie.genre.name &&
        oneUniqueGenre.id === currentMovie.genre.id
      );
    });

    //if it does not exist, add the genre
    if (isUnique) {
      const genreObj = {
        id: currentMovie.genre.id,
        name: currentMovie.genre.name,
      };

      uniqueGenres.push(genreObj);
    }
    return uniqueGenres;
  }, []);

  return genres;
}
