import React from 'react';
import {
  MdLocalGasStation,
  MdRestaurant,
  MdCardTravel,
  MdComputer,
  MdPhoneIphone,
  MdLocalGroceryStore
} from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { GiCeilingLight } from 'react-icons/gi';
import { IoIosDesktop } from 'react-icons/io';

export default function displayIcon(category) {
  if (category === 'gas') return <MdLocalGasStation />;
  if (category === 'restaurant') return <MdRestaurant />;
  if (category === 'travel') return <MdCardTravel />;
  if (category === 'online') return <MdComputer />;
  if (category === 'phone') return <MdPhoneIphone />;
  if (category === 'grocery') return <MdLocalGroceryStore />;
  if (category === 'furnitures') return <TiHomeOutline />;
  if (category === 'streaming') return <IoIosDesktop />;
  if (category === 'utilities') return <GiCeilingLight />;
}
