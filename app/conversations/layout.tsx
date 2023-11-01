import { getConversations } from "../actions/getConversations";
import { SideBar } from "../components/SideBar/SideBar";
import { ConversationList } from "./components/ConversationList";

export default async function Conversationslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItem={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
