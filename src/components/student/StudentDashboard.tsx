import useStudent from "../../api/features/useStudent";
import MyTeachers from "./MyTeachers";

interface MyTeacherProps {
  full_name: string;
  subject: string;
}

export default function StudentDashboard() {
  const { student, isLoading } = useStudent();

  if (isLoading) return <p>loading student's data...</p>;

  return (
    <>
      <section className="grid grid-cols-[70%_30%] w-full bg-jade px-10 py-6 mb-8 [&_p]:text-lg">
        <div>
          <h2>Hi👋, {student?.full_name}</h2>
          <p>Let's start learning, please, choose your teacher</p>
          <p>My teachers:</p>

          <ul className="mt-2">
            {student?.my_teachers?.map((name: MyTeacherProps, i: number) => (
              <MyTeachers
                key={i}
                teacherName={name.full_name}
                subject={name.subject}
              />
            ))}
          </ul>
        </div>
        <aside className="flex flex-col items-center gap-4 [&_h3]:text-center">
          <div>
            <h3>My profile</h3>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500"
              alt="profile image"
              className="w-44 h-44 object-cover rounded-xl border-4 border-peach"
            />
          </div>

          <div>
            <h3>Home tasks</h3>
            <p>There are no home tasks for now. You are all up to date!</p>
          </div>
        </aside>
      </section>
    </>
  );
}
