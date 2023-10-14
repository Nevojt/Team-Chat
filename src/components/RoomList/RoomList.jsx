import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './RoomList.module.css';
import CreateRoom from 'components/CreateRoom/CreateRoom';

function RoomList() {
  const [rooms, setRooms] = useState([]);

  const loadRooms = () => {
    axios.get('https://cool-chat.club/rooms/')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке списка комнат:', error);
      });
  };

  useEffect(() => {
    // Вызываем функцию загрузки при каждом рендере компонента
    loadRooms();
  }, []); // Пустой массив зависимостей означает, что эффект выполняется при каждом рендере

  const addRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
  };

  return (
    <div>
      <h2 className={css.room_title}>Choose room <br/> for communication</h2>
      <ul className={css.room_list}>
        {rooms.map((room) => (
          <li className={css.room_item} key={room.id}>
            {room.name_room}
            <img className={css.room_img} src={room.image_room} alt={room.name_room} width="300" />
          </li>
        ))}
        <li className={css.room_item}>
          <CreateRoom onRoomCreated={addRoom} />
        </li>
      </ul>
    </div>
  );
}

export default RoomList;