 <div className="w-[30%]">
        {/* Section Calendrier + Agenda */}
        <section className="bg-white p-6 rounded shadow gap-6">
          {/* Calendrier interactif */}
          <div>
            {/* <h2 className="font-semibold mb-4">Calendrier</h2> */}
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded-lg shadow-sm border border-gray-200 p-2"
            />
          </div>

          {/* Agenda du jour */}
          <div className="pt-8">
            <h2 className="font-semibold mb-4">
              Agenda du {format(selectedDate, "dd/MM/yyyy")}
            </h2>
            {dayEvents.length > 0 ? (
              <ul className="text-sm text-gray-700 space-y-3">
                {dayEvents.map((event, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b border-gray-200 pb-2"
                  >
                    <span className="font-medium">{event.time}</span>
                    <span>{event.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">
                Aucun événement prévu ce jour-là.
              </p>
            )}
          </div>
        </section>
      </div>