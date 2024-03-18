const getListToPaste = (title, date, arrayOfParticipants) => {
    let listToPaste = `${title} \n${date} \nParticipants: \n`;
    arrayOfParticipants.forEach((participant, index) => {
        listToPaste += `${index + 1}. ${participant.name} \n`;
    });
    let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(listToPaste)}`;
    window.open(whatsappUrl);
};

export default getListToPaste;