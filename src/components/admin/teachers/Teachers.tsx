import { useState } from "react";
import { useAdminTeachers } from "../features/hooks/useAdminTeachers";
import AdminHeader from "./ui/AdminHeader";
import TeacherList from "../ui/TeacherList";

export default function AdminTeachers() {
  const [teacherType, setTeacherType] = useState(["founder"]);

  const { adminTeachers, isPending } = useAdminTeachers(teacherType);

  const teachersTotal = adminTeachers?.length;

  console.log(adminTeachers);

  return (
    <section className="w-full bg-jade px-10 py-6 mb-8 relative max-[900px]:flex max-[900px]:flex-col max-[900px]:items-center max-[900px]:gap-6">
      <AdminHeader
        teachersTotal={teachersTotal?.toString()}
        isPending={isPending}
        setTeacherType={setTeacherType}
      />
      <TeacherList teachers={adminTeachers} />
    </section>
  );
}
