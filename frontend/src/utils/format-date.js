export const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    // Извлекаем компоненты даты
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в объекте Date начинаются с 0
    const year = date.getFullYear();

    // Форматируем дату в требуемый вид
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
}
