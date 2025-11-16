import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Профиль пользователя</CardTitle>
          <CardDescription>Просмотр и редактирование вашей личной информации.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://picsum.photos/seed/100/96/96" data-ai-hint="person portrait" />
                  <AvatarFallback>ИС</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">Иванов Сергей</h2>
                  <p className="text-muted-foreground">Начальник участка</p>
                  <p className="text-sm text-muted-foreground">Центральный офис</p>
                </div>
                <Button>Изменить фото</Button>
              </div>
              <Separator className="my-6" />
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> ivanov.s@company.ru</p>
                <p><strong>Телефон:</strong> +7 (912) 345-67-89</p>
                <p><strong>Дата приема:</strong> 12.04.2018</p>
                <p><strong>Табельный номер:</strong> 004521</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>
                Эта информация будет отображаться в вашем профиле.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surname">Фамилия</Label>
                  <Input id="surname" defaultValue="Иванов" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" defaultValue="Сергей" />
                </div>
              </div>
               <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patronymic">Отчество</Label>
                  <Input id="patronymic" defaultValue="Петрович" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Дата рождения</Label>
                  <Input id="birthdate" defaultValue="15.03.1985" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="ivanov.s@company.ru" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" defaultValue="+7 (912) 345-67-89" />
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
