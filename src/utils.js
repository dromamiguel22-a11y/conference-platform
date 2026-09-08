function getConferenceStatus(dateISO) {
    const today = new Date();
    const conferenceDate = new Date(dateISO);
  
    today.setHours(0, 0, 0, 0);
    conferenceDate.setHours(0, 0, 0, 0);
  
    if (conferenceDate.getTime() === today.getTime()) {
      return 'Ongoing';
    } else if (conferenceDate > today) {
      return 'Upcoming';
    } else {
      return 'Completed';
    }
  }
  function parseTimeToMinutes(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
  
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
  
    return hours * 60 + minutes;
  }
  
  export { parseTimeToMinutes };
  
  export default getConferenceStatus;