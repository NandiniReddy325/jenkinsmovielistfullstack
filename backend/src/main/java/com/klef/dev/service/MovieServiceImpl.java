package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.entity.Movie;
import com.klef.dev.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository repo;

    @Override
    public Movie addMovie(Movie movie) {
        return repo.save(movie);
    }

    @Override
    public List<Movie> getAllMovies() {
        return repo.findAll();
    }

    @Override
    public Movie getMovieById(int id) {
        Optional<Movie> opt = repo.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Movie updateMovie(Movie movie) {
        return repo.save(movie);
    }

    @Override
    public void deleteMovieById(int id) {
        repo.deleteById(id);
    }
}
