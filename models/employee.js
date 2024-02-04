import mongoose, { Schema } from 'mongoose';

let Employee;

try {
  Employee = mongoose.model('Employee');
} catch (error) {
  const employeeSchema = new Schema(
    {
      name: { type: String, required: true },
      dob: { type: Date, required: true },
      mobileNumber: { type: String, required: true },
      photograph: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  Employee = mongoose.model('Employee', employeeSchema);
}

export default Employee;
