import Feature from "./Fearure";

const featuresArray = [
  {
    id: "002",
    text: "📅 Calendar Management",
  },
  {
    id: "003",
    text: "⭐ Student Reviews",
  },
  {
    id: "004",
    text: "📱 Mobile Friendly",
  },
  {
    id: "005",
    text: "🌍 Multiple Languages",
  },
  {
    id: "006",
    text: "🎥 Intro Video",
  },
  {
    id: "007",
    text: "💬 Lesson Chat",
  },
  {
    id: "008",
    text: "⏰ Automatic Timezone Conversion",
  },
  {
    id: "009",
    text: "🔗 Personal Booking Link",
  },
];

export default function Features() {
  return (
    <div className="flex justify-between flex-wrap gap-25 gap-y-12 px-18 max-[700px]:px-4 max-[600px]:gap-y-6 max-[400px]:justify-center">
      {featuresArray.map((feature) => {
        return <Feature text={feature.text} key={feature.id} />;
      })}
    </div>
  );
}
