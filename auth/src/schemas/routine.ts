import mongoose from 'mongoose';

interface RoutineAttrs {
  label: string;
  url: string;
}

interface RoutineDoc extends mongoose.Document {
  id: number;
  label: string;
  url: string;
}

interface RoutineModel extends mongoose.Model<RoutineDoc> {
  build(attrs: RoutineAttrs): RoutineDoc;
}

const routineSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
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

routineSchema.statics.build = (attrs: RoutineAttrs) => {
  return new Routine(attrs);
};

const Routine = mongoose.model<RoutineDoc, RoutineModel>('Routine', routineSchema);

export { Routine, RoutineDoc };
