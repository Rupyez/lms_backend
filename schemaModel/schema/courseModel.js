import mongoose, { Schema } from "mongoose";

const courseSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
  },

  // thumbnail: {
  //     public_id: {
  //         type: String,
  //         required: true,
  //     },
  //     url: {
  //         type: String,
  //     },
  // },
  tags: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  // demoUrl: {
  //     type: String,
  //     required: true,
  // },
  benefits: [
    {
      title: String,
    },
  ],

  prerequisties: [
    {
      title: String,
    },
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ], // Use the schema of the imported Review model
  courseData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseData",
    },
  ],
},{timeStamps:true});

export default courseSchema
