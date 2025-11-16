import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Алиса Петрова',
    lastMessage: 'Привет! Как дела?',
    time: '12:34',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Команда проекта',
    lastMessage: 'Созвон в 15:00',
    time: '11:20',
    unread: 5,
    online: false,
  },
  {
    id: '3',
    name: 'Дмитрий',
    lastMessage: 'Отправил файлы',
    time: 'Вчера',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    name: 'Мария Соколова',
    lastMessage: 'Спасибо! 👍',
    time: 'Вчера',
    unread: 0,
    online: false,
  },
];

interface ChatListProps {
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ selectedChatId, onSelectChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r border-border bg-card">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                'w-full p-3 rounded-lg flex items-center gap-3 hover:bg-accent/50 transition-colors text-left',
                selectedChatId === chat.id && 'bg-accent'
              )}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm truncate">{chat.name}</span>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate">{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
