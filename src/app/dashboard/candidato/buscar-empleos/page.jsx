import SearchFilters from "../buscar-empleos/search-filters";
import Select from "../../../components/ui/Select";
import JobCard from "../../../components/dashboard/JobCard";
//import JobDetail from "@/app/components/dashboard/JobDetail";

export default function BuscarEmpleoPage() {
    return(
        <div className="p-6">
            <div>
              {/* Barra de busqueda */}
              <SearchFilters />
            </div>
            {/* Tabs */}
            <div className="flex space-x-6 mt-10 mb-4">
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
                Para ti
              </button>
              <button className="text-gray-500 hover:text-gray-700 pb-2">
                Populares
              </button>
              <div className="ml-auto">
                <Select />
              </div>
            </div>
            <div>
                <JobCard />
            </div>
            <div>
                {/* JobDetail */}
            </div>
        </div>
    );
}