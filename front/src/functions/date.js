export const getRelativeTime = (date) => {
  const now = new Date();
  date = new Date(date);

  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) {
    return "just now";
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diff < 2592000) {
    const weeks = Math.floor(diff / 604800);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(diff / 2592000);
  return `${months} month${months > 1 ? "s" : ""} ago`;
};

export const formatDateTime = (date) => {
  const aditionalZero = (value) => {
    if (value <= 9) return "0" + value;
    return value;
  };

  date = new Date(date);

  return `${aditionalZero(date.getDate())}/${aditionalZero(
    date.getMonth()
  )}/${date.getFullYear()} ${date.getHours()}:${aditionalZero(
    date.getMinutes()
  )}`;
};
