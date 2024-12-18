import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowDownIcon, ArrowUpIcon} from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down';
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon: Icon }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {trend === 'up' ? <ArrowUpIcon className="mr-1 h-4 w-4" /> :
                        <ArrowDownIcon className="mr-1 h-4 w-4" />}
                    {change}
                </p>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
