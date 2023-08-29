import React, { useEffect, useState } from 'react';
import Page from './Layout/Page';
import './status.css';
import axios from 'axios';
const Status = () => { // Accept email as a prop
  const [requests, setRequests] = useState([]);
 
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve the email from localStorage
  
    // Fetch data using userEmail from backend API
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getClientRequirementsforStatus', { params: { userEmail } });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    
    fetchRequests();
  }, []);
  return (
    <Page
      pageContent={(
        <div className="row">
          <div className="w-full">
            <div className="card flex-fill">
              <div className="card-header">
                <h5 className="card-title mb-4">Status</h5>
              </div>
              <table className="table table-hover my-0 w-full text-center">
                <thead>
                  <tr>
                    <th className="d-xl-table-cell">Request ID</th>
                    <th className="d-xl-table-cell">Request Date</th>
                    <th className="d-xl-table-cell">Event Date</th>
                    <th className="d-xl-table-cell">Status</th>
                    <th className="d-md-table-cell">Assignee</th>
                    <th className="d-md-table-cell">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">{request._id}</td>
                      <td className="whitespace-nowrap px-6 py-4">{new Date(request.requestDate).toDateString()}</td>
                      <td className="whitespace-nowrap px-6 py-4">{new Date(request.date).toDateString()}</td>
                      <td className="whitespace-nowrap px-6 py-4">{request.status}</td>
                      <td className="whitespace-nowrap px-6 py-4">{request.assignee || '-'}</td>
                      <td className="whitespace-nowrap px-6 py-4">{request.comments || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default Status;
