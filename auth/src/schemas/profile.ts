import mongoose from 'mongoose';
import { RoutineDoc } from './routine';

interface ProfileAttrs {
  name: string;
  routines: RoutineDoc[];
}

interface ProfileDoc extends mongoose.Document {
  name: string;
  routines: RoutineDoc[];
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    routines: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Routine',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>('Profile', profileSchema);

export { Profile, ProfileDoc };
