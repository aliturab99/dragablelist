"use client";
import React, { useState, useRef } from 'react';
import SingleListItem from './SingleListItem';

const listData = [
  { id: 1, name: "Scotland Island", area: "Sydney, Australia", imgSrc: "https://media.timeout.com/images/103835953/image.jpg" },
  { id: 2, name: "The Charles Grand Brasserie & Bar", area: "Lorem ipsum, Dolor", imgSrc: "https://thecharles.sydney/wp-content/uploads/sites/3/2022/11/KuzOkaGw-1.jpeg" },
  { id: 3, name: "Bridge Climb", area: "Dolor, Sit amet", imgSrc: "https://www.toledoblade.com/image/2021/06/21/1140x_a10-7_cTC/SCHAEDLER-JUMP.jpg" },
  { id: 4, name: "Calm Bar", area: "Etcetera veni, Vidi vici", imgSrc: "https://media.guestofaguest.com/t_article_content/wp-content/uploads/2014/06/clambar1.jpg" },
  { id: 5, name: "Vivid Festival", area: "Sydney, Australia", imgSrc: "https://i.natgeofe.com/n/ae6a6b4d-1f7a-4b7f-822e-3f0179685923/ST_whatsnew_VividSydney2022_SydneyOperaHouse_Yarrkalpa_CREDITDestinationNSW_HR_16x9.jpg" },
];

function ListMain() {
  const [items, setItems] = useState<any>(listData);
  const [draggedIndex, setDraggedIndex] = useState<any>(null);
  const [dropPosition, setDropPosition] = useState<any>(null);
  const dragImageRef = useRef<any>(null);

  const handleDragStart = (e: any, id: number) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedIndex(items.findIndex((item: any) => item.id === id));

    const dragImage = document.createElement('div');
    dragImage.className = 'custom-drag-image';
    dragImage.innerHTML = `
      <div style="display: flex; align-items: center">
        <img src="${items.find((item: any) => item.id === id).imgSrc}" alt="${items.find((item: any) => item.id === id).name}" style="width: 30px; height: 30px; margin-right: 10px;" />
        <h4>${items.find((item: any) => item.id === id).name}</h4>
      </div>
    `;
    document.body.appendChild(dragImage);
    dragImageRef.current = dragImage;
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragEnd = () => {
    if (dragImageRef.current) {
      document.body.removeChild(dragImageRef.current);
      dragImageRef.current = null;
    }
    setDraggedIndex(null);
    setDropPosition(null);
  };

  const handleDragOver = (e: any, index: number) => {
    e.preventDefault();
    setDropPosition({ index: index + 1, position: 'above' });
  };

  const handleDrop = (e: any, index: number) => {
    const draggedItemId = e.dataTransfer.getData("text/plain");
    const draggedItemIndex = items.findIndex((item: any) => item.id.toString() === draggedItemId);
    const updatedItems = [...items];
    const [removed] = updatedItems.splice(draggedItemIndex, 1);

    if (dropPosition.position === 'above') {
      updatedItems.splice(index, 0, removed);
    } else {
      updatedItems.splice(index + 1, 0, removed);
    }

    setItems(updatedItems);
    setDraggedIndex(null);
    setDropPosition(null);
  };

  const getDropClassName = (index: any) => {
    if (!dropPosition) return '';
    if (index === dropPosition.index) {
      return dropPosition.position === 'above' ? "border-t-4 border-blue-500" : "border-b-4 border-blue-500";
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center w-full md:w-5/12 bg-white border border-gray-200 rounded-lg shadow relative">
      <ul className="w-full">
        {items.map((item: any, index: number) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`${getDropClassName(index)} ${draggedIndex === index ? 'opacity-50 bg-gray-200' : ''}`}
          >
            <SingleListItem itemData={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListMain;