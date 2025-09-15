'use client'
import SearchFilters from "../buscar-empleos/search-filters";
import Select from "../../../components/ui/Select";
import JobCard from "../../../components/dashboard/JobCard";
import { useState,useMemo } from "react";
import { mockJobs } from "../../../data/mockData";
import JobDetail from "../../../components/dashboard/JobDetail";

export default function BuscarEmpleoPage() {
    const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('para-ti');
    const [sortOrder, setSortOrder] = useState('recientes');

    // Filtrar trabajos basado en búsqueda
    const filteredJobs = useMemo(() => {
        if (!searchTerm.trim()) return mockJobs;
        
        return mockJobs.filter(job => 
            job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleClearFilters = () => {
        setSearchTerm('');
    };

    const handleJobSelect = (job) => {
        setSelectedJob(job);
    };

    return(
        <div className="p-6">
            <div>
              {/* Barra de busqueda */}
              <SearchFilters 
                onSearch={handleSearch}
                clearFilters={handleClearFilters}
              />
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-6 mt-10 mb-4">
              <button 
                onClick={() => setActiveTab('para-ti')}
                className={`font-medium pb-2 transition-colors ${
                    activeTab === 'para-ti' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Para ti
              </button>
              <button 
                onClick={() => setActiveTab('populares')}
                className={`font-medium pb-2 transition-colors ${
                    activeTab === 'populares' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Populares
              </button>
              <div className="ml-auto">
                <Select />
              </div>
            </div>

            

            <div>
                <JobCard />
            </div>
            
            {/* Panel de detalles */}
            <div className="sticky top-0">
                <JobDetail job={selectedJob} />
            </div>
        </div>
    );
}