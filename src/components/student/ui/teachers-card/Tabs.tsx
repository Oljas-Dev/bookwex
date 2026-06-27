import { useCards } from "../../features/context/useCards";
import type { activeTabs } from "../../features/context/LessonsContextData";

interface tabsTypes {
  title: activeTabs;
  id: string;
}

export default function Tabs() {
  const { activeTab, setActiveTab } = useCards();

  const tabs: tabsTypes[] = [
    { title: "my_teaching", id: "1" },
    { title: "my_learning", id: "2" },
  ];

  function activeTabs(tab: activeTabs) {
    setActiveTab(tab);
  }

  return (
    <div className="flex flex-col gap-4 relative overflow-hidden">
      {/* styling gradient */}
      <span className="absolute z-10 w-full h-10 top-9 bg-linear-to-t from-secondary-bg to-transparent"></span>

      <div className="flex gap-4">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.id}
              className={`${activeTab === tab.title ? "active-tab" : "disabled-tab"} tab cursor-pointer`}
              onClick={() => activeTabs(tab.title)}
            >
              <h2>{tab.title.replace("_", " ")}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
