import PatientsIndex from "../patients";
import PatientsForm from "../patients/Form";

const AdminPatients = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="md:w-1/2 lg:w-2/5">
        <PatientsForm />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <PatientsIndex />
      </div>
    </div>
  );
};

export default AdminPatients;
