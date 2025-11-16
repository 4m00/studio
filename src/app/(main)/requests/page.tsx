import { RecentRequestsTable } from "@/components/dashboard/recent-requests-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RequestsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Заявки</h1>
          <p className="text-muted-foreground">
            Просмотр, создание и управление заявками на расходы.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Создать заявку
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="pending">На согласовании</TabsTrigger>
            <TabsTrigger value="approved">Утверждено</TabsTrigger>
            <TabsTrigger value="rejected">Отклонено</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Поиск по номеру или инициатору..."
              className="w-64"
            />
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <RecentRequestsTable />
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>На согласовании</CardTitle>
            </CardHeader>
            <CardContent>
               <RecentRequestsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Утверждено</CardTitle>
            </CardHeader>
            <CardContent>
               <RecentRequestsTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Отклонено</CardTitle>
            </CardHeader>
            <CardContent>
               <RecentRequestsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
