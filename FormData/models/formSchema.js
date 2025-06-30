import { Schema,model } from "mongoose";

const SubmissionSchema = new Schema({
  data: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Submission=model('submission', SubmissionSchema);

export default Submission
