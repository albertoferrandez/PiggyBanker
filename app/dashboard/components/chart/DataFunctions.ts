type Data = { [month: string]: { [day: string]: number } };

export const getFormattedMonth = (date: Date): string => {
    return date.toLocaleString("default", { month: "long" });
  }

export const getFormattedDay = (date: Date): string => {
    return date.toLocaleString("es-ES", { weekday: "long", day: "numeric" });
  }

export const updateResult = (
    result: Data,
    month: string,
    day: string,
    amount: number
  ): void => {
    if (result[month]) {
      if (result[month][day]) {
        result[month][day] += amount;
      } else {
        result[month][day] = amount;
      }
    } else {
      result[month] = { [day]: amount };
    }
  }