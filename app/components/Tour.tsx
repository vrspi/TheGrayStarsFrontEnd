'use client';

import SpotlightSection from './SpotlightSection';

const tourDates = [
  {
    date: "July 14-23, 2024",
    event: "Gentse Feesten",
    location: "Ghent, Belgium",
    status: "Upcoming"
  },
  {
    date: "August 5, 2024",
    event: "Brussels Summer Festival",
    location: "Brussels, Belgium",
    status: "Upcoming"
  },
  {
    date: "September 15, 2024",
    event: "World Music Festival",
    location: "Antwerp, Belgium",
    status: "Upcoming"
  }
];

export default function Tour() {
  return (
    <SpotlightSection className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-white">Tour </span>
          <span className="text-primary-red">Dates</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          {tourDates.map((tour, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-r from-primary-gray/50 to-black/50 rounded-xl p-6 mb-4 hover:from-primary-red/20 hover:to-black/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-red transition-colors duration-300">
                    {tour.event}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {tour.location}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-primary-red font-medium">{tour.date}</span>
                  <button className="px-6 py-2 bg-primary-red/20 hover:bg-primary-red/30 rounded-full text-white transition-colors duration-300">
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SpotlightSection>
  );
}
