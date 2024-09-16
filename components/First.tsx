import React, { createContext, useState, ReactNode } from "react";

// Define the type of the context
type PlayerContextType = {
  song: string;
  setSong: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context with a default value
const player = createContext<PlayerContextType | undefined>(undefined);

const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [song, setSong] = useState<string>("");

  return (
    <player.Provider value={{ song, setSong }}>{children}</player.Provider>
  );
};

export { player, PlayerProvider };
