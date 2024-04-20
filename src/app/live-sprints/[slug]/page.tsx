"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface LiveSprintsProps {
    params  : {
        slug ?: string
    }
}

export default function LiveSprints ({params} : LiveSprintsProps)  {
   
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBo3h39Vto7jTzZCPsosGIJLGA5QWsSOX4"
      })

     
      const [currentLocation,setCurrentLocation] = useState<any>([])

      const position = {
        lat : currentLocation.lat,
        lng : currentLocation.lng,
      }

      useEffect(() => {
       const Getposition  = (position : any)  => {
        const dados : any = {
            lat: position.coords.latitude, lng: position.coords.longitude
        }
        setCurrentLocation(dados)  
       }
        navigator.geolocation.getCurrentPosition(Getposition)
      },[]);
      

    return ( 
        <>
            <Button className="m-4"><Link href={`/device/${params.slug}`} className="flex items-center justify-center"><ChevronLeft />Voltar</Link></Button>
            <section className="container h-40 mt-20">
            <h1 className="text-3xl text-white">Corridas ao vivo</h1>
            <div className="w-1/2 h-[20rem] rounded-sm">
             {isLoaded && (
                 <GoogleMap
                 mapContainerStyle={{width : "100%",height : "100%",borderRadius : "10px"}}
                 center={position}
                 zoom={15}
               >
                <Marker position={position}/>
               </GoogleMap>
             )}
            </div>
            </section>
        </>
     );
}
 
