import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Students from './pages/admin/Students';
import Schedule from './pages/admin/Schedule';
import ProjectGroups from './pages/admin/ProjectGroups';
import Tasks from './pages/student/Tasks';
import StudentSchedule from './pages/student/Schedule';
import Profile from './pages/student/Profile';
import Reminders from './pages/student/Reminders';
import Groups from './pages/student/Groups';
import Statistics from './pages/student/Statistics';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/student"
            element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/tasks"
            element={
              <PrivateRoute role="student">
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/schedule"
            element={
              <PrivateRoute role="student">
                <StudentSchedule />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <PrivateRoute role="student">
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/reminders"
            element={
              <PrivateRoute role="student">
                <Reminders />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/groups"
            element={
              <PrivateRoute role="student">
                <Groups />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/statistics"
            element={
              <PrivateRoute role="student">
                <Statistics />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <PrivateRoute role="admin">
                <Students />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/schedule"
            element={
              <PrivateRoute role="admin">
                <Schedule />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/groups"
            element={
              <PrivateRoute role="admin">
                <ProjectGroups />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 