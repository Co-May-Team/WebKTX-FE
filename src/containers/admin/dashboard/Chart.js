import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const data = [
    {
        name: 'Nam',
        percent: 40,
    },
    {
        name: 'Nữ',
        percent: 60,
    },
]

const GenderComparisonChart = () => {
    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="percent" fill="#82ca9d" />
        </BarChart>
    )
}

export default GenderComparisonChart
