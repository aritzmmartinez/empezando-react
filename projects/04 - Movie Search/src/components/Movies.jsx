export function ListOfMovies ({movies}) {
    return (
        <ul className="movies">
        {
            movies.map(movie => (
                <li className="movie" key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.year}</p>
                </li>
            ))
        }
    </ul>
    )
}

export function NoMovies () {
    return (
        <p>No movies found</p>
    )
}

export function Movies ({movies}) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies ? 
        <ListOfMovies movies={movies} /> 
        :
        <NoMovies />
    )
}