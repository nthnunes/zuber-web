"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

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

  const [currentLocation, setCurrentLocation] = useState<any>([]);

  const position = {
    lat: currentLocation.lat,
    lng: currentLocation.lng,
  };

  useEffect(() => {
    const Getposition = (position: any) => {
      const dados: any = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentLocation(dados);
    };
    navigator.geolocation.getCurrentPosition(Getposition);
  }, []);

  return (
    <>
      <div className="absolute top-2.5 left-2.5 z-50 pl-16 pt-[6px]">
        <Button className="p-2">
          <Link
            href={`/device/${params.slug}`}
            className="flex items-center justify-center"
          >
            <ChevronLeft size={24} />
            Voltar
          </Link>
        </Button>
      </div>
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
