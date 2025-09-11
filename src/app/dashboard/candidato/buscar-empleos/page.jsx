import SearchFilters from "../buscar-empleos/search-filters";
import Select from "../../../components/ui/Select";
import JobCard from "../../../components/dashboard/JobCard";

export default function BuscarEmpleoPage() {
    return(
        <div>
            <div>
            <SearchFilters />
            </div>
            {/* Tabs */}
            <div className="flex space-x-6 mt-10 mb-10">
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
            {/* Job Cards */}
            <div>
                <JobCard />
            </div>
            {/* Job Detail */}
            <div>
                
            </div>
        </div>
    );
}   