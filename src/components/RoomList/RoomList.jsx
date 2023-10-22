import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './RoomList.module.css';
import CreateRoom from 'components/CreateRoom/CreateRoom';
import IconPeopleAll from 'components/Images/IconPeopleAll.svg';
import IconPeopleOnline from 'components/Images/IconPeopleOnline.svg';

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
    // <div>
    //   <h2 className={css.room_title}>Choose room <br/> for communication</h2>
    //   <ul className={css.room_list}>
    //     {rooms.map((room) => (
    //       <li className={css.room_item} key={room.id}>
    //         {room.name_room}
    //         <img className={css.room_img} src={room.image_room} alt={room.name_room} width="300" />
    //         <div className={css.room_description}></div>
    //       </li>
    //     ))}
    //     <li className={css.room_item}>
    //       <CreateRoom onRoomCreated={addRoom} />
    //     </li>
    //   </ul>
    // </div>
    <div className={css.room_section}>
  <h2 className={css.room_title}>Choose a room for communication</h2>
  <ul className={css.room_list}>
    {rooms.map((room) => (
      <li className={css.room_item} key={room.id}>
        <div className={css.room_container}>
        <img className={css.room_img} src={room.image_room} alt={room.name_room} />
        <p className={css.room_name}>{room.name_room}</p>
        </div>
        
        <div className={css.room_description}>
          <div className={css.people_count}>
          <img
              src={IconPeopleAll}
              alt="IconPeopleAll"/>
            <span> Online</span>
            </div>
            <div className={css.people_count}>
            <img
              src={IconPeopleOnline}
              alt="IconPeopleOnline"/>
            <span> Total</span>
          </div>
        </div>
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