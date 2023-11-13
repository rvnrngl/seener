"use client";

import { useConversation } from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationBox } from "./ConversationBox";
import { GroupChatModal } from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

type ConversationListProps = {
  users: User[];
  initialItem: FullConversationType[];
};

export const ConversationList: React.FC<ConversationListProps> = ({
  users,
  initialItem,
}) => {
  const router = useRouter();
  const session = useSession();
  const [items, setItems] = useState(initialItem);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const conversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateConversationHandler = (
      newConversation: FullConversationType,
    ) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === newConversation.id) {
            return {
              ...currentConversation,
              messages: newConversation.messages,
            };
          }

          return currentConversation;
        }),
      );
    };

    const removeConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", conversationHandler);
    pusherClient.bind("conversation:update", updateConversationHandler);
    pusherClient.bind("conversation:remove", removeConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", conversationHandler);
      pusherClient.unbind("conversation:update", updateConversationHandler);
      pusherClient.unbind("conversation:remove", removeConversationHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `fixed inset-y-0 left-0 block w-full overflow-y-auto border-r 
      border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0`,
          isOpen ? "hidden" : "left-0 block w-full",
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex items-start justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>

            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-full bg-gray-100 p-2 
          text-gray-600 transition hover:opacity-75"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
