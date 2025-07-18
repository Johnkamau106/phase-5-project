import React, { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomeDetail.css";

const VisitAndSupport = () => {
  const [visitDate, setVisitDate] = useState(null);

  return (
    <div className="visit-support-container">
      <section className="visit-support-section">
        <h3 className="visit-support-title">Visit & Support This Home</h3>
        <div className="visit-support-grid">
          <div className="visit-item">
            <CalendarDays className="visit-icon" />
            <div className="visit-content">
              <h4>Choose Your Visit Date</h4>
              <DatePicker
                selected={visitDate}
                onChange={(date) => setVisitDate(date)}
                minDate={new Date()}
                placeholderText="Click to select a day"
                className="date-picker-input"
              />
              {visitDate && (
                <p className="visit-confirmation">
                  You selected: <strong>{visitDate.toDateString()}</strong>
                </p>
              )}
            </div>
          </div>

          <div className="visit-item">
            <MapPin className="visit-icon" />
            <div className="visit-content">
              <h4>Location</h4>
              <p>Sunshine House, Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitAndSupport;
