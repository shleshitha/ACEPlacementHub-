import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { create } from 'zustand';
import LoginPage from "@/pages/login";
import StudentDashboard from "@/pages/student-dashboard";
import FacultyDashboard from "@/pages/faculty-dashboard";
import StudentProfile from "@/pages/student-profile";
import StudentApplications from "@/pages/student-applications";
import StudentSavedJobs from "@/pages/student-saved-jobs";
import FacultyStudents from "@/pages/faculty-students";
import FacultyJobs from "@/pages/faculty-jobs";
import FacultyProfile from "@/pages/faculty-profile";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";
import { queryClient } from "@/lib/queryClient";

function AuthenticatedRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Switch>
      {user.role === "student" ? (
        <>
          <Route path="/" component={StudentDashboard} />
          <Route path="/profile" component={StudentProfile} />
          <Route path="/applications" component={StudentApplications} />
          <Route path="/saved-jobs" component={StudentSavedJobs} />
        </>
      ) : user.role === "faculty" ? (
        <>
          <Route path="/" component={FacultyDashboard} />
          <Route path="/students" component={FacultyStudents} />
          <Route path="/jobs" component={FacultyJobs} />
          <Route path="/profile" component={FacultyProfile} />
        </>
      ) : (
        <>
          <Route path="/" component={AdminDashboard} />
          <Route path="/students" component={FacultyStudents} />
          <Route path="/jobs" component={FacultyJobs} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthenticatedRoutes />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;