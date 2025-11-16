import { useState, useEffect } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const [showProfile, setShowProfile] = useState(false);
  const [chatName, setChatName] = useState<string>();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    const chats: Record<string, string> = {
      '1': 'Алиса Петрова',
      '2': 'Команда проекта',
      '3': 'Дмитрий',
      '4': 'Мария Соколова',
    };
    setChatName(chats[chatId]);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setShowProfile(!showProfile)}
        >
          <Icon name="User" size={24} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon name="MessageSquare" size={24} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon name="Users" size={24} />
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon name="Settings" size={24} />
        </Button>
      </div>

      <div className="w-80 shrink-0">
        <ChatList selectedChatId={selectedChatId} onSelectChat={handleSelectChat} />
      </div>

      <ChatWindow chatId={selectedChatId} chatName={chatName} />

      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </div>
  );
}
