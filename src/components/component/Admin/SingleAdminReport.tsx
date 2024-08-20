import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetReportById } from '../../../queryies/useGetReportById';
import { useGetMessagesInReport } from '../../../queryies/useGetMessagesInReport';

const SingleAdminReport: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();

    const { data: report, isLoading: reportLoading, isError: reportError, error: reportErrorMessage } = useGetReportById(reportId!);
    const { data: messages, isLoading: messagesLoading, isError: messagesError, error: messagesErrorMessage } = useGetMessagesInReport(reportId!);

    if (reportLoading || messagesLoading) return <div className="p-6 text-center">Loading...</div>;

    let errorMessage = '';
    if (reportError) {
        errorMessage = (reportErrorMessage as Error)?.message || 'Error fetching report data';
    }
    if (messagesError) {
        errorMessage = (messagesErrorMessage as Error)?.message || 'Error fetching messages';
    }

    if (errorMessage) return <div className="p-6 text-center text-red-600">Error: {errorMessage}</div>;
  // Mesajları tarixə görə sıralamaq
  const sortedMessages = messages?.slice().sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6">{report?.proofOfConcept?.title}</h2>

      <div className="mb-6">
        <p className="text-gray-800 text-lg"><strong>Asset:</strong> {report?.asset?.assetName} ({report?.asset?.assetType})</p>
        <p className="text-gray-800 text-lg"><strong>Description:</strong> {report?.proofOfConcept?.description}</p>
      </div>

      {report?.collaborators?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Collaborators:</h3>
          {report?.collaborators.map((collaborator, index) => (
            <p key={index} className="text-gray-700">
              <strong>Username:</strong> {collaborator.hackerUsername} - <strong>Collaboration Percentage:</strong> {collaborator.collaborationPercentage}%
            </p>
          ))}
        </div>
      )}

      {report?.discoveryDetails && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Discovery Details:</h3>
          <p className="text-gray-700"><strong>Time Spent:</strong> {report.discoveryDetails.timeSpend} minutes</p>
        </div>
      )}

      {report?.weakness && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Weakness:</h3>
          <p className="text-gray-700"><strong>Type:</strong> {report.weakness.type}</p>
          <p className="text-gray-700"><strong>Name:</strong> {report.weakness.name}</p>
        </div>
      )}

      {report?.methodName && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Method:</h3>
          <p className="text-gray-700"><strong>Method Name:</strong> {report.methodName}</p>
        </div>
      )}

      {report?.rewardsStatus && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Rewards Status:</h3>
          <p className="text-gray-700"><strong>Status:</strong> {report.rewardsStatus}</p>
        </div>
      )}

      {report?.attachments?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Attachments:</h3>
          {report.attachments.map((attachment, index) => (
            <a key={index} href={attachment.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              View Attachment ({attachment.contentType})
            </a>
          ))}
        </div>
      )}

      <div className="mt-6 mb-8">
        <p className="text-gray-600 text-sm">Last Activity: {report?.lastActivity ? new Date(report.lastActivity).toLocaleString() : 'N/A'}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3">Messages:</h3>
        <div className="space-y-4">
          {sortedMessages && sortedMessages.length > 0 ? (
            sortedMessages.map((message: any, index: number) => (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-sm flex ${
                  message.isHacker ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`max-w-xs p-2 rounded-lg w-[400px] ${message.isHacker ? 'bg-green-200' : 'bg-red-200'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">
                      {message.isHacker ? 'User' : 'Company'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-gray-800">{message.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No messages found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleAdminReport;
