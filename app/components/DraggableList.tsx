import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface Item {
    id: string;
    line1: string;
    line2: string;
    imgSrc: string;
}

const initialItems: Item[] = [
    { id: '1', line1: 'Scotland Island', line2: "Sydney, Australia", imgSrc: "images/island.svg" },
    { id: '2', line1: 'The Charles Grand Brasserie', line2: "Lorem ipsum, Dolor", imgSrc: "images/charlesBar.svg" },
    { id: '3', line1: 'Bridge Climb', line2: "Dolor, Sit amet", imgSrc: "images/jump.svg" },
    { id: '4', line1: 'Scotland Island', line2: "Sydney, Australia", imgSrc: "images/boat.svg" },
    { id: '5', line1: 'Calm bar', line2: "Etcetera veni, Vidi vici", imgSrc: "images/bar.svg" },
    { id: '6', line1: 'Vivid Festival', line2: "Sydney, Australia", imgSrc: "images/festival.svg" },
];

const DraggableList: React.FC = () => {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const dragRef = useRef<HTMLDivElement>(null); // Ref for the dragging element

    const handleDragStart = (index: number, event: React.DragEvent<HTMLLIElement>) => {
        setDraggingIndex(index);
        const crt = document.createElement('div');
        crt.style.width = '200px';
        crt.style.height = 'auto';
        crt.style.backgroundColor = 'white';
        crt.style.opacity = '0.9';
        crt.style.display = 'flex';
        crt.style.flexDirection = 'row';
        crt.style.boxShadow = '0px 8px 16px 0px rgba(0, 0, 0, 0.5)';
        crt.style.borderRadius = '8px';
        crt.style.padding = '10px';
        crt.style.position = 'absolute';
        crt.style.top = '-9999px'; // Move out of view
        crt.style.left = '-9999px'; // Move out of view

        const image = document.createElement('img');
        image.src = items[index].imgSrc;
        image.alt = 'Image';
        image.style.width = '24px';
        image.style.height = '24px';
        image.style.borderRadius = '4px';
        crt.appendChild(image);


        const textDiv = document.createElement('div');
        textDiv.textContent = items[index].line1;
        textDiv.style.fontFamily = 'Gelion';
        textDiv.style.fontSize = '17px';
        textDiv.style.fontWeight = '500';
        textDiv.style.lineHeight = '22px';
        textDiv.style.textAlign = 'center';
        textDiv.style.color = '#292B36';
        textDiv.style.paddingLeft = '10px';
        crt.appendChild(textDiv);

        document.body.appendChild(crt);
        event.dataTransfer.setDragImage(crt, 0, 0);
    };

    const handleDragEnter = (index: number) => {
        if (draggingIndex === null || draggingIndex === index) return;

        setDragOverIndex(index);
    };

    const handleDragEnd = () => {
        if (draggingIndex === null || dragOverIndex === null || draggingIndex === dragOverIndex) {
            setDraggingIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newList = [...items];
        const draggedItem = newList[draggingIndex];
        newList.splice(draggingIndex, 1);
        newList.splice(dragOverIndex, 0, draggedItem);

        setItems(newList);
        setDraggingIndex(null);
        setDragOverIndex(null);
    };

    return (
        <ul className="mx-auto">
            {items.map((item, index) => (
                <li
                    key={item.id}
                    draggable
                    onDragStart={(event) => handleDragStart(index, event)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    className={`relative p-4 bg-white shadow transition-all duration-300 hover:bg-gray-100`}
                    style={{
                        width: '568px',
                        height: '136px',
                        padding: '20px 40px',
                        borderLeft: '0',
                        borderRight: '0',
                        borderBottom: dragOverIndex === index ? '3px solid #1E9BF0' : 'none'
                    }}
                >
                    <div className="container mx-auto flex">
                        <div className="w-24 h-24 relative">
                            <Image
                                src={item.imgSrc}
                                alt="Vercel Logo"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>

                        <div className="p-4 flex flex-col justify-center items-start">
                            <div className="text-base font-medium font-Gelion text-gray-800 leading-6">
                                {item.line1}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Image src="images/loc.svg" alt="Icon" width={16} height={16} />
                                <div className={`text-base font-normal font-Gelion text-gray-500 leading-5 ${draggingIndex === index ? 'opacity-50' : ''
                                    }`}>
                                    {item.line2}
                                </div>
                            </div>

                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default DraggableList;
