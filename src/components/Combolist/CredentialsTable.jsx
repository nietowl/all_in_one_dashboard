import React from 'react';
import { Database, Download, RefreshCw } from 'lucide-react';
import Pagination from '../Common/Pagination';
import LoadingSpinner from '../Common/LoadingSpinner';

const CredentialsTable = ({ credentialData, currentFilters, setCurrentFilters, fetchData, loading }) => {
  const stats = {
    displayedCredentials: credentialData.data?.length || 0,
    totalCredentials: credentialData.totalEntries || 0
  };

  const exportToCSV = () => {
    const headers = ['#', 'Host', 'URL', 'Username', 'Password'];
    const rows = credentialData.data?.map((cred, idx) => [
      idx + 1,
      cred.host,
      cred.url,
      cred.username,
      cred.password
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credentials_${currentFilters.domain}_${currentFilters.year}_${currentFilters.month}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden">
      <div className="p-4 bg-slate-900/50 border-b border-slate-700 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Credential Database</h3>
          <p className="text-slate-400 text-sm">
            Showing {stats.displayedCredentials} of {stats.totalCredentials.toLocaleString()} entries
          </p>
        </div>
        <button 
          onClick={exportToCSV}
          disabled={!credentialData.data?.length}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {loading && <LoadingSpinner message="Loading credentials..." />}

      {!loading && credentialData.data?.length === 0 && (
        <div className="p-20 text-center">
          <Database className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No Data Found</h3>
          <p className="text-slate-400 mb-6">
            No credentials found for <span className="font-mono text-white">{currentFilters.domain}</span> in {currentFilters.month} {currentFilters.year}
          </p>
          <button
            onClick={() => fetchData(currentFilters)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {!loading && credentialData.data?.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Host</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">URL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {credentialData.data.map((cred, idx) => (
                  <tr key={`${currentFilters.start}-${idx}`} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-400">{currentFilters.start + idx}</td>
                    <td className="px-6 py-4 text-sm text-white font-mono">{cred.host}</td>
                    <td className="px-6 py-4 text-sm text-blue-400 hover:text-blue-300">
                      <a href={`https://${cred.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {cred.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{cred.username}</td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                      <span className="bg-slate-900 px-2 py-1 rounded">{cred.password?.substring(0, 20)}...</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {stats.totalCredentials > currentFilters.max && (
            <Pagination
              currentStart={currentFilters.start}
              maxResults={currentFilters.max}
              totalEntries={stats.totalCredentials}
              onPageChange={(newStart) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const newFilters = { ...currentFilters, start: newStart };
                setCurrentFilters(newFilters);
                fetchData(newFilters);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CredentialsTable;