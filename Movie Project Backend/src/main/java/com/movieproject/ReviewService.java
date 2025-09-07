package com.movieproject;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepo reviewRepo;
    private final MongoTemplate mongoTemplate;

    public ReviewService(ReviewRepo reviewRepo, MongoTemplate mongoTemplate) {
        this.reviewRepo = reviewRepo;
        this.mongoTemplate = mongoTemplate;
    }

    public Review createReview(String reviewBody, String imdbId){
        Review review = reviewRepo.insert(new Review(reviewBody));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds", review.getId()))
                .first();

        return review;
    }
}