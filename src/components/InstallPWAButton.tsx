import { useState, useEffect } from "react";

const InstallPWAButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;

      event.preventDefault();

      setDeferredPrompt(event);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the installation prompt");
    } else {
      console.log("User dismissed the installation prompt");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    isVisible && (
      <button
        onClick={handleInstallClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Install App
      </button>
    )
  );
};

export default InstallPWAButton;
