export function getFormattedDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours} hrs `;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes} min `;
  }
  if (seconds > 0 || formattedDuration === '') {
    formattedDuration += `${seconds} sec`;
  }

  return formattedDuration.length ? formattedDuration : null;
}
