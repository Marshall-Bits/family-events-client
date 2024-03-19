const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("ES-es", options);
};

const formatYYYMMDD = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toISOString().split('T')[0];
};
export { formatDate, formatYYYMMDD };