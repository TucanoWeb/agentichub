import Joi from 'joi';

export const fetchBlueprintQuery = Joi.object({
  hash: Joi.string().min(8).max(128).required()
});

export const createBlueprintPayload = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  description: Joi.string().allow('').max(5000).optional(),
  instructions: Joi.string().min(1).required(),
  files: Joi.array()
    .items(
      Joi.object({
        path: Joi.string().min(1).max(500).required(),
        content: Joi.string().min(0).required()
      })
    )
    .min(1)
    .required()
});

export const updateBlueprintPayload = Joi.object({
  name: Joi.string().min(3).max(200).optional(),
  description: Joi.string().allow('').max(5000).optional(),
  instructions: Joi.string().min(1).optional(),
  files: Joi.array().items(
    Joi.object({
      path: Joi.string().min(1).max(500).required(),
      content: Joi.string().min(0).required()
    })
  )
});
