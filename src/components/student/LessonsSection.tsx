import BookingCardsResolver from "./features/bookings-resolver/BookingCardsResolver";

export default function LessonsSection() {
  return (
    <section className="self-start flex flex-col gap-6 px-10 w-full">
      <BookingCardsResolver />
    </section>
  );
}
