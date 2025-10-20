import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Parent
import ParentHub from "./pages/parent/ParentHub";
import TutorDirectory from "./pages/parent/TutorDirectory";
import TutorDetail from "./pages/parent/TutorDetail";
import PostTuition from "./pages/parent/PostTuition";
import MyPosts from "./pages/parent/MyPosts";

// Tutor
import TutorHub from "./pages/tutor/TutorHub";
import TutorProfile from "./pages/tutor/TutorProfile";
import TutorPosts from "./pages/tutor/TutorPosts";
import TutorApplications from "./pages/tutor/TutorApplications";

// Admin
import AdminTutors from "./pages/admin/AdminTutors";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Parent */}
          <Route path="/parent" element={<ParentHub />} />
          <Route path="/parent/tutors" element={<TutorDirectory />} />
          <Route path="/parent/tutors/:id" element={<TutorDetail />} />
          <Route path="/parent/post-tuition" element={<PostTuition />} />
          <Route path="/parent/my-posts" element={<MyPosts />} />

          {/* Tutor */}
          <Route path="/tutor" element={<TutorHub />} />
          <Route path="/tutor/profile" element={<TutorProfile />} />
          <Route path="/tutor/posts" element={<TutorPosts />} />
          <Route path="/tutor/applications" element={<TutorApplications />} />

          {/* Admin */}
          <Route path="/admin/tutors" element={<AdminTutors />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
