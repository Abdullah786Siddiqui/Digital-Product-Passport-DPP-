import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from "recharts"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const revenueData = [
  { name: 'Point A', uv: 1500, pv: 2000, amt: 1800 },
  { name: 'Point B', uv: 4000, pv: 3500, amt: 3800 },
  { name: 'Point C', uv: 3200, pv: 4500, amt: 4000 },
  { name: 'Point D', uv: 5000, pv: 4200, amt: 4800 },
  { name: 'Point E', uv: 4300, pv: 5000, amt: 4700 },
  { name: 'Point F', uv: 5500, pv: 5300, amt: 5200 },
  { name: 'Point G', uv: 6000, pv: 5800, amt: 5900 },
  { name: 'Point H', uv: 7200, pv: 6800, amt: 7000 },
  { name: 'Point I', uv: 6800, pv: 7200, amt: 7100 },
];

const subscriptionsData = [
  { name: 'Point A', uv: 200, pv: 400, amt: 350 },
  { name: 'Point B', uv: 600, pv: 1000, amt: 800 },
  { name: 'Point C', uv: 1200, pv: 900, amt: 1000 },
  { name: 'Point D', uv: 800, pv: 1500, amt: 1300 },
  { name: 'Point E', uv: 1800, pv: 1600, amt: 1700 },
  { name: 'Point F', uv: 2200, pv: 2000, amt: 2100 },
  { name: 'Point G', uv: 2600, pv: 2400, amt: 2500 },
  { name: 'Point H', uv: 3000, pv: 2800, amt: 2900 },
  { name: 'Point I', uv: 3500, pv: 3300, amt: 3400 },
];

const salesData = [
  { name: 'Point A', uv: 500, pv: 700, amt: 650 },
  { name: 'Point B', uv: 1200, pv: 1100, amt: 1150 },
  { name: 'Point C', uv: 1000, pv: 1400, amt: 1200 },
  { name: 'Point D', uv: 1800, pv: 1500, amt: 1600 },
  { name: 'Point E', uv: 500, pv: 2000, amt: 1800 },
  { name: 'Point F', uv: 2500, pv: 2400, amt: 2450 },
  { name: 'Point G', uv: 2300, pv: 2800, amt: 2600 },
  { name: 'Point H', uv: 3100, pv: 3300, amt: 3200 },
  { name: 'Point I', uv: 2800, pv: 3600, amt: 3300 },
];

const activeNowData = [
  { name: 'Point A', uv: 100, pv: 150, amt: 120 },
  { name: 'Point B', uv: 300, pv: 400, amt: 350 },
  { name: 'Point C', uv: 250, pv: 500, amt: 400 },
  { name: 'Point D', uv: 500, pv: 600, amt: 550 },
  { name: 'Point E', uv: 450, pv: 700, amt: 600 },
  { name: 'Point F', uv: 700, pv: 800, amt: 750 },
  { name: 'Point G', uv: 650, pv: 900, amt: 800 },
  { name: 'Point H', uv: 900, pv: 1000, amt: 950 },
  { name: 'Point I', uv: 850, pv: 1100, amt: 1000 },
];




export function SectionCards() {
  return (
    <div className="flex flex-col  lg:flex-col xl:flex-row  gap-4 ">
      <div className="grid grid-cols-2 max-sm:grid-cols-1  gap-4 flex-1">
      <Card className="@container/card bg-white shadow">
        <CardHeader>
          <CardDescription className="font-bold text-black ">Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
           <DollarSign className="text-muted-foreground"  />

          
          </CardAction>
        </CardHeader>
    <CardFooter className="flex-col items-start gap-1.5 text-sm h-[50px]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={revenueData}>
      <Line type="monotone" dataKey="pv" stroke="black" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</CardFooter>

      </Card>
      <Card className="@container/card">
        <CardHeader>
                    <CardDescription className="font-bold text-black">Subscriptions</CardDescription>

          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
            +2350
          </CardTitle>
          <CardAction>
          <Users  className="text-muted-foreground"   />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-[50px]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={subscriptionsData}>
      <Line type="monotone" dataKey="pv" stroke="black" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="font-bold text-black">Sales</CardDescription>
          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
            +12,234
          </CardTitle>
          <CardAction>
             <CreditCard  className="text-muted-foreground"  />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-[50px]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={salesData}>
      <Line type="monotone" dataKey="pv" stroke="black" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
                    <CardDescription className="font-bold text-black">Active Now</CardDescription>

          <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
              <Activity className="text-muted-foreground" /> 
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm h-[50px]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={activeNowData}>
      <Line type="monotone" dataKey="pv" stroke="black" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
</CardFooter>
      </Card>
      </div>
       <div className="flex-1">
         <Card className="bg-white shadow rounded-2xl @container/card h-full">
  {/* Header */}
  <div className="flex items-center justify-between px-4 py-3 border-b">
    <div>
      <CardDescription className="font-bold text-black text-lg">
        Leads-to-client
      </CardDescription>
      <p className="text-muted-foreground text-sm">
        Deploy your Project in one Click
      </p>
    </div>
    <Button variant="outline" size="sm">Visit all</Button>
  </div>

  {/* Stats Section */}
  <div className="space-y-4 px-4">
    {/* Lead */}
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Lead</p>
        <p>
          266 <span className="font-bold text-green-600">(83%)</span>
        </p>
      </div>
      <Progress value={83} />
    </div>

    {/* Qualified */}
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Qualified</p>
        <p>
          180 <span className="font-bold text-blue-600">(65%)</span>
        </p>
      </div>
      <Progress value={65} />
    </div>

    {/* Proposal */}
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Proposal</p>
        <p>
          90 <span className="font-bold text-orange-600">(30%)</span>
        </p>
      </div>
      <Progress value={30} />
    </div>
      {/* Proposal */}
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Proposal</p>
        <p>
          90 <span className="font-bold text-orange-600">(30%)</span>
        </p>
      </div>
      <Progress value={30} />
    </div>
      {/* Proposal */}
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Proposal</p>
        <p>
          90 <span className="font-bold text-orange-600">(30%)</span>
        </p>
      </div>
      <Progress value={30} />
    </div>
    
  </div>
</Card>
</div>
    </div>
  )
}
