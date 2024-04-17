import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
        },
        description: {
            type: String,
            default: "Give this course a description.."
        },
        courseCode: { //IDG2001 f.ex
            type: String,
            required: true,
            minLength: 4,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
    },
    {
        timestamps: true,
    });



export const Course = mongoose.model("Course", courseSchema);