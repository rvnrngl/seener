import { getConversations } from "../actions/getConversations";
import { getUsers } from "../actions/getUsers";
import { SideBar } from "../components/SideBar/SideBar";
import { ConversationList } from "./components/ConversationList";

export default async function Conversationslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList users={users} initialItem={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
