import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const mockMessages: Message[] = [
  { id: '1', text: 'Привет! Как дела?', sender: 'other', time: '12:30' },
  { id: '2', text: 'Отлично, спасибо! А у тебя?', sender: 'me', time: '12:31' },
  { id: '3', text: 'Тоже всё хорошо 😊', sender: 'other', time: '12:32' },
  { id: '4', text: 'Можем созвониться сегодня?', sender: 'other', time: '12:33' },
  { id: '5', text: 'Конечно! В какое время удобно?', sender: 'me', time: '12:34' },
];

const stickers = ['😊', '❤️', '👍', '🔥', '💀', '😂', '🎉', '✨'];

interface ChatWindowProps {
  chatId?: string;
  chatName?: string;
}

export default function ChatWindow({ chatId, chatName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const sendSticker = (sticker: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: sticker,
      sender: 'me',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setShowStickers(false);
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="MessageSquare" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">Выберите чат</h3>
          <p className="text-muted-foreground">Начните общение с друзьями</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-4 border-b border-border bg-card flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{chatName?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium">{chatName || 'Чат'}</h3>
          <p className="text-xs text-muted-foreground">онлайн</p>
        </div>
        <Button variant="ghost" size="icon">
          <Icon name="Phone" size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icon name="Video" size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icon name="MoreVertical" size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-2 animate-fade-in',
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'other' && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{chatName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[70%] px-4 py-2 rounded-2xl',
                  message.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                )}
              >
                <p className="text-sm break-words">{message.text}</p>
                <span className={cn(
                  'text-xs mt-1 block',
                  message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                )}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        {showStickers && (
          <div className="mb-3 p-3 bg-background rounded-lg grid grid-cols-8 gap-2 animate-scale-in">
            {stickers.map((sticker) => (
              <button
                key={sticker}
                onClick={() => sendSticker(sticker)}
                className="text-2xl hover:scale-125 transition-transform"
              >
                {sticker}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowStickers(!showStickers)}
          >
            <Icon name="Smile" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Paperclip" size={20} />
          </Button>
          <Input
            placeholder="Написать сообщение..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon">
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
