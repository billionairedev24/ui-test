import React from 'react';

const cardData = [
    { title: "Today's Orders", value: "$110,000.00", bgColor: "bg-green-500" },
    { title: "Yesterday's Orders", value: "$20,000.00", bgColor: "bg-yellow-500" },
    { title: "This Month", value: "$250,000.00", bgColor: "bg-blue-500" },
    { title: "All-Time Sales", value: "$5,000,000.00", bgColor: "bg-purple-500" }
];

const SmallCard: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className={`${card.bgColor} text-white rounded-lg shadow-md p-6`}
                >
                    <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                    <p className="text-3xl font-bold">{card.value}</p>
                </div>
            ))}
        </div>
    );
};

export default SmallCard;
