export function getDate(data: Date | string) {
  if (!data) return "Não informado";

  const date = new Date(data);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year} `;
}

export function getDate2(date: string) {
  return date.split(" ")[0];
}

export function getDateTime(data: Date | string) {
  if (!data) return "Não informado";
  const date = new Date(data);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatLocalDateTime(date: string | null): string | null {
  if (!date) return null;
  const jsDate = new Date(date);

  // Adjust for timezone offset
  const timezoneOffset = jsDate.getTimezoneOffset();
  const correctedDate = new Date(jsDate.getTime() + timezoneOffset * 60000);

  return correctedDate.toISOString().slice(0, 19);
}
