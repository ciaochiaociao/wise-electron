declare global {
  interface Window {
    systemControls: {
      setBrightness: (value: number) => void
    }
    hmx: Hmx
  }

  interface Hmx{
    getEmotion: () => Promise<string>
  }
  
  type Actions = {
    handleSetBrightness: () => void
    handleGeneralChat: () => void
  }
  
  interface ChildProps {
    actions: Actions;
  }

  interface Props {
    children: ReactNode;
    handleSetBrightness: () => void;
    handleGeneralChat: () => void;
  }
}
