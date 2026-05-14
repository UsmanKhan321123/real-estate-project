import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

function Map({items}){
  let markers = [
    {geocode:[48.85,2.3522],popup: "hello 1 "},
    {geocode:[48.8556,2.3522],popup: "hello 2 "},
    {geocode:[48.86,2.34],popup: "hello 13"}

  ]
  return (
    <MapContainer center={[52.4797, -1.90269]} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item=>(
      <Pin item={item} key={item.id}/>
    ))}
  </MapContainer>   
  )
}

export default Map