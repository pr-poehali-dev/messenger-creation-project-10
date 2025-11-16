import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  onClose: () => void;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  return (
    <div className="w-80 border-l border-border bg-card flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Профиль</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarFallback className="text-2xl">Я</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            <Icon name="Camera" size={16} className="mr-2" />
            Изменить фото
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input id="name" defaultValue="Иван Петров" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="username">Имя пользователя</Label>
            <Input id="username" defaultValue="@ivan_petrov" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="bio">О себе</Label>
            <Input id="bio" defaultValue="Разработчик" className="mt-1" />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="p-4 space-y-4">
          <h4 className="font-medium mb-3">Настройки</h4>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Moon" size={20} className="text-muted-foreground" />
              <span className="text-sm">Тёмная тема</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              <span className="text-sm">Уведомления</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Volume2" size={20} className="text-muted-foreground" />
              <span className="text-sm">Звуки</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Lock" size={20} className="text-muted-foreground" />
              <span className="text-sm">Двухфакторная аутентификация</span>
            </div>
            <Switch />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Icon name="HelpCircle" size={18} className="mr-3" />
            Помощь
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Icon name="Info" size={18} className="mr-3" />
            О приложении
          </Button>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" size="sm">
            <Icon name="LogOut" size={18} className="mr-3" />
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
