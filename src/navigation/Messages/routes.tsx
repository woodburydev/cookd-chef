import Message from "src/screens/Home/Message";
import MessageDetail from "src/screens/Messages/MessageDetail";

export const MessageRoutes = {
    MESSAGE: {
        name: 'MESSAGE',
        displayName: 'Messages',
        component: Message,
    },
    MESSAGE_DETAIL: {
        name: 'MESSAGE_DETAIL',
        displayName: 'MessageDetail',
        component: MessageDetail,
    }
}