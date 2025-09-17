// Mis empleos Page

import JobCard from "../../../components/dashboard/JobCard";
import JobDetail from "../../../components/dashboard/JobDetail";

export default function MisEmpleosPage() {
    return(
        <div  className="h-full flex flex-col" >
            <h1>Mis Empleos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <JobCard />
            </div>
        </div>
    )
}