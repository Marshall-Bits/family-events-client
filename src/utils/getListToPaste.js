const getListToPaste = (title, arrayOfParticipants) => {
    let listToPaste = `${title} \n`;
    arrayOfParticipants.forEach((participant, index) => {
        listToPaste += `${index + 1}.${participant.name} \n`;
    });
    let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(listToPaste)}`;
    window.open(whatsappUrl, '_blank');
};

export default getListToPaste;