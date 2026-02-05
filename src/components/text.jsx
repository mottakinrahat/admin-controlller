import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const colors = [
  "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
  "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A", "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC",
];

const Statistics = ({ book }) => {
  console.log(book);
  const [bookData, setBookData] = useState([]);
  // const name = [];
  // const page = [];
  // name.push(bookName);
  // page.push(totalPages);

  useEffect(() => {
    if (book) {
      const newData = [{ name: book.bookName, pages: book.totalPages }];
      setBookData(newData);
    }
  }, [book]);

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y} C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height} Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <BarChart width={600} height={400} data={bookData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="pages" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {bookData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default Statistics;