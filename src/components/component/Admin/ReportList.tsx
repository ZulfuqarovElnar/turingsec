import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllReportsUsersById } from '../../../queryies/useGetAllReportsUsersById';
import { useGetAllReportsCompanysById } from '../../../queryies/useGetAllReporsCompanysById';

interface ReportListProps {
  searchTerm: string;
  searchType: 'user' | 'company';
}

const ReportList: React.FC<ReportListProps> = ({ searchTerm, searchType }) => {
  const navigate = useNavigate();
  
  const { data: reports, isLoading, isError, error } = searchType === 'user'
    ? useGetAllReportsUsersById(searchTerm)
    : useGetAllReportsCompanysById(searchTerm);

  const handleCardClick = (reportId: string) => {
    navigate(`/singleadminreport/${reportId}`);
  };

  if (isLoading) return <div className="text-center mt-4">Loading reports...</div>;
  if (isError) {
    // Error mesajını göstərmək
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return <div className="text-red-500 mt-4">Error fetching reports: {errorMessage}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {reports && reports.length > 0 ? (
        reports.map((report) => (
          <div
            key={report.id}
            className="bg-[#3D0436] flex flex-col text-center items-center py-10 rounded-3xl w-[340px] cursor-pointer"
            onClick={() => handleCardClick(report.id)} 
          >
            <div className="hexagon4 m-auto md:m-0">
              <img
                src={report.asset.assetType === 'image' ? report.asset.assetName : "/assets/images/profileimage.jpeg"}
                alt="Profile"
                className=""
              />
            </div>
            <h3 className="sm:text-[20px] text-[18px] font-[600] mt-6 mb-2 text-white">
              {report.proofOfConcept.title}
            </h3>
            <p className="sm:text-[16px] text-[14px] font-[400] text-white">Bug Bounty</p>
            <div className="flex justify-between gap-4 mt-6 mb-9">
              <button
                className="hover:scale-110 transition-all duration-300 rounded-full h-[30px] w-[120px] bg-yellow-400 text-black font-[600] text-[14px]
                hover:bg-yellow-500 hover:text-white"
              >
                {report.rewardsStatus}
              </button>
              <button
                className="hover:scale-110 transition-all duration-300 rounded-full h-[30px] w-[120px] bg-yellow-400 text-black font-[600] text-[14px]
                hover:bg-yellow-500 hover:text-white"
              >
                {report.severity}
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="hover:scale-110 transition-all duration-300 rounded-full h-[50px] w-[140px] bg-[#2451F5] text-white font-semibold sm:text-[14px] text-[12px]
                hover:bg-[#1E3A8A] hover:text-yellow-400"
              >
                Contact
              </button>
              <button
                className="hover:scale-110 transition-all duration-300 rounded-full h-[50px] w-[140px] bg-yellow-500 text-black font-semibold sm:text-[14px] text-[12px]
                hover:bg-yellow-600 hover:text-white"
              >
                View Report
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No reports found</p>
      )}
    </div>
  );
};

export default ReportList;
