"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import io, { Socket } from "socket.io-client";

interface LiveSprintsProps {
  params: {
    slug?: string;
  };
}

export default function LiveSprints({ params }: LiveSprintsProps) {
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
        "9c973427-7171-4481-93e0-7f8fb388ba17"
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

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);

  return (
    <>
      <Button className="absolute top-2.5 left-20 mt-[6px]">
        <Link
          href={`/device/${params.slug}`}
          className="flex items-center justify-center"
        >
          <ChevronLeft size={24} />
          Voltar
        </Link>
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
