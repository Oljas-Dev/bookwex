import { useAuth } from "../../../../contexts/useAuth";
import CardsNavigation from "../../ui/teachers-card/CardsNavigation";
import Tabs from "../../ui/teachers-card/Tabs";
import { useCards } from "../context/useCards";
import MyTeaching from "./MyTeachingRender";
import StudentLearningRender from "./StudentLearningRender";
import TeacherLearningRender from "./TeacherLearningRender";

export default function BookingCardsResolver() {
  const { profile } = useAuth();
  const { activeTab } = useCards();

  if (profile?.role === "teacher")
    return (
      <>
        <Tabs />

        <div className="flex flex-col gap-4">
          <CardsNavigation />
          {activeTab === "my_teaching" ? (
            <MyTeaching />
          ) : (
            <TeacherLearningRender />
          )}
        </div>
      </>
    );

  if (profile?.role === "student")
    return (
      <div className="flex flex-col gap-4">
        <CardsNavigation />
        <StudentLearningRender />
      </div>
    );
}
