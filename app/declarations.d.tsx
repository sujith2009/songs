declare module "expo-modal" {
  import { ReactNode } from "react";
  import { ViewStyle } from "react-native";

  interface BottomModalProps {
    visible: boolean;
    onHardwareBackPress?: () => void;
    swipeDirection?:
      | "up"
      | "down"
      | "left"
      | "right"
      | Array<"up" | "down" | "left" | "right">;
    onSwipeComplete?: () => void;
    children?: ReactNode;
  }

  export const BottomModal: React.FC<BottomModalProps>;
}
