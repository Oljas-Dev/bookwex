import type { TeacherProfile } from "../types/ui";

export function mapTeacherProfile(data: any): TeacherProfile {
  return {
    id: data.profile.id,

    full_name: data.profile.full_name,

    avatar_url: data.profile.avatar_url,

    subject: data.subject,

    video_intro: data.video_intro,

    descriptions: data.teacher_descriptions,

    lessons: data.teacher_lessons,

    socialLinks: data.teacher_social_links,

    reviews: data.teacher_reviews,

    experience: data.teacher_experience,

    rating_calc: {
      average_rating: data.average_rating,

      review_count: data.review_count,
    },
  };
}
