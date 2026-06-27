import type { currentUser, CurrentUserQuery } from "../types/profile";

export function mapCurrentUser(user: CurrentUserQuery): currentUser {
  return {
    name: user.full_name,
    avatar: user.avatar_url,

    myTeachers: user.teachers.map((teacher) => ({
      id: teacher.id,
      name: teacher.full_name,
      avatar: teacher.avatar_url,
    })),
  };
}
