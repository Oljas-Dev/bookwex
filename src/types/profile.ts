type TeacherRow = {
  id: string;
  full_name: string;
  avatar_url: string | undefined;
};

export interface currentUser {
  name: string;
  avatar: string | undefined;
  myTeachers: MyTeacher[];

  conference_link?: string | undefined;
}

export interface MyTeacher {
  id: string;
  name: string;
  avatar: string | undefined;
}

export type CurrentUserQuery = {
  full_name: string;
  avatar_url: string | undefined;
  my_teachers: string[];
  teachers: TeacherRow[];
  conference_link: string | undefined;
};
