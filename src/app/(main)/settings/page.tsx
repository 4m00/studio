import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Настройки</CardTitle>
          <CardDescription>
            Управление вашим профилем, уведомлениями и другими параметрами
            системы.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="system">Система</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
              <CardDescription>Редактирование личной информации.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="https://picsum.photos/seed/100/80/80"
                    data-ai-hint="person portrait"
                  />
                  <AvatarFallback>ИС</AvatarFallback>
                </Avatar>
                <Button variant="outline">Изменить фото</Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" defaultValue="Сергей" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Фамилия</Label>
                  <Input id="surname" defaultValue="Иванов" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="ivanov.s@company.ru"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Подразделение</Label>
                <Input id="department" defaultValue="Центральный офис" disabled />
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Настройте, как вы будете получать уведомления.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-base">
                    Email-уведомления
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Получать уведомления о статусе заявок и аномалиях на почту.
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications" className="text-base">
                    Push-уведомления
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Получать push-уведомления в браузере.
                  </p>
                </div>
                <Switch id="push-notifications" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-digest" className="text-base">
                    Еженедельный дайджест
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Получать еженедельную сводку по затратам и аномалиям.
                  </p>
                </div>
                <Switch id="weekly-digest" defaultChecked />
              </div>
              <Button>Сохранить настройки</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Система</CardTitle>
              <CardDescription>
                Общие настройки интерфейса и системы.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-theme" className="text-base">
                    Темная тема
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Переключиться на темную тему оформления.
                  </p>
                </div>
                <Switch id="dark-theme" />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="language" className="text-base">
                    Язык
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Текущий язык интерфейса: Русский
                  </p>
                </div>
                <Button variant="outline">Изменить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
