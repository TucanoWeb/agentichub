import Joi from 'joi';

export const createRepoSchema = Joi.object({
  github_url: Joi.string().uri().pattern(/github\.com/).required(),
  tags: Joi.string().required()
});

export const fetchRepoQuery = Joi.object({
  id: Joi.string().uuid().required()
});