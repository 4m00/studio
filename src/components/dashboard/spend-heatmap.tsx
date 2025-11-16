'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const heatmapData = [
  { "category": "Сырье", "Янв": 120, "Фев": 130, "Мар": 110, "Апр": 150, "Май": 160, "Июн": 155, "Июл": 170, "Авг": 165, "Сен": 180, "Окт": 175, "Ноя": 160, "Дек": 190 },
  { "category": "Персонал", "Янв": 200, "Фев": 210, "Мар": 205, "Апр": 220, "Май": 215, "Июн": 225, "Июл": 230, "Авг": 220, "Сен": 240, "Окт": 235, "Ноя": 230, "Дек": 250 },
  { "category": "Энергия", "Янв": 80, "Фев": 85, "Мар": 90, "Апр": 95, "Май": 110, "Июн": 120, "Июл": 130, "Авг": 125, "Сен": 115, "Окт": 100, "Ноя": 90, "Дек": 140 },
  { "category": "Ремонты", "Янв": 50, "Фев": 40, "Мар": 60, "Апр": 70, "Май": 65, "Июн": 80, "Июл": 90, "Авг": 110, "Сен": 100, "Окт": 95, "Ноя": 85, "Дек": 120 },
  { "category": "Логистика", "Янв": 70, "Фев": 75, "Мар": 80, "Апр": 85, "Май": 90, "Июн": 95, "Июл": 100, "Авг": 105, "Сен": 110, "Окт": 120, "Ноя": 115, "Дек": 130 },
  { "category": "Маркетинг", "Янв": 30, "Фев": 35, "Мар": 40, "Апр": 45, "Май": 50, "Июн": 55, "Июл": 60, "Авг": 65, "Сен": 70, "Окт": 75, "Ноя": 80, "Дек": 90 },
  { "category": "Прочее", "Янв": 20, "Фев": 22, "Мар": 25, "Апр": 28, "Май": 30, "Июн": 32, "Июл": 35, "Авг": 38, "Сен": 40, "Окт": 42, "Ноя": 45, "Дек": 50 },
];

export function SpendHeatmap() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                 <CardTitle>Тепловая карта затрат</CardTitle>
                 <CardDescription>Распределение затрат по категориям и месяцам (млн ₽)</CardDescription>
            </div>
            <Select defaultValue="all">
                <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Выберите подразделение" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все подразделения</SelectItem>
                    <SelectItem value="dp1">Перерабатывающий завод №1</SelectItem>
                    <SelectItem value="dp2">Добывающее предприятие №2</SelectItem>
                    <SelectItem value="co">Центральный офис</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveHeatMap
          data={heatmapData}
          keys={['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']}
          indexBy="category"
          margin={{ top: 0, right: 60, bottom: 60, left: 80 }}
          axisTop={null}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Месяц',
            legendPosition: 'middle',
            legendOffset: 46
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Категория',
            legendPosition: 'middle',
            legendOffset: -72
          }}
          colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.5,
            minValue: 20,
            maxValue: 250,
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 80,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 60,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </CardContent>
    </Card>
  );
}
