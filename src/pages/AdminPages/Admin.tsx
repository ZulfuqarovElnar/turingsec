import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../../components/component/Admin/SearchForm';
import { useGetAllCompanyUsers } from '../../queryies/useGetAllCompanyUsers';
import { useGetAllUsers } from '../../queryies/useGetAllUsers';
import ReportList from '../../components/component/Admin/ReportList';

export default function Admin() {
  const navigate = useNavigate();
  const { data: users, isLoading: usersLoading, error: usersError } = useGetAllUsers();
  const { data: companies, isLoading: companiesLoading, error: companiesError } = useGetAllCompanyUsers();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'user' | 'company'>('user');
  const [searchTriggered, setSearchTriggered] = useState<boolean>(false);

  const handleSearch = (term: string, type: 'user' | 'company') => {
    setSearchTerm(term);
    setSearchType(type);
    setSearchTriggered(true); // Trigger the search
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect to home page
    navigate('/');
  };

  if (usersLoading || companiesLoading) return <div className="text-center mt-4">Loading...</div>;
  if (usersError) return <div className="text-red-500 mt-4">Error loading users: {(usersError as Error).message}</div>;
  if (companiesError) return <div className="text-red-500 mt-4">Error loading companies: {(companiesError as Error).message}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">All Users</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users?.map((user) => (
            <div
              key={user.userId}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-gray-600">ID: {user.userId}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-500">{user.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4 text-center">All Companies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {companies?.map((company) => (
            <div
              key={company.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{company.company_name}</h2>
              <p className="text-gray-600">ID: {company.id}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{company.email}</p>
                <p className="text-sm text-gray-500">{company.city}</p>
                <p className="text-sm text-gray-500">{company.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className='py-10'>
        <SearchForm onSearch={handleSearch} />

        {searchTriggered && <ReportList searchTerm={searchTerm} searchType={searchType} />}
      </div>
      {/* Logout Button */}
      <div className="text-left pt-10">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
