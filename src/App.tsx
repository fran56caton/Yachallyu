import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import QRDeliveryPage from "./pages/QRDeliveryPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AIGenerator from "./pages/teacher/AIGenerator";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherMissions from "./pages/teacher/TeacherMissions";
import TeacherAnalytics from "./pages/teacher/TeacherAnalytics";
import Marketplace from "./pages/teacher/Marketplace";
import TeacherTemplates from "./pages/teacher/TeacherTemplates";
import TeacherDeliveries from "./pages/teacher/TeacherDeliveries";
import TeacherRegistry from "./pages/teacher/TeacherRegistry";
import InteractiveQRMap from "./pages/InteractiveQRMap";
import LabDashboard from "./pages/lab/LabDashboard";
import SimulatorsLibrary from "./pages/lab/SimulatorsLibrary";
import SimulatorWorkspace from "./pages/lab/SimulatorWorkspace";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMissions from "./pages/student/StudentMissions";
import StudentAyllu from "./pages/student/StudentAyllu";
import RoleSelector from "./pages/RoleSelector";
import DashboardLayout from "./layouts/DashboardLayout";
import YupanaVirtual from "./pages/student/YupanaVirtual";
import AdminTestimonialsTable from "./pages/admin/AdminTestimonialsTable";
import InterculturalDashboard from "./pages/intercultural/InterculturalDashboard";
import Glossary from "./pages/intercultural/Glossary";
import CulturalMissions from "./pages/intercultural/Missions";
import AudioBank from "./pages/intercultural/AudioBank";
import CulturalValidation from "./pages/intercultural/CulturalValidation";
import TeacherYupanaDashboard from "./pages/teacher/TeacherYupanaDashboard";
import TeacherFamilyDashboard from "./pages/teacher/TeacherFamilyDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/entregar/:token" element={<QRDeliveryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<RoleSelector />} />

        {/* Dashboard Layout wrapper for authenticated routes */}
        <Route element={<DashboardLayout />}>
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/classes" element={<TeacherClasses />} />
          <Route path="/teacher/ai-generator" element={<AIGenerator />} />
          <Route path="/teacher/missions" element={<TeacherMissions />} />
          <Route path="/teacher/templates" element={<TeacherTemplates />} />
          <Route path="/teacher/deliveries" element={<TeacherDeliveries />} />
          <Route path="/teacher/registry" element={<TeacherRegistry />} />
          <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
          <Route path="/teacher/marketplace" element={<Marketplace />} />
          <Route path="/teacher/map" element={<InteractiveQRMap />} />
          <Route path="/teacher/yupana" element={<TeacherYupanaDashboard />} />
          <Route path="/teacher/lab" element={<LabDashboard />} />
          <Route path="/teacher/lab/library" element={<SimulatorsLibrary />} />
          <Route path="/teacher/lab/simulator/:id" element={<SimulatorWorkspace />} />
          <Route path="/teacher/intercultural" element={<InterculturalDashboard />} />
          <Route path="/teacher/intercultural/glossary" element={<Glossary />} />
          <Route path="/teacher/intercultural/missions" element={<CulturalMissions />} />
          <Route path="/teacher/families" element={<TeacherFamilyDashboard />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/missions" element={<StudentMissions />} />
          <Route path="/student/ayllu" element={<StudentAyllu />} />
          <Route path="/student/yupana" element={<YupanaVirtual />} />
          <Route path="/student/map" element={<InteractiveQRMap />} />
          <Route path="/student/lab" element={<LabDashboard />} />
          <Route path="/student/lab/library" element={<SimulatorsLibrary />} />
          <Route path="/student/lab/simulator/:id" element={<SimulatorWorkspace />} />
          <Route path="/student/intercultural" element={<InterculturalDashboard />} />
          <Route path="/student/intercultural/glossary" element={<Glossary />} />
          <Route path="/student/intercultural/missions" element={<CulturalMissions />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/testimonials" replace />} />
          <Route path="/admin/testimonials" element={<AdminTestimonialsTable />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
