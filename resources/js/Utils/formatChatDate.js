// resources/js/Utils/formatChatDate.js
export const formatChatDate = (dateString, isNewDay = false) => {
    const date = new Date(dateString);
    const now = new Date();

    if (isNewDay) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        if (date.toDateString() === now.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString())
            return "Yesterday";
        return date.toLocaleDateString();
    }
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
