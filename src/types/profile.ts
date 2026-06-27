type TeacherRow = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

export interface currentUser {
  name: string;
  avatar: string | null;
  myTeachers: MyTeacher[];
}

export interface MyTeacher {
  id: string;
  name: string;
  avatar: string | undefined;
}

export type CurrentUserQuery = {
  full_name: string;
  avatar_url: string | null;
  my_teachers: string[];
  teachers: TeacherRow[];
};
