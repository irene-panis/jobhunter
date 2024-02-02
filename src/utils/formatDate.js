export const formatDate = (date) => {
  const newDate = new Date(date);

  if (!(newDate instanceof Date)) {
    // Handle the case where date is not a valid Date object
    return "Invalid Date";
  }

  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return newDate.toLocaleDateString(undefined, options);
}

export const convertToDateTimeObject = (datetimeString) => {
  const formattedString = datetimeString + ":00";
  
  const dateObject = new Date(formattedString);
  
  if (isNaN(dateObject.getTime())) {
    return ''; 
  }

  return dateObject;
}

export const convertToCustomFormat = (dateString) => {
  const dateObject = new Date(dateString);

  if (isNaN(dateObject.getTime())) {
    return '';
  }

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const formatInterviewTime = (date) => {
  const newDate = new Date(date);

  if (!(newDate instanceof Date)) {
    // Handle the case where date is not a valid Date object
    return "Invalid Date";
  }

  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  
  return newDate.toLocaleDateString(undefined, options);
}