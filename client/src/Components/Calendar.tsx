import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRegCircle } from 'react-icons/fa'; 
import '../Index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllEvents } from '../api/eventAPI';
import { EventData } from '../interfaces/EventData';

interface Holiday {
  date: Date;
  name: string;
  month?: number; 
}

const holidayData = [
  { name: "New Year's Day", month: 1, day: 1 },
  { name: 'Independence Day', month: 7, day: 4 },
  { name: 'Christmas Day', month: 12, day: 25 },
  { name: 'Thanksgiving', month: 11, day: 28 },
  { name: 'Memorial Day', month: 5, day: 27 },
  { name: 'Labor Day', month: 9, day: 2 },
  { name: 'Columbus Day', month: 10, day: 14 },
  { name: 'Veterans Day', month: 11, day: 11 },
  { name: 'Martin Luther King Jr. Day', month: 1, day: 20 },
  { name: 'Presidents Day', month: 2, day: 17 },
  { name: 'Easter', month: 4, day: 12 },
  { name: 'Valentine’s Day', month: 2, day: 14 },
  { name: 'April Fools Day', month: 4, day: 1 },
  { name: 'Groundhog Day', month: 2, day: 2 }, 
  { name: 'Earth Day', month: 4, day: 22 },
  { name: 'Arbor Day', month: 4, day: 24 },
  { name: 'Flag Day', month: 6, day: 14 },
  { name: 'Mother’s Day', month: 5, day: 10 },
  { name: 'Father’s Day', month: 6, day: 21 },
  { name: 'National Grandparents Day', month: 9, day: 8 },
  { name: 'National Siblings Day', month: 4, day: 10 },
  { name: 'National Cousins Day', month: 7, day: 24 },
  { name: 'National Best Friends Day', month: 6, day: 8 },
  { name: 'National Boyfriend Day', month: 10, day: 3 },
  { name: 'National Girlfriend Day', month: 8, day: 1 },
  { name: 'National Dog Day', month: 8, day: 26 },
  { name: 'National Cat Day', month: 10, day: 29 },
  { name: 'National Pet Day', month: 4, day: 11 },
  { name: 'National Puppy Day', month: 3, day: 23 },
  { name: 'National Kitten Day', month: 7, day: 10 },
  { name: 'National Black Cat Day', month: 10, day: 27 },
  { name: 'National Love Your Pet Day', month: 2, day: 20 },
  { name: 'National Dress Up Your Pet Day', month: 1, day: 14 },
  { name: 'National Pet Month', month: 5, day: 1 },
  { name: 'Halloween', month: 11, day: 1 },
  { name: 'National Pet Diabetes Month', month: 11, day: 1 },
  { name: 'National Pet Dental Health Month', month: 2, day: 1 },
  { name: 'National Pet First Aid Awareness Month', month: 4, day: 1 },
  { name: 'National Pet Health Insurance Month', month: 9, day: 1 },
  { name: 'National Pet Hydration Awareness Month', month: 7, day: 1 },
  { name: 'National Pet Memorial Day', month: 9, day: 9 },
  
  




];

// Create an array of Holiday objects using the data
const holidays: Holiday[] = [];

for (let i = 0; i < holidayData.length; i++) {
  const { name, month, day } = holidayData[i];
  const holiday: Holiday = {
    name,
    date: new Date(`2024-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)
  };
  holidays.push(holiday);
}


const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const today = new Date();

  const [events, setEvents] = useState<EventData[]>([])

  const getEvents = async () => {
    const array = await getAllEvents()
    if (array) {
    setEvents(array)}
  }

  useEffect(()=> {getEvents()},[]
  )


  useEffect(() => {
    const storedNotes = localStorage.getItem('calendarNotes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
  }, [notes]);

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendarDays = () => {
    const firstDayIndex = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    return Array(firstDayIndex).fill(null).concat(Array.from({ length: totalDays }, (_, i) => i + 1));
  };

  const isHoliday = (date: Date) => {
    return holidays.some(holiday => holiday.date.toDateString() === date.toDateString());
  };

  const getHolidayName = (date: Date) => {
    const holiday = holidays.find(holiday => holiday.date.toDateString() === date.toDateString());
    return holiday ? holiday.name : '';
  };

  const isToday = (day: number) => {
    return today.getFullYear() === currentDate.getFullYear() &&
           today.getMonth() === currentDate.getMonth() &&
           today.getDate() === day;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction));
  };

  // const formatDate = (year: number, month: number, day: number) => {
  //   return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  // };

  const formatDate = (year: number, month: number, day: number) => {
    return `${month + 1}-${day}-${year}`;
  };

  const calendarDays = generateCalendarDays();
  const rows = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    rows.push(calendarDays.slice(i, i + 7));
  }


  const isEvent = (array: EventData[], date: string) => {
    return array.find((element) => element.date === date.split('-').join('/'))

  }

  return (
    <Container>
      <Row className="mb-4 align-items-center">
        <Col className="text-center">
          <Button onClick={() => navigateMonth(-1)}>&lt; Previous Month</Button>
          <h2 className="d-inline mx-3">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
          <Button onClick={() => navigateMonth(1)}>Next Month &gt;</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered className="table">
            <thead>
              <tr>
                {daysOfWeek.map(day => (
                  <th key={day} className="text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((day, dayIndex) => {
                    const formattedDate = day !== null ? formatDate(currentDate.getFullYear(), currentDate.getMonth(), day) : '';
                    const currentDateObject = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

                    return (

                      
                      <td key={dayIndex} className="text-center">
                        {day !== null && (
                          <>
                            <div className={`day ${isHoliday(currentDateObject) ? 'holiday' : ''}`}>
                              {isEvent(events, formattedDate)? (<Link to={`/events/${formattedDate}`}>{day}</Link>):(<div>{day}</div>)}
                              {isToday(day) && <FaRegCircle className="-icon" style={{ color: 'red', marginLeft: '5px' }} />}
                              {isHoliday(currentDateObject) && <span className="holiday-name">{getHolidayName(currentDateObject)}</span>}
                            </div>
                            {/* {notes[formattedDate] && (
                              <Link to={`/NotePage/${formattedDate}`}>
                                <Button variant="primary">View Notes</Button>
                              </Link>
                            )} */}
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Calendar;




