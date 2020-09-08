import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    currentGenre: false,
    sortColumn: { path: "title", order: "asc" },
    search: "",
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({ movies });
    this.setState({ genres });
  }

  handleDelete = (movie) => {
    let movies = [...this.state.movies];
    movies = movies.filter((m) => m !== movie);
    this.setState({ movies });
    deleteMovie(movie._id);
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };

    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleListGroup = (genre) => {
    this.setState({ search: "", currentGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = ({ currentTarget: input }) => {
    console.log("search");
    //const data = input.value.toUpperCase();
    this.setState({
      currentGenre: null,
      currentPage: 1,
      search: input.value,
    });
  };

  // getPageData = () => {
  //   const { movies: allMovies, pageSize, currentPage } = this.state;

  //   return { totalCount: allMovies.length, data: movies };
  // };

  render() {
    const { length: count } = this.state.movies;

    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortColumn,
    } = this.state;

    const { user } = this.props;

    let filtered = allMovies;
    if (this.state.search) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(this.state.search.toLowerCase())
      );
    } else {
      filtered = currentGenre
        ? allMovies.filter((movie) => movie.genre._id === currentGenre._id)
        : allMovies;
    }

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);

    const movies = paginate(sorted, currentPage, pageSize);
    //const { totalCount, data: allData } = this.getPageData();

    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              onList={this.handleListGroup}
              currentGenre={currentGenre}
            />
          </div>
          <div className="col">
            {user && (
              <Link to="/movies/new" className="btn btn-primary mb-2">
                New Movie
              </Link>
            )}
            <p>
              Showing <strong>{filtered.length}</strong> movies in the database
            </p>
            <input
              onChange={this.handleSearch}
              value={this.state.search}
              type="text"
              className="form-control my-3"
              id="search"
              placeholder="Search..."
            />
            <MoviesTable
              movies={movies}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              onPageChange={this.handlePageChange}
              pageSize={pageSize}
              totalItem={filtered.length}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
