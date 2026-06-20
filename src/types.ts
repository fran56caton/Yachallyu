export type Role = "admin" | "director" | "teacher" | "student" | "parent" | "creator" | "preuni";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface TeacherProfile extends User {
  role: "teacher";
  specialty: string;
  institutionId: string;
}

export interface StudentProfile extends User {
  role: "student";
  classroomId: string;
  passportCode: string;
  level: number;
  totalPoints: number;
}

export interface Mission {
  id: string;
  title: string;
  narrative: string;
  areaId: string;
  grade: string;
  competency: string;
  purpose: string;
  context: string;
  duration: string;
  difficulty: "Básica" | "Intermedia" | "Avanzada";
  mode: "Offline" | "Online" | "Híbrido";
  status: "draft" | "published";
  isAI?: boolean;
}

export interface Ayllu {
  id: string;
  name: string;
  classroomId: string;
  members: StudentProfile[];
}

export interface Badge {
  id: string;
  name: string;
  areaId: string;
  icon: string;
}
