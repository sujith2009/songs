// FavoriteSongsProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for a Song
interface Song {
  id: number;
  song_title: string;
  song_audio: string;
  // Add other fields as necessary
}

// Define the context value type
interface FavoriteSongsContextType {
  favoriteSongs: Song[];
  addFavoriteSong: (song: Song) => void;
}

// Create the context
const FavoriteSongsContext = createContext<
  FavoriteSongsContextType | undefined
>(undefined);

// Create the provider component
export const FavoriteSongsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);

  const addFavoriteSong = (song: Song) => {
    setFavoriteSongs((prevSongs) => [...prevSongs, song]);
  };

  return (
    <FavoriteSongsContext.Provider value={{ favoriteSongs, addFavoriteSong }}>
      {children}
    </FavoriteSongsContext.Provider>
  );
};

// Custom hook to use the FavoriteSongsContext
export const useFavoriteSongs = (): FavoriteSongsContextType => {
  const context = useContext(FavoriteSongsContext);
  if (context === undefined) {
    throw new Error(
      "useFavoriteSongs must be used within a FavoriteSongsProvider"
    );
  }
  return context;
};
