import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Check } from "lucide-react";
import { Bar, XAxis, BarChart, CartesianGrid } from "recharts";

export function Chart() {
  const chartData = [
    { month: "Janeiro", desktop: 186, mobile: 80 },
    { month: "Fevereiro", desktop: 305, mobile: 200 },
    { month: "Março", desktop: 237, mobile: 120 },
    { month: "Abril", desktop: 73, mobile: 190 },
    { month: "Maio", desktop: 209, mobile: 130 },
    { month: "Julho", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  };

  return (
    <Card className="w-full md:w-1/2 md:max-w-[900px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
            Overview de Validações
          </CardTitle>
          <Check className="ml-auto w-6 h-6" />
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
            <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
