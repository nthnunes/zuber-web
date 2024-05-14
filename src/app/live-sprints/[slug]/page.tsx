"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import io, { Socket } from "socket.io-client";
import { useRouter } from 'next/navigation';

interface LiveSprintsProps {
  params: {
    slug?: string;
  };
}

export default function LiveSprints({ params }: LiveSprintsProps) {

  const router = useRouter();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBo3h39Vto7jTzZCPsosGIJLGA5QWsSOX4",
  });

  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketUrl = "ws://localhost:3001";
    const newSocket = io(socketUrl);

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Conectado ao servidor WebSocket");
      newSocket.emit(
        "getSprintGeoLocations",
        params.slug
      );
    });

    newSocket.on("sprintGeoLocations", (data: any) => {
      setCurrentLocation({
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lon),
      });
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("sprintGeoLocations");
      newSocket.close();
    };
  }, []);

  /* useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]); */

  return (
    <>
      <Button className="absolute top-2.5 left-20 mt-[6px]" onClick={() => router.back()}>
        Voltar
      </Button>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "90vh" }}
          center={currentLocation}
          zoom={15}
        >
          <Marker position={currentLocation} />
        </GoogleMap>
      )}
    </>
  );
}
